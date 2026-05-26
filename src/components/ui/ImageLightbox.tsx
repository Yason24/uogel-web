"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  containerClassName?: string;
  thumbnailSizes?: string;
}

export function ImageLightbox({
  src,
  alt,
  caption,
  containerClassName = "",
  thumbnailSizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      {/* Thumbnail — acts as the click trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block cursor-zoom-in overflow-hidden ${containerClassName}`}
        aria-label={`Увеличить: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={thumbnailSizes}
          className="object-contain object-top"
        />
        <span
          className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-stone-950/70 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden="true"
        >
          Увеличить
        </span>
      </button>

      {/* Lightbox overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={caption ?? alt}
          className="fixed inset-0 z-50 flex flex-col"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-sm" aria-hidden="true" />

          {/* Top bar — close button always accessible, never overlaps image */}
          <div
            className="relative z-10 flex shrink-0 items-center justify-end px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-stone-200 shadow-lg transition-colors hover:bg-stone-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
              aria-label="Закрыть"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 2L12 12M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Image area — fills remaining space, scrollable on mobile */}
          <div
            className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-auto px-4 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              {/* Regular <img> for native pinch-zoom on mobile */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="block max-h-[80dvh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
                style={{ touchAction: "pinch-zoom" }}
              />
              {caption && (
                <p className="mt-3 max-w-[85vw] text-center text-sm text-stone-400">{caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
