import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    label: "Products",
    children: [
      { label: "Pergolas", href: "/pergolas" },
      { label: "Pavilion", href: "/catalog#pavilion" },
      { label: "Carport", href: "/catalog#carport" },
      { label: "Sunroom", href: "/catalog#sunroom" },
      { label: "Commercial Systems", href: "/catalog#commercial" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Residential", href: "/catalog" },
      { label: "Restaurant", href: "/catalog" },
      { label: "Hotel & Resort", href: "/catalog" },
      { label: "Rooftop", href: "/catalog" },
      { label: "Pool Area", href: "/catalog" },
      { label: "Outdoor Dining", href: "/catalog" },
    ],
  },
  { label: "Options", href: "/options" },
  { label: "Projects", href: "/gallery" },
  { label: "How It Works", href: "/how-to-order" },
  { label: "About", href: "/delivery" },
  { label: "Contacts", href: "/contacts" },
];
