import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="container hero">
        <Link href="/#work" className="back">
          ← All work
        </Link>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>
        <dl className="meta">
          {project.meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container">
        <div className="cover">
          <Image src={project.cover} alt="" fill sizes="100vw" priority />
        </div>
      </div>

      {project.sections.map((s) => (
        <section key={s.heading} className="container section case-section">
          <h2 className="section-title">{s.heading}</h2>
          <div>
            {s.body.map((b, i) => (
              <p key={i}>{b}</p>
            ))}
          </div>
          {s.image && (
            <div className="cover case-image">
              <Image src={s.image} alt="" fill sizes="100vw" />
            </div>
          )}
        </section>
      ))}

      <section className="container section">
        <p className="eyebrow">Next project</p>
        <Link href={`/work/${next.slug}`} className="next-project">
          {next.title} →
        </Link>
      </section>
    </article>
  );
}
