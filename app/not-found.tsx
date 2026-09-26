import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container hero">
      <h1>Page not found</h1>
      <p className="lead">
        <Link href="/">Back to home</Link>
      </p>
    </section>
  );
}
