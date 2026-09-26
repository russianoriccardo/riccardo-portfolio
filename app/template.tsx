// A template re-mounts on every navigation, so each page plays the fade-in from globals.css.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}
