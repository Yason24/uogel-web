"use client";
import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import type { NavItem } from "@/types";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link href={item.href!} className="transition hover:text-stone-950">
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 transition hover:text-stone-950"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Прозрачная обёртка начинается с top-full (нет зазора с кнопкой).
          pt-2 создаёт визуальный отступ внутри DOM-потомка, поэтому
          mouseleave на враппере не срабатывает при движении в этой зоне. */}
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-52 pt-2">
          <div className="rounded-xl border border-stone-100 bg-white py-1.5 shadow-lg">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href!}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50 hover:text-stone-950"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        onClick={onClose}
        className="rounded-xl px-3 py-3 text-sm text-stone-700 transition hover:bg-stone-50 hover:text-stone-950"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-stone-700 transition hover:bg-stone-50 hover:text-stone-950"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="ml-4 flex flex-col gap-0.5 pb-1">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href!}
              onClick={onClose}
              className="rounded-lg px-3 py-2.5 text-sm text-stone-600 transition hover:bg-stone-50 hover:text-stone-950"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-wide text-stone-950">
          UOGEL Russia
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-stone-700 lg:flex">
          {navItems.map((item) => (
            <DesktopDropdown key={item.label} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/calculate"
            className="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Рассчитать
          </Link>
          <button
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-700 transition hover:bg-stone-100 lg:hidden"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-stone-100 bg-white lg:hidden">
          <div className="mx-auto flex flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <MobileAccordion
                key={item.label}
                item={item}
                onClose={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
