// All site copy, links and project case studies live in this file.
// Text fields ending in "Html" accept simple inline HTML (<strong>, <em>, <br>, <p>, <ul>, <ol>, <li>).

export const site = {
  name: "Riccardo Russiano",
  title: "Riccardo Russiano - UI/UX Designer",
  description:
    "I am a UI/UX DESIGNER Turning complex ideas into impactful and user friendly experiences.",
  url: "https://riccardorussiano.com",
  email: "russianoriccardo@gmail.com",
  instagram: "https://www.instagram.com/uxriccardo/",
  linkedin: "https://www.linkedin.com/in/riccardo-russiano/",

  nav: [
    { label: "Featured projects", href: "/#featuredprojects" },
    { label: "About me", href: "/#about" },
  ],

  hero: {
    heading: "Where business goals, user needs and tech meet I design there",
    introHtml:
      "<p>With a background as a Senior Technical Specialist, I’ve spent years working inside complex systems, collaborating with engineers, and understanding where products break down in practice.</p>" +
      "<p>My work focuses on <strong>reducing friction</strong>, <strong>clarifying flows</strong>, and designing <strong>solutions that balance user needs with technical and business constraints</strong>, especially in SaaS and platform-based products.</p>",
    avatar: { src: "/images/avatar.png", width: 683, height: 1024 },
  },

  companies: {
    heading: "I've collaborated with companies like…",
    items: [
      { name: "META", icon: "/images/logo-meta.svg" },
      { name: "VENATO", icon: "/images/logo-venato.svg" },
      { name: "META", icon: "/images/logo-meta-rings.svg" },
      { name: "DALUX", icon: "/images/logo-dalux.svg" },
      { name: "TELEPERFORMANCE", icon: "/images/logo-teleperformance.svg" },
    ],
  },

  featured: {
    heading: "FEATURED PROJECTS",
    subheading: "Case studies focused on clarity, feasibility, and impact",
    // Order on the home page; the first one is shown full width.
    order: ["social-bonding", "greenmatch", "venato"],
  },

  testimonials: {
    heading: "WHAT IS LIKE TO WORK WITH ME",
    items: [
      {
        quote: "Riccardo always goes extra mile for delivering results above the target!",
        name: "Debora M.",
        role: "First Line Manager at Teleperformance",
      },
      {
        quote: "Riccardo has made an impact since the first day he joined our team!",
        name: "Kendall C.",
        role: "CEO at Venato",
      },
      {
        quote:
          "I admire Riccardo’s work and  the professionalism he has shown throughout our interactions. His designs are nothing short of inspiring, and it's clear that he has a remarkable talent",
        name: "Murli R.",
        role: "",
      },
    ],
  },

  connect: {
    heading: "Let’s connect",
    text: "Reach out on my social media accounts! I share insights about UX psychology and product features 🧠",
  },
};

export type Img = { src: string; width: number; height: number };

export type Block =
  | { type: "heading"; text: string }
  | { type: "text"; html: string }
  | { type: "columns"; left: string; right: string }
  | { type: "image"; image: Img }
  | { type: "caption"; text: string }
  | { type: "compare"; before: Img; after: Img };

export type Project = {
  slug: string;
  name: string;
  titleHtml: string;
  summaryHtml: string;
  detailsHtml: string;
  // Card media: a single image, or a before/after comparison slider.
  cover: Img | { before: Img; after: Img };
  blocks: Block[];
  // Slugs shown under "Other projects I worked on", in order.
  related: string[];
};

const img = (name: string, width: number, height: number): Img => ({
  src: `/images/${name}`,
  width,
  height,
});

