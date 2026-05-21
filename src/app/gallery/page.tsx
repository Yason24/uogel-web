import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "Галерея пергол UOGEL", description: "Фото пергол UOGEL: частные дома, террасы, рестораны, детали конструкции и подсветка." };
const items = [
  ["Частные дома", "https://www.uogele.com/uploads/44532/aluminium-pergola-3x41905b.jpg"],
  ["Террасы", "https://www.uogele.com/uploads/44532/aluminium-wall-mounted-gazebo08b40.jpg"],
  ["Рестораны", "https://www.uogele.com/uploads/44532/aluminium-gazebo-with-louvered-roofaff93.jpg"],
  ["Детали конструкции", "https://www.uogele.com/uploads/44532/products/p20250917191535cad6c.jpg"],
  ["Подсветка", "https://www.uogele.com/uploads/44532/products/p20250918185541e5674.jpg"],
];
export default function GalleryPage() {
  return <Section eyebrow="Галерея" title="Материалы UOGEL" description="Первичная галерея собрана по изображениям из продуктового каталога."><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map(([title, image]) => <figure key={title} className="overflow-hidden rounded-3xl bg-white shadow-sm"><img src={image} alt={title} className="h-80 w-full object-cover" /><figcaption className="p-5 text-lg font-semibold text-stone-950">{title}</figcaption></figure>)}</div></Section>;
}
