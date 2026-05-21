const text = (pos, extra = {}) => ({
  type: "text",
  pos,
  ...extra,
});

const textarea = (pos, extra = {}) => ({
  type: "textarea",
  pos,
  ...extra,
});

const richtext = (pos, extra = {}) => ({
  type: "richtext",
  pos,
  ...extra,
});

const link = (pos, extra = {}) => ({
  type: "multilink",
  pos,
  ...extra,
});

const asset = (pos, extra = {}) => ({
  type: "asset",
  pos,
  ...extra,
});

const option = (pos, options, extra = {}) => ({
  type: "option",
  pos,
  options: options.map((value) => ({ name: value, value })),
  ...extra,
});

const blocks = (pos, componentWhitelist, extra = {}) => ({
  type: "bloks",
  pos,
  restrict_components: true,
  component_whitelist: componentWhitelist,
  ...extra,
});

export const storyblokComponents = [
  {
    name: "page",
    display_name: "Page",
    is_root: true,
    is_nestable: false,
    schema: {
      body: blocks(0, [
        "hero_section",
        "rich_text_video_section",
        "cta_section",
        "card_grid_section",
        "social_links_section",
        "contact_section",
      ]),
      meta_title: text(1),
      meta_description: textarea(2),
    },
  },
  {
    name: "site_settings",
    display_name: "Site Settings",
    is_root: true,
    is_nestable: false,
    schema: {
      logo: asset(0),
      site_name: text(1),
      navigation: blocks(2, ["nav_link"]),
      footer_text: richtext(3),
      footer_links: blocks(4, ["nav_link"]),
    },
  },
  {
    name: "hero_section",
    display_name: "Hero Section",
    is_root: false,
    is_nestable: true,
    schema: {
      headline: text(0),
      body: richtext(1),
      buttons: blocks(2, ["button_link"], { maximum: 3 }),
      background_style: option(3, ["white", "cream", "teal", "purple"]),
      divider_style: option(4, ["top_notch", "bottom_wave", "none"]),
      anchor_id: text(5),
    },
  },
  {
    name: "button_link",
    display_name: "Button Link",
    is_root: false,
    is_nestable: true,
    schema: {
      label: text(0),
      link: link(1),
      style: option(2, ["primary", "secondary", "text"]),
    },
  },
  {
    name: "rich_text_video_section",
    display_name: "Rich Text Video Section",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(0),
      body: richtext(1),
      video_url: text(2),
      layout: option(3, ["text_left", "text_right", "stacked"]),
      background_style: option(4, ["teal", "white", "cream", "purple"]),
      anchor_id: text(5),
    },
  },
  {
    name: "cta_section",
    display_name: "CTA Section",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(0),
      body: richtext(1),
      buttons: blocks(2, ["button_link"], { maximum: 2 }),
      background_style: option(3, ["cream", "white", "teal", "purple"]),
      anchor_id: text(4),
    },
  },
  {
    name: "card_grid_section",
    display_name: "Card Grid Section",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(0),
      intro: richtext(1),
      cards: blocks(2, ["text_card"], { maximum: 6 }),
      columns: option(3, ["2", "3", "4"]),
      background_style: option(4, ["teal", "white", "cream", "purple"]),
      anchor_id: text(5),
    },
  },
  {
    name: "text_card",
    display_name: "Text Card",
    is_root: false,
    is_nestable: true,
    schema: {
      label: text(0),
      text: richtext(1),
      link: link(2),
      link_label: text(3),
    },
  },
  {
    name: "social_links_section",
    display_name: "Social Links Section",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(0),
      links: blocks(1, ["social_link"], { minimum: 1, maximum: 6 }),
      background_style: option(2, ["white", "cream", "teal", "purple"]),
      anchor_id: text(3),
    },
  },
  {
    name: "social_link",
    display_name: "Social Link",
    is_root: false,
    is_nestable: true,
    schema: {
      label: text(0),
      link: link(1),
      icon: option(2, ["instagram", "email", "facebook", "linkedin", "website"]),
    },
  },
  {
    name: "contact_section",
    display_name: "Contact Section",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(0),
      body: richtext(1),
      buttons: blocks(2, ["button_link"], { maximum: 3 }),
      first_name_label: text(3),
      first_name_placeholder: text(4),
      last_name_label: text(5),
      last_name_placeholder: text(6),
      email_label: text(7),
      email_placeholder: text(8),
      subject_label: text(9),
      subject_placeholder: text(10),
      message_label: text(11),
      message_placeholder: text(12),
      submit_label: text(13),
      background_style: option(14, ["white", "cream", "teal", "purple"]),
      anchor_id: text(15),
    },
  },
  {
    name: "nav_link",
    display_name: "Navigation Link",
    is_root: false,
    is_nestable: true,
    schema: {
      label: text(0),
      link: link(1),
    },
  },
];
