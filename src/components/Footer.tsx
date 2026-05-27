import Link from "next/link";

const systemsNav = [
  { label: "Каталог систем", href: "/catalog" },
  { label: "Серии пергол", href: "/pergolas" },
  { label: "Опции и аксессуары", href: "/options" },
  { label: "Проекты", href: "/projects" },
];

const infoNav = [
  { label: "Как проходит работа", href: "/how-to-order" },
  { label: "Условия поставки", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
  { label: "Политика конфиденциальности", href: "/privacy" },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand + description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-base font-semibold text-stone-950 tracking-wide transition-colors duration-200 hover:text-arch"
            >
              UOGEL Russia
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-7 text-stone-500">
              Подбор и расчёт биоклиматических пергол UOGEL с поставкой в Россию.
              Каталог 2026 — для частных и коммерческих outdoor-пространств.
            </p>
            <a
              href="https://t.me/uogel_russia"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition-colors duration-200 hover:text-arch"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              @uogel_russia
            </a>
          </div>

          {/* Spacer on large screens to push nav right */}
          <div className="hidden lg:block" />

          {/* Systems nav */}
          <nav aria-label="Системы">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
              Системы
            </p>
            <ul className="mt-4 space-y-2.5">
              {systemsNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-stone-500 transition-colors duration-150 hover:text-stone-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info nav */}
          <nav aria-label="Информация">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
              Информация
            </p>
            <ul className="mt-4 space-y-2.5">
              {infoNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-stone-500 transition-colors duration-150 hover:text-stone-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── CTA row ── */}
        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-stone-100 bg-stone-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-600">
            Подобрать серию и получить расчёт комплектации
          </p>
          <Link
            href="/calculate"
            className="shrink-0 rounded-full bg-stone-950 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-arch"
          >
            Получить консультацию
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-stone-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-stone-400">
            © {currentYear} UOGEL Russia. Все права защищены.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-stone-400 transition-colors duration-150 hover:text-stone-600"
            >
              Конфиденциальность
            </Link>
            <Link
              href="/terms"
              className="text-xs text-stone-400 transition-colors duration-150 hover:text-stone-600"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
