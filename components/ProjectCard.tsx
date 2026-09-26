import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/site";
import Compare from "./Compare";
import { ArrowRight } from "./Icons";

type Props = { project: Project; wide?: boolean; compact?: boolean };

export default function ProjectCard({ project, wide, compact }: Props) {
  const sizes = wide ? "(max-width: 1199px) 100vw, 1080px" : "(max-width: 1199px) 100vw, 520px";
  const cover = project.cover;

  return (
    <article className={`card${wide ? " card-wide" : ""}${compact ? " card-compact" : ""}`}>
      <div className="card-media">
        {"before" in cover ? (
          <Compare before={cover.before} after={cover.after} sizes={sizes} />
        ) : (
          <Image src={cover.src} alt={project.name} fill sizes={sizes} />
        )}
      </div>
      <div className="card-body">
        <h3 dangerouslySetInnerHTML={{ __html: project.titleHtml }} />
        <div className="card-text" dangerouslySetInnerHTML={{ __html: project.summaryHtml }} />
        <Link href={`/${project.slug}`} className="button card-button">
          Read more about {project.name}
          <ArrowRight />
        </Link>
      </div>
    </article>
  );
}
