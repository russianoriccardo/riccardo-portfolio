"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          {site.name}
        </Link>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className={open ? "nav nav-open" : "nav"}>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
