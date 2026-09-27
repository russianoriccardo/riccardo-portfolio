// "Explain this decision" content for case study pages.
//
// Each entry belongs to a phrase marked in content/site.ts with <span data-explain="ID">.
// Grounding rules (enforced by `npm run check:explanations`, which runs as part of `npm run lint`):
// - `quote` must appear verbatim in the case study's visible text, inside the section named by
//   `sourceId`. A leading or trailing "…" is allowed.
// - `decision` and `why` only restate or connect what the case study says: no new facts.
// - `principle` and `principleNote` are general UX knowledge, shown under a separate label.

export type Explanation = {
  // One short sentence naming the decision.
  decision: string;
  // Verbatim quote from the case study.
  quote: string;
  // Human-readable name of the section the quote comes from.
  source: string;
  // Where "Jump to the source" goes: a block `id` in content/site.ts, or "intro" for the summary and details.
  sourceId: string;
  // 1–2 sentences connecting the quote to the decision.
  why: string;
  principle: string;
  principleNote: string;
};

export type ProjectExplanations = Record<string, Explanation>;

export const explanations: Record<string, ProjectExplanations> = {
  // Under NDA: only explain what the page explicitly states.
  "social-bonding": {
    "sb-interviews": {
      decision: "Start from user interviews to find the main trust issues.",
      quote:
        "Social media platforms have several problems and painpoints. After conducting some user interviews, these are the key issues we identified:",
      source: "Conducting qualitative interviews",
      sourceId: "interviews",
      why: "The interviews produced the four issues the rest of the design responds to, such as not trusting who you're connecting with.",
      principle: "User-centered design",
      principleNote: "Starting from what users actually say keeps solutions tied to real problems instead of assumptions.",
    },
    "sb-competition": {
      decision: "Study popular platforms to see how they handle the problems users raised.",
      quote:
        "This helped us to research common weaknesses and pain points, but also existing way they may have to provide safe interactions.",
      source: "Research 1/4",
      sourceId: "research-1",
      why: "Looking at other platforms showed both their common weaknesses and the ways they already provide safe interactions.",
      principle: "Jakob's law",
      principleNote: "Users spend most of their time on other products, so they expect yours to work in familiar ways.",
    },
    "sb-trust-first": {
      decision: "Build trust before people interact, not after.",
      quote:
        "The core issue is trust before engagement, so the solutions implemented are meant to reduce uncertainty before the interaction happens.",
      source: "Research 3/4",
      sourceId: "research-3",
      why: "Interviewees said they didn't trust who they were connecting with, so the solutions reduce that uncertainty before any interaction starts.",
      principle: "Uncertainty reduction",
      principleNote: "People are more willing to engage with someone once they know more about them.",
    },
    "sb-verification": {
      decision: "Require identity verification before users can engage with others.",
      quote:
        "we included some verification steps, to make sure that unverified users can't start interacting/creating activities, as a way to provide more secure interactions",
      source: "User flows",
      sourceId: "flows-caption",
      why: "Interviewees said they didn't know if people are who they say they are. Verifying users before they interact answers that directly.",
      principle: "Perceived risk",
      principleNote: "People hold back when a situation feels uncertain; clear safeguards lower that sense of risk.",
    },
    "sb-hidden-photo": {
      decision: "Hide profile pictures until two users are friends.",
      quote: "hiding the profile picture when viewing profiles of users who are not friends yet",
      source: "Research 3/4",
      sourceId: "research-3",
      why: "Interviewees said profile photos create judgment and attract unwanted attention, which can lead to unwanted messages or catfishing.",
      principle: "Halo effect",
      principleNote: "A single visible trait, like a photo, can shape the whole impression people form of someone.",
    },
    "sb-affinity": {
      decision: "Show how much two users have in common, based on shared interests.",
      quote: "…showing a percentage of affinity according to interests that two users have in common",
      source: "Research 3/4",
      sourceId: "research-3",
      why: "Interviewees were tired of random follows and irrelevant suggestions. Matching on shared interests puts quality over quantity.",
      principle: "Similarity attraction",
      principleNote: "People connect more readily with others who share their interests.",
    },
    "sb-light-onboarding": {
      decision: "Keep sign-up light, and add verification when users start engaging.",
      quote:
        "A solution for solving this was found by providing the user with a very light sign up and onboarding flow, which doesn’t require too many verification steps, and adding some extra security layer the moment when users start engaging with other people.",
      source: "Research 4/4",
      sourceId: "research-3",
      why: "The goal was solutions that secure trust without creating too much friction and drop-off, so the extra checks come at the moment they matter.",
      principle: "Progressive onboarding",
      principleNote: "Asking for effort only when its value is clear keeps early drop-off low.",
    },
  },

  greenmatch: {
    "gm-three-layers": {
      decision: "Look at the form from three angles: testing it, reading reviews, and comparing competitors.",
      quote:
        "usability and accessibility evaluation of the existing flow (testing the flow, conducting accessibility tests); qualitative review analysis through Trustpilot reviews to understand abandonment triggers; competitor analysis to identify expected trust and reassurance patterns.",
      source: "Research 1/2",
      sourceId: "research",
      why: "Each layer answers a different question: where the flow breaks, why people abandoned it, and which trust patterns users expect.",
      principle: "Triangulation",
      principleNote: "Combining different research methods makes a finding more reliable than any single source.",
    },
    "gm-reviews": {
      decision: "Use real customer reviews to find what made people abandon the quote.",
      quote: "qualitative review analysis through Trustpilot reviews to understand abandonment triggers;",
      source: "Research 1/2",
      sourceId: "research",
      why: "Testing shows where a flow breaks; reviews add what customers themselves said, pointing to the triggers behind abandonment.",
      principle: "Voice of the customer",
      principleNote: "What people say unprompted often reveals concerns a guided test won't surface.",
    },
    "gm-follow-up": {
      decision: "Name the key insight: users didn't know what would happen after submitting.",
      quote:
        "The research revealed that the core issues were not only related to lack of usability, but also lack of information and trust concerning follow-up after the form completion.",
      source: "Research 2/2",
      sourceId: "research",
      why: "People weren't only struggling to fill in the form. Not knowing what submitting would lead to made stopping feel safer.",
      principle: "Ambiguity aversion",
      principleNote: "People prefer a known outcome to an unknown one, even when the unknown might be fine.",
    },
    "gm-cognitive-friction": {
      decision: "Make the form easier to process by improving its structure and accessibility.",
      quote: "reduce cognitive friction of the form by improving its structure and accessibility;",
      source: "Research 2/2",
      sourceId: "research",
      why: "Usability issues and accessibility barriers were among the reasons users abandoned the quote process, so this solution tackles them directly.",
      principle: "Cognitive load",
      principleNote: "The more mental effort a form demands, the more likely people are to give up before finishing.",
    },
    "gm-trust-information": {
      decision: "Tell users about the benefits and what to expect after they finish.",
      quote: "increase trust and improve information about benefits and expectations after completing the flow",
      source: "Research 2/2",
      sourceId: "research",
      why: "This answers the second core issue the research found: a lack of information and trust concerning follow-up.",
      principle: "Perceived risk",
      principleNote: "People commit more readily when they can see what they'll get and what comes next.",
    },
    "gm-architecture": {
      decision: "Restructure the form so options are easier to scan and less confusing.",
      quote:
        "I redesigned the form architecture to improve scannability and reduce confusing behavior when multiple options were displayed.",
      source: "The design solutions",
      sourceId: "solutions",
      why: "The form behaved confusingly when several options were shown, so the new structure makes each choice easier to read.",
      principle: "Hick's law",
      principleNote: "The more options people see at once, the longer it takes them to decide.",
    },
    "gm-reassurance": {
      decision: "Add reassurance: clearer benefits, stronger social proof and explicit expectations.",
      quote:
        "In parallel, I introduced reassurance elements such as clearer benefit communication, stronger social proof, and explicit expectations.",
      source: "The design solutions",
      sourceId: "solutions",
      why: "Alongside the structural fixes, these respond to the low trust signals and missing information the research identified.",
      principle: "Social proof",
      principleNote: "People look at what others have done to judge whether a choice is safe.",
    },
  },

  venato: {
    "ve-interviews": {
      decision: "Start with quick interviews to find the most time-consuming steps for resellers.",
      quote:
        "I focused on fast qualitative interviews with online resellers to identify the most time-consuming steps in their workflow.",
      source: "Research 1/4",
      sourceId: "research-1",
      why: "With a new app to design in 3 weeks, fast interviews pointed straight at the steps that cost resellers the most time.",
      principle: "Qualitative discovery",
      principleNote: "A small number of interviews usually surfaces the biggest problems early, before investing in design.",
    },
    "ve-decision-support": {
      decision: "Go beyond speed: help sellers decide on prices and write descriptions.",
      quote:
        "The most valuable insight was that users didn’t simply need faster cross-listing. They also needed decision support in pricing and description generation, as these are the factors that create the most friction in the flow.",
      source: "Research 1/4",
      sourceId: "research-1",
      why: "Pricing and descriptions created the most friction, so a faster cross-listing tool alone wouldn't have solved the real problem.",
      principle: "Jobs to be done",
      principleNote: "People want progress on the underlying job, not just a faster version of today's steps.",
    },
    "ve-ai-listing": {
      decision: "Generate listings with AI so sellers do less manual work.",
      quote: "reducing manual effort through AI-assisted listing generation",
      source: "Research 2/4",
      sourceId: "research-1",
      why: "Creating a single listing took 40 to 120 minutes, so cutting that manual effort goes straight at the main pain point.",
      principle: "Recognition over recall",
      principleNote: "Reviewing and adjusting a suggestion takes less effort than producing everything from scratch.",
    },
    "ve-tracking": {
      decision: "Add inventory and portfolio tracking to give sellers a reason to come back.",
      quote: "creating longer-term retention through inventory and portfolio tracking",
      source: "Research 2/4",
      sourceId: "research-1",
      why: "Tracking was chosen for longer-term retention, and in user validation the perceived value of inventory tracking was among the strongest feedback.",
      principle: "Stored value",
      principleNote: "The more useful information people keep in a product, the more reason they have to return.",
    },
    "ve-rapid-loop": {
      decision: "Limit the scope to 3 core features and iterate in fast loops with stakeholders.",
      quote:
        "Because speed was critical, I only focused on designing these 3 core features of the product by initially going through a rapid loop of solution design, wireframing and stakeholders validation and feedback.",
      source: "Research 3/4",
      sourceId: "research-3",
      why: "Speed was critical, so narrowing the scope and validating with stakeholders early kept the work on the features that mattered.",
      principle: "Iterative design",
      principleNote: "Short design-and-review cycles catch wrong turns while they're still cheap to fix.",
    },
    "ve-early-wireframes": {
      decision: "Check feasibility and business value on wireframes, before high-fidelity design.",
      quote:
        "Wireframes were reviewed early with the CTO and PM to quickly validate feasibility, business value, and investor-facing clarity before moving into high-fidelity design and prototyping.",
      source: "Research 4/4",
      sourceId: "research-3",
      why: "Reviewing at the wireframe stage let the CTO and PM confirm feasibility, business value and investor-facing clarity before the detailed design work.",
      principle: "Low-fidelity prototyping",
      principleNote: "Rough designs invite honest feedback on the idea and are cheap to change.",
    },
    "ve-fast-decision": {
      decision: "Treat a fast, informed \"no\" as a valuable outcome of the design sprint.",
      quote:
        "Even though the concept was not approved for investment, the sprint helped surface the viability and market assumptions early, preventing the investor committee from committing larger resources without stronger validation.",
      source: "Final considerations",
      sourceId: "final",
      why: "Surfacing viability and market assumptions early kept the investor committee from committing larger resources without stronger validation.",
      principle: "Fail fast",
      principleNote: "Learning early that an idea won't work costs far less than learning it after building it.",
    },
  },
};
