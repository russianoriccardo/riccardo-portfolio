import { site } from "@/content/site";
import { Copyright } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Copyright />
        <span>{site.name}</span>
      </div>
    </footer>
  );
}
