// Plain-text versions of case study content, as a visitor sees it on the page.
// Used to check that explanation quotes appear verbatim (scripts/check-explanations.ts, app/api/explain).
import type { Block, Project } from "./site";

const entities: Record<string, string> = { amp: "&", quot: '"', "#39": "'", apos: "'", lt: "<", gt: ">", nbsp: " " };

export function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|li|ul|ol|div|h\d)>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|quot|#39|apos|lt|gt|nbsp);/g, (_, name: string) => entities[name])
    .replace(/\s+/g, " ")
    .trim();
}

export function blockHtml(block: Block): string {
  switch (block.type) {
    case "heading":
    case "caption":
      return block.text;
    case "text":
      return block.html;
    case "columns":
      return `${block.left} ${block.right}`;
    default:
      return "";
  }
}

// Section ids used for "Jump to the source": "intro" for the summary and details, then each block's
// `id` from content/site.ts, or "b<index>" for blocks without one. The page renders them as `src-<id>`.
export function sectionId(block: Block, index: number): string {
  return block.id ?? `b${index}`;
}

export type Section = { id: string; text: string };

export function sections(project: Project): Section[] {
  return [
    { id: "intro", text: htmlToText(`${project.summaryHtml} ${project.detailsHtml}`) },
    ...project.blocks
      .map((block, i) => ({ id: sectionId(block, i), text: htmlToText(blockHtml(block)) }))
      .filter((section) => section.text),
  ];
}

export function sectionText(project: Project, id: string): string | undefined {
  return sections(project).find((section) => section.id === id)?.text;
}

// Every HTML string of a project that can contain <span data-explain> markers.
export function projectHtml(project: Project): string[] {
  return [project.titleHtml, project.summaryHtml, project.detailsHtml, ...project.blocks.map(blockHtml)];
}

export function projectText(project: Project): string {
  return htmlToText(projectHtml(project).join(" "));
}

// Readable version of the whole case study, with headings, for the "Explain this" prompt.
export function promptText(project: Project): string {
  const lines = [`# ${htmlToText(project.titleHtml)}`, "", "## Overview", htmlToText(project.summaryHtml), htmlToText(project.detailsHtml)];
  for (const block of project.blocks) {
    if (block.type === "heading") lines.push("", `## ${block.text}`);
    else if (block.type === "columns") lines.push(htmlToText(block.left), htmlToText(block.right));
    else if (block.type === "caption") lines.push(`(Image caption) ${block.text}`);
    else if (block.type === "text") lines.push(htmlToText(block.html));
  }
  return lines.join("\n");
}

// Collapse whitespace so text copied from the page (with line breaks) can be compared to the source.
export function normalizeSpace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}
