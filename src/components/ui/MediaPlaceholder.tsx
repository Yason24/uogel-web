interface MediaPlaceholderProps {
  label?: string;
  className?: string;
}

export function MediaPlaceholder({
  label = "Фото конфигурации будет добавлено",
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`flex min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50/60 ${className}`}
    >
      <p className="px-4 text-center text-sm leading-6 text-stone-400">{label}</p>
    </div>
  );
}
