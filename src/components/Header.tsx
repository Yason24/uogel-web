"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { navItems } from "@/data/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-stone-200/80 bg-white/97 shadow-sm shadow-stone-100/60 backdrop-blur-sm"
          : "border-b border-stone-100/60 bg-white/90 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.1em] text-stone-950 transition-colors duration-200 hover:text-arch"
        >
          UOGEL Russia
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm text-stone-500 lg:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href!}
              className="transition-colors duration-200 hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/calculate"
            className="rounded-full bg-stone-950 px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-arch"
          >
            Рассчитать
          </Link>
          <button
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-500 transition-colors duration-150 hover:bg-stone-100 hover:text-stone-950 lg:hidden"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="animate-slide-down border-t border-stone-100 bg-white lg:hidden"
          aria-label="Мобильное меню"
        >
          <div className="mx-auto flex flex-col gap-0.5 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href!}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-stone-700 transition-colors duration-150 hover:bg-stone-50 hover:text-stone-950"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/calculate"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-stone-950 px-5 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-arch"
            >
              Рассчитать
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
