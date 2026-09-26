import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";

export default function NotFound() {
  return (
    <main className="container project">
      <Link href="/" className="button back-button">
        <ArrowLeft />
        Go back to the Home
      </Link>
      <h1 className="project-title">Page not found</h1>
    </main>
  );
}
