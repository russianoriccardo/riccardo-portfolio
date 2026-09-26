import { site } from "@/content/site";

export default function Connect() {
  return (
    <section className="connect">
      <h2>{site.connect.heading}</h2>
      <p>{site.connect.text}</p>
      <div className="connect-links">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer">
          <img src="/images/icon-instagram.svg" alt="" width={26} height={26} />
          Follow me on Instagram
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
          <img src="/images/icon-linkedin.svg" alt="" width={26} height={26} />
          Connect with me on LinkedIn
        </a>
      </div>
    </section>
  );
}
