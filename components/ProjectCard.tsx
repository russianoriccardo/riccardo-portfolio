import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/site";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="card">
      <div className="card-image">
        <Image src={project.cover} alt="" fill sizes="(max-width: 809px) 100vw, 50vw" />
      </div>
      <div className="card-body">
        <ul className="tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <span className="card-link">View case study →</span>
      </div>
    </Link>
  );
}
