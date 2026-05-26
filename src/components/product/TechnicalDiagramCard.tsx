import { ImageLightbox } from "@/components/ui/ImageLightbox";

type Props = {
  src: string;
  caption: string;
};

export function TechnicalDiagramCard({ src, caption }: Props) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <ImageLightbox
        src={src}
        alt={caption}
        caption={caption}
        containerClassName="aspect-[3/4] w-full bg-stone-50"
        thumbnailSizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <figcaption className="border-t border-stone-100 px-4 py-3">
        <p className="text-xs leading-5 text-stone-500">{caption}</p>
      </figcaption>
    </figure>
  );
}