export const projects: Project[] = [
  {
    slug: "social-bonding",
    name: "Social Bonding",
    related: ["venato", "greenmatch"],
    titleHtml: "Social Bonding: a strategy to build a trust-centered social media app",
    summaryHtml:
      "<p>Users have several trust issues when entering social media contexts, specially when it comes to prove the authenticity of the people they interact with, which directly impacts their will to engage and form meaningful connections.<br><br>Through early research, interviews, and competitive analysis, I identified key areas where users feel unsafe on other platforms, and designed a <strong>trust-centered user experience</strong>.</p>" +
      "<p>(project under NDA, some details about the product may have been changed)</p>",
    detailsHtml:
      "<p><strong>TEAM</strong> - 3 Product designers, Developers, Project Manager</p>" +
      "<p><strong>MY ROLE</strong> - I collaborated in conducting the research for ideating solutions for building a safer user experience</p>" +
      "<p><strong>PROJECT SCOPE</strong> - Create a safe social media environment for users, and help them to build more meaningful connections</p>" +
      "<p><strong>YEAR</strong> - 2025</p>",
    cover: img("social-bonding-cover.png", 2048, 1059),
    blocks: [
      { type: "image", image: img("social-bonding-hero.png", 1892, 1181) },
      { type: "heading", text: "CONDUCTING QUALITATIVE INTERVIEWS TO ASSESS THE MAIN TRUST ISSUES" },
      {
        type: "text",
        html: "<p>Social media platforms have several problems and painpoints. After conducting some user interviews, these are the key issues we identified:</p>",
      },
      {
        type: "columns",
        left: "<p><strong>\"I don’t trust who I’m connecting with on other platforms.\"</strong></p><p>most social medias push followers, and growth, which also leads to spammers, bots, fake accounts…policies and controls against these problems are very limited</p>",
        right:
          "<p><strong>“Profile photos create judgment and attract unwanted attention”</strong></p><p>profile pitures are publicly visible and drive judgment, initial attraction. Sometimes they also end up in receiving unwanted messages, spamming or in worst cases may lead to catfishing</p>",
      },
      {
        type: "columns",
        left: "<p><strong>“I don’t know if people are who they say they are.”</strong></p><p>Fake locations, fake profiles, fake ages…the control on that is also very limited, and it’s hard to verify the identity of other profiles</p>",
        right:
          "<p><strong>“I’m tired of random follows and irrelevant suggestions.”</strong></p><p>Quantity over quality…every user engage in tons of interactions that are only creating noise and meaningless interactions</p>",
      },
      { type: "heading", text: "THE RESEARCH LEADING TO THE DESIGN OF A SAFER SOCIAL MEDIA EXPERIENCE" },
      {
        type: "columns",
        left: "<p><strong>1/4 - Researching the competition to better understand existing painpoints</strong></p><p>Another useful step was analyzing the most popular social media platforms, to better target the main problems highlighted during the first interview.</p><p>This helped us to research common weaknesses and pain points, but also existing way they may have to provide safe interactions.</p>",
        right:
          "<p><strong>2/4 Breaking down the main issues, to define solutions to tackle them</strong></p><p>Visualizing the main painpoints on a board has been useful for brainstorming solutions to tackle them.</p><p>For everyone of the main painpoints, we broke down some possible solutions, oriented to improve interactions between user and build a safe platform.</p>",
      },
      { type: "image", image: img("social-bonding-competitors.png", 2048, 1506) },
      {
        type: "caption",
        text: "The competitor analysis of other social media platforms, helped us gathering insights about their user's interaction flows and work on improvements to add into Social Bonding for creating more secure and meaningful connections.",
      },
      { type: "image", image: img("social-bonding-board.png", 2048, 1735) },
      {
        type: "caption",
        text: "For every major issue identified in the initial research, we identified possible solutions to implement in our flow.",
      },
      {
        type: "columns",
        left: "<p><strong>3/4 Implementing flows to improve safer engagement</strong></p><p>The core issue is <strong>trust before engagement</strong>, so the solutions implemented are meant to reduce uncertainty before the interaction happens.</p><p>Some of the applied solutions are:</p><ul><li>requesting identity verification before allowing allowing users to start to engage with other people on the platform, under any aspect (friends request, direct messaging, creation of events and meetups...)</li><li>hiding the profile picture when viewing profiles of users who are not friends yet</li><li>limting the user profile view to matching interest, and showing a percentage of affinity according to interests that two users have in common</li></ul>",
        right:
          "<p><strong>4/4 Cross-department iteration and feedback to validate decisions and integrate them in the product</strong></p><p>Because these decisions impacted not only the user experience but also moderation technical feasibility, and business priorities, collaboration with other departments is an important part of the workflow.</p><p>One focus area was for example <strong>balancing users’ trust with onboarding friction</strong>, which required some back and forth between design exploration and stakeholder alignment, to find solutions that secure trust, but don’t create too much friction and drop off.</p><p>A solution for solving this was found by providing the user with a very light sign up and onboarding flow, which doesn’t require too many verification steps, and adding some extra security layer the moment when users start engaging with other people.</p>",
      },
      { type: "image", image: img("social-bonding-flows.png", 2048, 1781) },
      {
        type: "caption",
        text: "When defining user flows where the user interact with other users on the platform, we included some verification steps, to make sure that unverified users can't start interacting/creating activities, as a way to provide more secure interactions",
      },
      { type: "image", image: img("social-bonding-screens-1.png", 1892, 1181) },
      { type: "image", image: img("social-bonding-screens-2.png", 1892, 1181) },
      { type: "heading", text: "CONCLUSIONS - METRICS WE WILL TRACK AND FUTURE IMPROVEMENTS" },
      {
        type: "text",
        html:
          "<p>As the goal is to integrate as much as possible safe interactions between users, we want to start to focus on turning our qualitative insights into measurable outcomes. To validate our trust-driven design, we'll track:</p>" +
          "<ul class=\"spaced\">" +
          "<li><strong>User Verification Completion Rate</strong><br><em>How many users complete ID + info verification?</em> This will show friction or trust barriers at onboarding.</li>" +
          "<li><strong>Successful Mutual Connections</strong><br><em>How often do users match based on shared interests, and how many of those connections turn into meaningful interactions (messages/events)?</em></li>" +
          "<li><strong>Spam or Abuse Reports Per 1,000 Users</strong><br><em>A benchmark for trust &amp; safety effectiveness compared to industry standards.</em></li>" +
          "<li><strong>Event Participation &amp; Show-Up Rate</strong><br><em>Are verified local meetups resulting in real engagement?</em></li>" +
          "<li><strong>Drop-off Points in Onboarding or Interaction Flow</strong><br><em>Where do users disengage — is it verification, profile setup, or matching?</em></li>" +
          "</ul>" +
          "<p><strong>ROOM FOR IMPROVEMENTS</strong></p>" +
          "<p>While our foundational safety features address critical gaps in the social media landscape, we're already looking ahead to enhance both <em>trust</em> and <em>connection quality</em>. Our roadmap includes:</p>" +
          "<ul class=\"spaced\">" +
          "<li><strong>Progressive Verification</strong><br>Verify user information in several steps (e.g., phone number first, ID later) to reduce onboarding friction while maintaining safety - we are already getting there, as we ask users to verify email/phone number and location during the onboarding, and their ID later on</li>" +
          "<li><strong>Contextual Safety Nudges</strong><br>Microcopy or UI prompts that guide user behavior (e.g., “You’re about to share your location with a new contact”).</li>" +
          "<li><strong>Improving Interest Matching</strong><br>Introducing intent tagging (e.g., “collaborate,” “learn,” “meetup”) to refine how matches are made beyond just shared topics, and build more meaningful connections</li>" +
          "<li><strong>Post-Interaction Feedback Loops</strong><br>Letting users rate their experience after events or conversations to continuously improve match quality and community safety.</li>" +
          "</ul>",
      },
    ],
  },
  {
    slug: "greenmatch",
    name: "Greenmatch",
    related: ["venato", "social-bonding"],
    titleHtml:
      "Greenmatch: <strong>solving conversion drop-off in an acquisition flow through UX and trust optimization</strong>",
    summaryHtml:
      "<p>This case focused on improving a lead generation flow where <strong>usability issues, accessibility barriers, and low trust signals</strong> were causing users to abandon the quote process, directly impacting lead conversion.</p>" +
      "<p>I transformed a high-friction acquisition flow into a clearer, trust-led experience designed to reduce abandonment and unlock higher lead conversion.</p>",
    detailsHtml:
      "<p><strong>TEAM</strong> - Product designer (me), Lead Designer</p>" +
      "<p><strong>MY ROLE</strong> - I conducted usability and accessibility tests, as well as UX research for improving the current design of the lead gen form</p>" +
      "<p><strong>PROJECT SCOPE</strong> - Improving the lead gen form (case study assignment)</p>" +
      "<p><strong>YEAR</strong> - 2024</p>",
    cover: {
      before: img("greenmatch-before.png", 2048, 1536),
      after: img("greenmatch-after.png", 2048, 1536),
    },
    blocks: [
      {
        type: "compare",
        before: img("greenmatch-before.png", 2048, 1536),
        after: img("greenmatch-after.png", 2048, 1536),
      },
      { type: "heading", text: "GREENMATCH SOLAR LEAD GEN FORM - THE RESEARCH BEHIND THE REDESIGN" },
      {
        type: "columns",
        left: "<p><strong>1/2 Three layers of discovery to uncover core issues in the form</strong></p><p>I structured discovery into three layers:</p><ol class=\"spaced\"><li>usability and accessibility evaluation of the existing flow (testing the flow, conducting accessibility tests);</li><li>qualitative review analysis through Trustpilot reviews to understand abandonment triggers;</li><li>competitor analysis to identify expected trust and reassurance patterns.</li></ol>",
        right:
          "<p><strong>2/2 Putting together the findings from the research to design solutions</strong></p><p>The research revelead that the core issues where not only related to lack of usability, but also <strong>lack of information and trust concerning follow-up</strong> after the form competion.</p><p>I prioritized two design solutions:</p><ol class=\"spaced\"><li><strong>reduce cognitive friction</strong> of the form by improving its structure and accessibility;</li><li><strong>increase trust and improve information</strong> about benefits and expectations after completing the flow</li></ol>",
      },
      { type: "image", image: img("greenmatch-competitors.png", 2048, 1008) },
      {
        type: "caption",
        text: "Conducting a competitor analysis helped me to spot some recurring patterns to be used in Greenmatch Solar form and also some elements that the competition was missing and that could help Greenmatch to stand out.",
      },
      { type: "image", image: img("greenmatch-brief.png", 2048, 1396) },
      {
        type: "caption",
        text: "The design brief was extremely helpful for breaking down pros and cons of the current design of the form, and ideate possible solutions to fix it.",
      },
      { type: "heading", text: "THE DESIGN SOLUTIONS TO FIX THE FORM" },
      {
        type: "text",
        html: "<p>I <strong>redesigned the form architecture</strong> to improve scannability and reduce confusing behavior when multiple options were displayed.</p><p>In parallel, <strong>I introduced reassurance elements</strong> such as clearer benefit communication, stronger social proof, and explicit expectations.</p>",
      },
      { type: "image", image: img("greenmatch-solution-1.png", 1892, 1181) },
      { type: "image", image: img("greenmatch-solution-2.png", 1892, 1181) },
      { type: "image", image: img("greenmatch-solution-3.png", 1892, 1181) },
      { type: "heading", text: "LEARNINGS FROM THE PROJECT" },
      {
        type: "text",
        html: "<p>Although this originated as a design challenge, I approached it as a <strong>real business and product problem rather</strong> than an isolated UI exercise.<br>My focus was on demonstrating not only the solution, but the decision-making process behind it.</p><p>What I’m most proud of in this project is how the redesign moved beyond surface usability fixes and addressed the deeper dynamics driving users’ abandonment.</p>",
      },
    ],
  },
  {
    slug: "venato",
    name: "Venato",
    related: ["social-bonding", "greenmatch"],
    titleHtml: "Venato: reducing seller listing friction by 85% through rapid product validation",
    summaryHtml:
      "<p>Online resellers experience extremely <strong>high-friction in the reselling workflow.</strong> They spend between 40 and 120 minutes to create a single listing, which made the effort disproportionate to the financial return.</p>" +
      "<p>I transformed a high-friction reseller workflow into a rapid, AI-assisted listing experience that <strong>reduced creation time by 85% and improved seller decision confidence</strong>.</p>",
    detailsHtml:
      "<p><strong>TEAM</strong> - Product designer (me), CTO, Project Manager</p>" +
      "<p><strong>MY ROLE</strong> - I led the whole design process, from initial research to implementation</p>" +
      "<p><strong>PROJECT SCOPE</strong> - Designing a totally new B2C mobile app, in 3 weeks</p>" +
      "<p><strong>YEAR</strong> - 2024</p>",
    cover: img("venato-cover.png", 2048, 1326),
    blocks: [
      { type: "image", image: img("venato-hero.png", 2048, 1326) },
      { type: "heading", text: "THE RESEARCH AND DESIGN PROCESS BEHIND VENATO" },
      {
        type: "columns",
        left: "<p><strong>1/4 - Qualitative interviews to uncover online resellers painpoints</strong></p><p>I focused on fast qualitative interviews with online resellers to identify the most time-consuming steps in their workflow.</p><p>The most valuable insight was that users didn’t simply need faster cross-listing.<br>They also needed decision support in pricing and description generation, as these are the factors that create the most friction in the flow.</p>",
        right:
          "<p><strong>2/4 Turning research insights into core features for the product</strong></p><p>Based on the research, I prioritized three strategic core features:</p><ul><li>reducing manual effort through AI-assisted listing generation</li><li>improving seller confidence through ipricing support</li><li>creating longer-term retention through inventory and portfolio tracking</li></ul>",
      },
      { type: "image", image: img("venato-competitors.png", 1800, 1000) },
      {
        type: "caption",
        text: "During my research, I conducted some competitor analysis for analyzing recurring patterns on their platforms, as well as features that could've been improved in Venato.",
      },
      {
        type: "columns",
        left: "<p><strong>3/4 - Cross-roles iteration loop to quickly validate design decisions</strong></p><p>Because speed was critical, I only focused on designing these 3 core features of the product by initially going through a rapid loop of <strong>solution design, wireframing and stakeholders validation and feedback</strong>.</p><p>In this context, collaboration with the CTO and the Project Manager was crucial to validate design decisions.</p>",
        right:
          "<p><strong>4/4 - Quick wireframing and prototyping to validate product value proposition with test users</strong></p><p>Wireframes were reviewed early with the CTO and PM to quickly validate feasibility, business value, and investor-facing clarity before moving into high-fidelity design and prototyping.</p>",
      },
      { type: "image", image: img("venato-iteration.png", 1800, 1024) },
      {
        type: "caption",
        text: "Coordinating with the rest of team has been a key part of the research, for gathering early feedback and making sure that my designs were aligned with their expectations.",
      },
      { type: "image", image: img("venato-tracking.png", 1892, 1181) },
      { type: "image", image: img("venato-listing.png", 1892, 1181) },
      { type: "heading", text: "USERS' VALIDATION AND REACTIONS" },
      {
        type: "text",
        html: "<p>The final prototype successfully demonstrated the product’s value proposition to early target users.<br>In user validation, the strongest feedback centered around the reduction in listing effort and the perceived value of inventory tracking:</p>",
      },
      { type: "image", image: img("venato-feedback.png", 1800, 1013) },
      { type: "heading", text: "FINAL CONSIDERATIONS" },
      {
        type: "text",
        html: "<p>Even though the concept was not approved for investment, the sprint helped surface the viability and market assumptions early, preventing the investor committee from committing larger resources without stronger validation.</p><p>One of the most valuable learnings from this project was understanding how design can accelerate strategic decisions, even when the outcome is negative. <br>In many ways, helping the business to make an informed decision faster is just as valuable as shipping the product itself.</p>",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
