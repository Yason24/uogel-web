import Image from "next/image";
import type { ProfileColor } from "@/types";

interface Props {
  colors: ProfileColor[];
}

export function ColorSwatches({ colors }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {colors.map((color) => (
        <div
          key={color.id}
          className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4"
        >
          <Swatch color={color} />
          <div className="min-w-0">
            <p className="text-sm font-medium leading-tight text-stone-950">{color.name}</p>
            <p className="mt-0.5 text-xs text-stone-400">{color.ral}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Swatch({ color }: { color: ProfileColor }) {
  if (color.swatch) {
    return (
      <Image
        src={color.swatch}
        alt={color.ral}
        width={48}
        height={32}
        className="h-8 w-12 shrink-0 rounded object-cover"
      />
    );
  }
  if (color.id === "custom") {
    return (
      <div className="h-8 w-12 shrink-0 rounded border border-dashed border-stone-300 bg-gradient-to-br from-stone-100 to-stone-300" />
    );
  }
  if (color.id === "white") {
    return (
      <div className="h-8 w-12 shrink-0 rounded border border-stone-200 bg-white" />
    );
  }
  return (
    <div className="h-8 w-12 shrink-0 rounded border border-stone-200 bg-stone-100" />
  );
}
