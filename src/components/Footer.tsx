import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-stone-500 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-base font-medium text-stone-950">UOGEL Russia</p>
          <p className="mt-3 max-w-md leading-7">
            Подбор и расчёт биоклиматических пергол UOGEL с поставкой в Россию. Помогаем выбрать подходящую модель из доступных размеров.
          </p>
        </div>
        <div className="border-t border-stone-100 pt-6 md:border-t-0 md:pt-0">
          <p className="font-medium text-stone-800">Разделы</p>
          <div className="mt-3 grid gap-2">
            <Link href="/catalog" className="transition-colors duration-150 hover:text-arch">Каталог</Link>
            <Link href="/pergolas" className="transition-colors duration-150 hover:text-arch">Перголы</Link>
            <Link href="/options" className="transition-colors duration-150 hover:text-arch">Опции</Link>
            <Link href="/delivery" className="transition-colors duration-150 hover:text-arch">Доставка</Link>
            <Link href="/calculate" className="transition-colors duration-150 hover:text-arch">Расчёт</Link>
          </div>
        </div>
        <div className="border-t border-stone-100 pt-6 md:border-t-0 md:pt-0">
          <p className="font-medium text-stone-800">Контакты</p>
          <div className="mt-3 grid gap-2">
            <span>Telegram: @uogel_russia</span>
            <Link href="/contacts" className="transition-colors duration-150 hover:text-arch">Форма обратной связи</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
