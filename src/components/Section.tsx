type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, description, children, className = "" }: SectionProps) {
  return (
    <section className={"py-20 sm:py-28 " + className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-light text-stone-950 sm:text-4xl">{title}</h2>
          {description && (
            <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">{description}</p>
          )}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
