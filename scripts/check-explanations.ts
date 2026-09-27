// Checks that every "Explain this decision" entry is grounded in its case study.
// Run with `npm run check:explanations` (also part of `npm run lint`).
//
// Fails if:
// - a quote isn't found verbatim in the project's visible text, or not inside its `sourceId` section;
// - a `sourceId` doesn't exist;
// - a <span data-explain> ID has no entry, or an entry has no matching span.
import { explanations } from "../content/explanations.ts";
import { projects } from "../content/site.ts";
import { projectHtml, projectText, sectionText } from "../content/text.ts";

const errors: string[] = [];
const stripEllipsis = (quote: string) => quote.replace(/^…\s*/, "").replace(/\s*…$/, "");

for (const slug of Object.keys(explanations)) {
  if (!projects.some((p) => p.slug === slug)) errors.push(`${slug}: no project with this slug in content/site.ts`);
}

let checked = 0;
for (const project of projects) {
  const entries = explanations[project.slug] ?? {};
  const text = projectText(project);
  const spanIds = new Set(
    projectHtml(project).flatMap((html) => [...html.matchAll(/data-explain="([^"]+)"/g)].map((m) => m[1])),
  );

  for (const id of spanIds) {
    if (!entries[id]) errors.push(`${project.slug}: <span data-explain="${id}"> has no entry in content/explanations.ts`);
  }

  for (const [id, entry] of Object.entries(entries)) {
    checked++;
    const where = `${project.slug} / ${id}`;
    if (!spanIds.has(id)) errors.push(`${where}: no <span data-explain="${id}"> in content/site.ts`);

    const quote = stripEllipsis(entry.quote);
    if (!text.includes(quote)) {
      errors.push(`${where}: quote not found verbatim in the case study:\n    "${entry.quote}"`);
      continue;
    }
    const section = sectionText(project, entry.sourceId);
    if (section === undefined) errors.push(`${where}: sourceId "${entry.sourceId}" matches no block id (or "intro")`);
    else if (!section.includes(quote)) errors.push(`${where}: quote is not inside the "${entry.sourceId}" section`);
  }
}

if (errors.length) {
  console.error(`check:explanations failed (${errors.length} problem${errors.length > 1 ? "s" : ""}):\n`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log(`check:explanations: ${checked} explanations OK, every quote found verbatim.`);
