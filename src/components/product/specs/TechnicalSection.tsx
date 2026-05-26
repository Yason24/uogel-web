import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  background?: "white" | "stone";
  id?: string;
}

export function TechnicalSection({
  eyebrow,
  title,
  description,
  children,
  background = "white",
  id,
}: Props) {
  return (
    <section id={id} className={`py-14 ${background === "stone" ? "bg-stone-50" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-medium text-stone-950">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-500">{description}</p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
