import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <p className="eyebrow">Contact</p>
        <h2 className="footer-heading">Let&apos;s work together.</h2>
        <a className="footer-email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <ul className="socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
