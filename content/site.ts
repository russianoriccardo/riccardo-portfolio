// All site copy and project data lives here. Edit this file to change content;
// the pages read from it and don't need to change.
//
// NOTE: the original Framer site could not be fetched from the build environment,
// so text marked "TODO" is a placeholder to replace with the exact copy from
// riccardorussiano.com. Images live in /public/images and can be swapped in place.

export const site = {
  name: "Riccardo Russiano",
  role: "UI/UX Designer",
  title: "Riccardo Russiano - UI/UX Designer",
  description:
    "Riccardo Russiano is a UI/UX Designer focused on reducing friction, clarifying flows and designing solutions that balance user needs with technical and business constraints.",
  email: "hello@riccardorussiano.com", // TODO: confirm contact email
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO: profile URL
    { label: "Instagram", href: "https://www.instagram.com/uiuxrichruss/" },
  ],
  hero: {
    eyebrow: "UI/UX Designer",
    heading: "I design products that reduce friction and make complex flows feel simple.",
    intro:
      "With a background as a Senior Technical Specialist, my work focuses on reducing friction, clarifying flows and designing solutions that balance user needs with technical and business constraints, especially in SaaS and platform-based products.",
  },
  about: {
    heading: "About me",
    paragraphs: [
      "I'm Riccardo, a UI/UX Designer with a background as a Senior Technical Specialist.",
      "Years spent close to users and their problems taught me to look for where things break: unclear steps, missing feedback, low trust. I use early research, interviews and competitive analysis to understand those moments, then design solutions that balance user needs with technical and business constraints.",
      "I'm especially interested in SaaS and platform-based products, where small improvements in a flow compound into real results.",
    ],
    image: "/images/portrait.svg",
    skills: [
      "User research",
      "Interviews",
      "Competitive analysis",
      "Information architecture",
      "Wireframing",
      "Prototyping",
      "UI design",
      "Usability testing",
      "Accessibility",
    ],
  },
  testimonial: {
    quote: "His designs are nothing short of inspiring.",
    author: "TODO: name, role",
  },
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  cover: string;
  meta: { label: string; value: string }[];
  sections: { heading: string; body: string[]; image?: string }[];
};

export const projects: Project[] = [
  {
    slug: "ai-assisted-listing",
    title: "AI-assisted listing for resellers",
    summary:
      "Transforming a high-friction reseller workflow into a rapid, AI-assisted listing experience that reduced creation time by 85% and improved seller decision confidence.",
    tags: ["Mobile", "AI", "Marketplace"],
    cover: "/images/ai-assisted-listing.svg",
    meta: [
      { label: "Role", value: "UI/UX Designer" },
      { label: "Platform", value: "Mobile" },
      { label: "Timeline", value: "TODO" },
      { label: "Outcome", value: "-85% listing time" },
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "Resellers had to create every listing by hand: photos, title, category, condition, price. The process was slow and full of small decisions that made sellers second-guess themselves.",
          "I redesigned the workflow around AI assistance, so sellers start from a suggested listing and only confirm or adjust what matters.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "TODO: describe the research findings and the key friction points in the original workflow.",
        ],
        image: "/images/ai-assisted-listing-2.svg",
      },
      {
        heading: "The solution",
        body: [
          "TODO: describe the AI-assisted flow, the key screens and design decisions.",
        ],
        image: "/images/ai-assisted-listing-3.svg",
      },
      {
        heading: "Results",
        body: [
          "Listing creation time dropped by 85%, and sellers reported more confidence in their pricing and category decisions.",
        ],
      },
    ],
  },
  {
    slug: "lead-generation-flow",
    title: "Improving a lead generation flow",
    summary:
      "Usability issues, accessibility barriers and low trust signals were causing users to abandon the quote process, directly impacting lead conversion.",
    tags: ["Web", "Conversion", "Accessibility"],
    cover: "/images/lead-generation-flow.svg",
    meta: [
      { label: "Role", value: "UI/UX Designer" },
      { label: "Platform", value: "Web" },
      { label: "Timeline", value: "TODO" },
      { label: "Focus", value: "Conversion, accessibility" },
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "The quote request flow was the main source of leads, but many users started it and never finished.",
          "I audited the flow for usability, accessibility and trust, then redesigned it to make each step clear and reassuring.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "Usability issues, accessibility barriers and low trust signals were causing users to abandon the quote process, directly impacting lead conversion.",
        ],
        image: "/images/lead-generation-flow-2.svg",
      },
      {
        heading: "The solution",
        body: ["TODO: describe the redesigned flow and key design decisions."],
        image: "/images/lead-generation-flow-3.svg",
      },
      {
        heading: "Results",
        body: ["TODO: add the measured or expected impact."],
      },
    ],
  },
  {
    slug: "social-media-trust",
    title: "Designing for trust on social media",
    summary:
      "Using early research, interviews and competitive analysis to design experiences that address users' safety concerns on social platforms.",
    tags: ["Mobile", "Research", "Safety"],
    cover: "/images/social-media-trust.svg",
    meta: [
      { label: "Role", value: "UI/UX Designer" },
      { label: "Platform", value: "Mobile" },
      { label: "Timeline", value: "TODO" },
      { label: "Methods", value: "Interviews, competitive analysis" },
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "Many people don't feel safe on social media. This project explored why, and what a platform could do to earn back their trust.",
        ],
      },
      {
        heading: "Research",
        body: [
          "TODO: summarise interviews, competitive analysis and key insights.",
        ],
        image: "/images/social-media-trust-2.svg",
      },
      {
        heading: "The solution",
        body: ["TODO: describe the concept and key screens."],
        image: "/images/social-media-trust-3.svg",
      },
      {
        heading: "Learnings",
        body: ["TODO: add reflections and next steps."],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
