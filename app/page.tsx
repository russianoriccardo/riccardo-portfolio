import Image from "next/image";
import Connect from "@/components/Connect";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getProject, site } from "@/content/site";

export default function Home() {
  const [first, ...rest] = site.featured.order.map((slug) => getProject(slug)!);
  const { hero, companies, testimonials } = site;

  return (
    <>
      <Header />
      <main className="container">
        <section className="hero" id="about">
          <h1 className="slide-in-left">{hero.heading}</h1>
          <div className="hero-body">
            <div className="hero-intro slide-in-left" dangerouslySetInnerHTML={{ __html: hero.introHtml }} />
            <Image
              className="hero-avatar slide-in-right"
              src={hero.avatar.src}
              width={hero.avatar.width}
              height={hero.avatar.height}
              alt="Illustrated portrait of Riccardo"
              priority
            />
          </div>
        </section>

        <section className="companies">
          <p>{companies.heading}</p>
          <div className="marquee">
            {/* The list is rendered twice so the scroll animation loops seamlessly. */}
            <ul className="marquee-track">
              {[...companies.items, ...companies.items].map((c, i) => (
                <li key={i} aria-hidden={i >= companies.items.length}>
                  <img src={c.icon} alt="" />
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="featured" id="featuredprojects">
          <h2 className="section-heading">{site.featured.heading}</h2>
          <p className="section-subheading">{site.featured.subheading}</p>
          <div className="featured-grid">
            <Reveal className="card-wide">
              <ProjectCard project={first} wide />
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={p.slug} from={i % 2 === 0 ? "left" : "right"}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="testimonials">
          <h2 className="section-heading">{testimonials.heading}</h2>
          <div className="testimonial-list">
            {testimonials.items.map((t) => (
              <figure key={t.name} className="testimonial">
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  {t.role && <span>{t.role}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <Connect />
      </main>
    </>
  );
}
