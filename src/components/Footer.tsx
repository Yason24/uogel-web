import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-stone-600 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-lg font-semibold text-stone-950">UOGEL Russia</p>
          <p className="mt-3 max-w-md">
            Подбор и расчет биоклиматических пергол UOGEL с поставкой в Россию. Помогаем выбрать подходящую модель из доступных размеров.
          </p>
        </div>
        <div>
          <p className="font-semibold text-stone-950">Разделы</p>
          <div className="mt-3 grid gap-2">
            <Link href="/pergolas" className="hover:text-stone-950">Каталог</Link>
            <Link href="/options" className="hover:text-stone-950">Опции</Link>
            <Link href="/delivery" className="hover:text-stone-950">Доставка</Link>
            <Link href="/calculate" className="hover:text-stone-950">Расчет</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-stone-950">Контакты</p>
          <div className="mt-3 grid gap-2">
            <span>Telegram: @uogel_russia</span>
            <Link href="/contacts" className="hover:text-stone-950">Форма обратной связи</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
