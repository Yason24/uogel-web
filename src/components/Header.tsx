import Link from "next/link";
const nav = [["Каталог", "/pergolas"], ["Опции", "/options"], ["Галерея", "/gallery"], ["Как заказать", "/how-to-order"], ["Доставка", "/delivery"], ["Контакты", "/contacts"]];
export function Header() {
  return <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"><Link href="/" className="text-lg font-semibold tracking-wide text-stone-950">UOGEL Russia</Link><nav className="hidden items-center gap-7 text-sm text-stone-700 lg:flex">{nav.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-stone-950">{label}</Link>)}</nav><Link href="/calculate" className="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800">Рассчитать</Link></div></header>;
}
