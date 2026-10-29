"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FALLBACK =
  "https://images.pexels.com/photos/29566905/pexels-photo-29566905.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const pics = images.length > 0 ? images : [FALLBACK];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + pics.length) % pics.length);
  const next = () => setIndex((i) => (i + 1) % pics.length);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-[var(--line)] bg-[#e7eae1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pics[index]}
          alt={`${alt} — foto ${index + 1}`}
          className="aspect-[3/2] w-full object-cover"
        />
        {pics.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-nav left-3"
              onClick={prev}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="gallery-nav right-3"
              onClick={next}
              aria-label="Próxima foto"
            >
              <ChevronRight size={20} />
            </button>
            <span className="absolute bottom-3 right-3 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
              {index + 1} / {pics.length}
            </span>
          </>
        )}
        <span className="absolute bottom-3 left-3 text-[9.5px] font-medium text-white/80">
          fotos ilustrativas
        </span>
      </div>

      {pics.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2.5 sm:grid-cols-5">
          {pics.map((pic, i) => (
            <button
              key={`${pic}-${i}`}
              type="button"
              className={`gallery-thumb ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pic}
                alt=""
                className="aspect-[3/2] w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
