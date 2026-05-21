import Link from "next/link";
export function CTA({ title = "Рассчитать перголу UOGEL", text = "Подберем подходящую перголу из доступных размеров и подготовим расчет по модели, комплектации и городу поставки." }) {
  return <div className="overflow-hidden rounded-3xl bg-stone-950 px-6 py-10 text-white shadow-2xl shadow-stone-300 sm:px-10 lg:flex lg:items-center lg:justify-between"><div className="max-w-2xl"><h2 className="text-3xl font-semibold">{title}</h2><p className="mt-4 text-stone-300">{text}</p></div><Link href="/calculate" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200 lg:mt-0">Получить расчет</Link></div>;
}
