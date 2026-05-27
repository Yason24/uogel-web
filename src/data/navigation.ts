import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    label: "Продукция",
    children: [
      { label: "Перголы", href: "/pergolas" },
      { label: "Беседки", href: "/catalog#pavilion" },
      { label: "Навесы", href: "/catalog#carport" },
      { label: "Зимние сады", href: "/catalog#sunroom" },
      { label: "Коммерческие системы", href: "/catalog#commercial" },
    ],
  },
  {
    label: "Решения",
    children: [
      { label: "Частные объекты", href: "/catalog" },
      { label: "Рестораны", href: "/catalog" },
      { label: "Отели и курорты", href: "/catalog" },
      { label: "Кровля и крыши", href: "/catalog" },
      { label: "Зоны у бассейна", href: "/catalog" },
      { label: "Летние веранды", href: "/catalog" },
    ],
  },
  { label: "Опции", href: "/options" },
  { label: "Проекты", href: "/projects" },
  { label: "Как заказать", href: "/how-to-order" },
  { label: "Поставка", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];
