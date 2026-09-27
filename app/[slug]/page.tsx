import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Compare from "@/components/Compare";
import Connect from "@/components/Connect";
import ExplainLayer from "@/components/ExplainLayer";
import { ArrowLeft } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { explanations } from "@/content/explanations";
import { getProject, projects, type Block } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { alternates: { canonical: `/${project.slug}` } };
}

const sizes = "(max-width: 1040px) 100vw, 1000px";

function renderBlock(block: Block, i: number) {
  // Blocks with an id can be the target of an explanation's "Jump to the source" link.
  const id = block.id ? `src-${block.id}` : undefined;
  switch (block.type) {
    case "heading":
      return <h2 key={i} id={id} className="block block-heading">{block.text}</h2>;
    case "text":
      return <div key={i} id={id} className="block rich" dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "columns":
      return (
        <div key={i} id={id} className="block columns">
          <div className="rich" dangerouslySetInnerHTML={{ __html: block.left }} />
          <div className="rich" dangerouslySetInnerHTML={{ __html: block.right }} />
        </div>
      );
    case "image":
      return (
        <Image
          key={i}
          className="block block-image"
          src={block.image.src}
          width={block.image.width}
          height={block.image.height}
          sizes={sizes}
          alt=""
        />
      );
    case "caption":
      return <p key={i} id={id} className="block block-caption">{block.text}</p>;
    case "compare":
      return (
        <div key={i} className="block block-compare">
          <Compare before={block.before} after={block.after} sizes={sizes} />
        </div>
      );
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const others = project.related.map((s) => getProject(s)!);
  const projectExplanations = explanations[project.slug] ?? {};
  const hasExplanations = Object.keys(projectExplanations).length > 0;

  return (
    <main className="container project">
      <Link href="/" className="button back-button">
        <ArrowLeft />
        Go back to the Home
      </Link>

      <h1 className="project-title">{project.titleHtml.replace(/<[^>]+>/g, "")}</h1>
      {hasExplanations && (
        <p className="explain-hint">
          <strong>New</strong> Tap an underlined phrase to see the reasoning behind it.
        </p>
      )}

      <ExplainLayer explanations={projectExplanations}>
        <div id="src-intro" className="columns project-intro">
          <div className="rich" dangerouslySetInnerHTML={{ __html: project.summaryHtml }} />
          <div className="rich" dangerouslySetInnerHTML={{ __html: project.detailsHtml }} />
        </div>

        {project.blocks.map(renderBlock)}
      </ExplainLayer>

      <section className="other-projects">
        <h2>Other projects I worked on</h2>
        <div className="other-grid">
          {others.map((p, i) => (
            <Reveal key={p.slug} from={i % 2 === 0 ? "left" : "right"}>
              <ProjectCard project={p} compact />
            </Reveal>
          ))}
        </div>
      </section>

      <Connect />
    </main>
  );
}
