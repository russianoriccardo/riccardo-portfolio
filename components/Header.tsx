"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo" onClick={close}>
          RICCARDO
          <br />
          RUSSIANO
        </Link>
        <button
          className={open ? "menu-button menu-button-open" : "menu-button"}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav id="site-nav" className={open ? "nav nav-open" : "nav"}>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label}
            </Link>
          ))}
          <a href={`mailto:${site.email}`} className="button nav-button" onClick={close}>
            Let&apos;s connect
          </a>
        </nav>
      </div>
    </header>
  );
}
