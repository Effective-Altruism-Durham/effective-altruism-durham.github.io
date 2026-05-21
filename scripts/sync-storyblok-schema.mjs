import { readFileSync } from "node:fs";
import { storyblokComponents } from "../storyblok/schema/homepage-components.mjs";

loadDotEnv();

const spaceId = process.env.STORYBLOK_SPACE_ID;
const oauthToken = process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN;
const dryRun = process.argv.includes("--dry-run") || process.env.STORYBLOK_DRY_RUN === "true";
const region = process.env.STORYBLOK_REGION ?? "eu";
const managementHost = region === "cn" ? "https://app.storyblokchina.cn" : "https://mapi.storyblok.com";

if (!spaceId || !oauthToken) {
  console.error("Missing STORYBLOK_SPACE_ID or STORYBLOK_PERSONAL_ACCESS_TOKEN.");
  console.error("Copy .env.example to .env and fill in the Storyblok Management API values.");
  process.exit(1);
}

const componentsUrl = `${managementHost}/v1/spaces/${spaceId}/components/`;

const existingComponents = await getExistingComponents();
const existingByName = new Map(existingComponents.map((component) => [component.name, component]));

for (const component of storyblokComponents) {
  const existing = existingByName.get(component.name);
  if (existing) {
    await updateComponent(existing.id, component);
  } else {
    await createComponent(component);
  }
}

console.log(`Storyblok schema sync complete${dryRun ? " (dry run)" : ""}.`);

async function getExistingComponents() {
  const response = await fetchWithRetry(componentsUrl, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch components: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.components ?? [];
}

async function createComponent(component) {
  if (dryRun) {
    console.log(`[dry-run] create ${component.name}`);
    return;
  }

  const response = await fetchWithRetry(componentsUrl, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ component }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create ${component.name}: ${response.status} ${await response.text()}`);
  }

  console.log(`created ${component.name}`);
}

async function updateComponent(id, component) {
  if (dryRun) {
    console.log(`[dry-run] update ${component.name}`);
    return;
  }

  const response = await fetchWithRetry(`${componentsUrl}${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify({ component: { ...component, id } }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update ${component.name}: ${response.status} ${await response.text()}`);
  }

  console.log(`updated ${component.name}`);
}

async function fetchWithRetry(url, options, attempt = 1) {
  const response = await fetch(url, options);
  if (response.status !== 429 || attempt >= 5) return response;

  const retryAfter = Number(response.headers.get("retry-after"));
  const delayMs = Number.isFinite(retryAfter) && retryAfter > 0
    ? retryAfter * 1000
    : attempt * 1200;

  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return fetchWithRetry(url, options, attempt + 1);
}

function authHeaders() {
  return {
    Authorization: oauthToken,
  };
}

function jsonHeaders() {
  return {
    ...authHeaders(),
    "Content-Type": "application/json",
  };
}

function loadDotEnv() {
  let file;
  try {
    file = readFileSync(".env", "utf8");
  } catch {
    return;
  }

  for (const line of file.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}
