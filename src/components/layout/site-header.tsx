"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import type { CompanySettings } from "@/types/content";

const navItems = [
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog-kamnya", label: "Каталог камня" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/services", label: "Услуги" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" }
];

export function SiteHeader({ settings }: { settings: CompanySettings }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__inner">
          <Link className="site-brand" href="/">
            <strong>{settings.companyName}</strong>
            <span className="muted">{settings.phone}</span>
          </Link>

          <nav className="site-nav" aria-label="Основная навигация">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="button" href="/calculator">
              {settings.primaryCta}
            </Link>
          </nav>

          <button
            className="button-secondary mobile-nav-toggle"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
            aria-label="Открыть меню"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isOpen ? (
          <div className="mobile-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="button" href="/calculator" onClick={() => setIsOpen(false)}>
              {settings.primaryCta}
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
