type SectionProps = { eyebrow?: string; title: string; description?: string; children: React.ReactNode; className?: string };
export function Section({ eyebrow, title, description, children, className = "" }: SectionProps) {
  return <section className={"py-20 sm:py-24 " + className}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-3xl">{eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{eyebrow}</p> : null}<h2 className="text-3xl font-semibold text-stone-950 sm:text-4xl">{title}</h2>{description ? <p className="mt-5 text-lg leading-8 text-stone-600">{description}</p> : null}</div><div className="mt-10">{children}</div></div></section>;
}
