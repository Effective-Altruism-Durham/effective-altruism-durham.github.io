export const homepageDefaults = {
  title: "Effective Altruism Durham",
  description:
    "We represent the Effective Altruism movement in Durham University. We empower students who want to make a change through our programmes, events, and community.",
  hero: {
    headline: "We aspire to do the most good we can",
    bodyHtml: `
      <p class="mb-5">
        We represent the <a
          href="https://www.effectivealtruism.org/"
          target="_blank"
          rel="noreferrer noopener"
          class="underline">Effective Altruism</a
        > movement in Durham University. By reasoning carefully and considering
        evidence, we can maximise our positive impact on the world.
      </p>
      <p>
        We empower students who want to make a change through our programmes,
        events, and community.
      </p>
    `,
    ctas: [
      {
        label: "Get involved",
        url: "/#get-involved",
      },
      {
        label: "Join the mailing list",
        url: "https://outlook.office365.com/owa/effectivealtruismdurham@durhamuniversity.onmicrosoft.com/groupsubscription.ashx?action=join&source=MSExchange/LokiServer&guid=e5909571-b397-42c5-99bc-b362c640ca29",
      },
    ],
  },
  whatIsEa: {
    headingHtml: `What is<br /><span class="font-bold">Effective&nbsp;</span>Altruism?`,
    bodyHtml: `
      <p>
        <a
          href="https://www.effectivealtruism.org/"
          target="_blank"
          rel="noreferrer noopener"
          class="text-white underline">Effective Altruism</a
        > is a framework for applying evidence-based reasoning to
        <a
          href="https://80000hours.org/problem-profiles/"
          target="_blank"
          rel="noreferrer noopener"
          class="text-white underline"
          >the world's most pressing problems</a
        >. It's also a practical community sharing diverse views on which
        problems to prioritise and how to tackle them.
      </p>
    `,
    videoUrl: "https://www.youtube-nocookie.com/embed/Diuv3XZQXyc?si=p6XQuSQe5CiJ9SsC",
  },
  arete: {
    heading: "Arete Fellowship",
    body: "An 8-week seminar programme aimed to introduce you to ideas from various disciplines for making a positive impact on the world.",
    ctaLabel: "Learn more",
    ctaUrl: "/arete-fellowship",
  },
  whatWeDo: {
    heading: "What we do",
    cards: [
      {
        label: "IDEA\nFELLOWSHIP",
        text: "An 8-week continuation from the Arete Fellowship. Dive deeper into problems that you find interesting!",
      },
      {
        label: "SPEAKER\nEVENTS",
        text: "We regularly invite external guest speakers in to talk about a wide range of topics!",
      },
      {
        label: "CAREER\nPLANNING",
        text: "Explore career path, network with professionals, and feel prepared to pursue an impactful career!",
      },
    ],
  },
  socialLinks: [
    {
      label: "Instagram",
      url: "https://www.instagram.com/effectivealtruismdurham/",
    },
    {
      label: "Email",
      url: "mailto:effective.altruism@durham.ac.uk",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/EffectiveAltruismDurham",
    },
  ],
  contact: {
    heading: "Contact us",
  },
};
