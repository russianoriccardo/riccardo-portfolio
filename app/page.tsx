import ProjectCard from "@/components/ProjectCard";
import { projects, site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="container hero">
        <p className="eyebrow">{site.hero.eyebrow}</p>
        <h1>{site.hero.heading}</h1>
        <p className="lead">{site.hero.intro}</p>
      </section>

      <section className="container section" id="work">
        <h2 className="section-title">Selected work</h2>
        <div className="grid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="container section">
        <blockquote className="quote">
          <p>“{site.testimonial.quote}”</p>
          <cite>{site.testimonial.author}</cite>
        </blockquote>
      </section>
    </>
  );
}
