// Plain-text versions of case study content, as a visitor sees it on the page.
// Used to check that explanation quotes appear verbatim (scripts/check-explanations.ts).
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

// The intro (summary + details) is addressed as "intro"; blocks by their optional `id`.
export function sectionText(project: Project, id: string): string | undefined {
  if (id === "intro") return htmlToText(`${project.summaryHtml} ${project.detailsHtml}`);
  const block = project.blocks.find((b) => b.id === id);
  return block ? htmlToText(blockHtml(block)) : undefined;
}

// Every HTML string of a project that can contain <span data-explain> markers.
export function projectHtml(project: Project): string[] {
  return [project.titleHtml, project.summaryHtml, project.detailsHtml, ...project.blocks.map(blockHtml)];
}

export function projectText(project: Project): string {
  return htmlToText(projectHtml(project).join(" "));
}
