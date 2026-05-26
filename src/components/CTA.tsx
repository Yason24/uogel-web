import Link from "next/link";

export function CTA({
  title = "Подобрать систему UOGEL",
  text = "Подберём подходящую серию и конфигурацию из каталога, рассчитаем совместимые опции и стоимость поставки в Россию.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-stone-950 px-8 py-14 text-white shadow-2xl shadow-stone-200 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-light">{title}</h2>
        <p className="mt-4 text-base leading-8 text-stone-400">{text}</p>
      </div>
      <Link
        href="/calculate"
        className="mt-10 inline-flex shrink-0 rounded-full bg-white px-8 py-4 text-sm font-medium text-stone-950 transition hover:bg-stone-100 lg:mt-0"
      >
        Получить консультацию
      </Link>
    </div>
  );
}
