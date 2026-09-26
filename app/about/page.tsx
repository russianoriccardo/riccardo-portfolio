import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <section className="container hero about">
      <div className="about-image">
        <Image src={site.about.image} alt={site.name} fill sizes="(max-width: 809px) 100vw, 40vw" priority />
      </div>
      <div>
        <p className="eyebrow">{site.about.heading}</p>
        {site.about.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "lead lead-strong" : "lead"}>
            {p}
          </p>
        ))}
        <h2 className="section-title">Skills</h2>
        <ul className="tags">
          {site.about.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
