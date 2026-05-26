import Image from "next/image";

type Props = {
  src: string;
  caption: string;
};

export function TechnicalDiagramCard({ src, caption }: Props) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-50">
        <Image
          src={src}
          alt={caption}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain object-top"
        />
      </div>
      <figcaption className="border-t border-stone-100 px-4 py-3">
        <p className="text-xs leading-5 text-stone-500">{caption}</p>
      </figcaption>
    </figure>
  );
}
