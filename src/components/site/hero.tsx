import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Gauge,
  MessageCircle,
  Repeat,
  Settings2,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { Car } from "./car-card";
import { Plate } from "./brand";
import {
  formatCurrency,
  formatKm,
  transmissionLabels,
  whatsappLink,
} from "@/lib/utils";

export function Hero({ featured, total }: { featured?: Car; total: number }) {
  return (
    <section className="hero">
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-8 sm:gap-12 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:pb-20">
        {/* texto */}
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Plate />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 sm:text-[11px] sm:tracking-[0.24em]">
              Junqueirópolis · SP
              <br />
              desde 2006
            </span>
          </div>

          <h1 className="hero-title mt-5 sm:mt-7">
            Seu próximo
            <br />
            carro já está
            <br />
            <span className="accent">no pátio.</span>
          </h1>

          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/75">
            Seminovo bom é o que você conhece de perto. Procedência conferida,
            preço na etiqueta e negociação direto com quem entende — há mais de
            19 anos.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
            <span className="hero-fact">
              <ShieldCheck size={16} /> Procedência conferida
            </span>
            <span className="hero-fact">
              <Repeat size={16} /> Seu usado na troca
            </span>
            <span className="hero-fact">
              <Banknote size={16} /> Parcelas em até 60x
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#estoque" className="btn btn-lime">
              Ver estoque ({total})
              <ArrowRight size={17} />
            </a>
            <a
              href={whatsappLink("Olá! Vim pelo site da Auto Via e quero ajuda pra escolher um carro.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line-light"
            >
              <MessageCircle size={17} />
              Falar com vendedor
            </a>
          </div>

          <p className="mt-8 inline-flex items-center gap-2.5 text-[12.5px] font-semibold text-white/65">
            <span className="live-dot" />
            {total} veículos disponíveis agora · estoque atualizado pela equipe
          </p>
        </div>

        {/* carro em destaque */}
        {featured && (
          <div className="relative">
            <Link
              href={`/veiculos/${featured.slug}`}
              className="hero-car block"
              aria-label={`Destaque: ${featured.brand} ${featured.model}`}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.coverImage || ""}
                  alt={`${featured.brand} ${featured.model} ${featured.version ?? ""}`}
                  className="h-full w-full object-cover"
                />
                <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-md bg-black/45 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  <Star size={11} className="fill-[var(--lime)] text-[var(--lime)]" />
                  Destaque da semana
                </span>
                <span className="sticker bottom-4 left-4">
                  <small>À vista</small>
                  <strong>{formatCurrency(Number(featured.price))}</strong>
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-display truncate text-[24px] font-bold uppercase leading-none tracking-tight text-white">
                    {featured.brand} {featured.model}
                  </p>
                  <p className="mt-1 truncate text-[12.5px] font-medium text-white/60">
                    {featured.version} · {featured.yearManufacture}/{featured.yearModel}
                  </p>
                </div>
                <div className="hidden shrink-0 items-center gap-3 text-[12px] font-semibold text-white/75 sm:flex">
                  <span className="inline-flex items-center gap-1.5">
                    <Gauge size={14} className="text-[var(--lime)]" />
                    {formatKm(featured.km)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Settings2 size={14} className="text-[var(--lime)]" />
                    {transmissionLabels[featured.transmission]}
                  </span>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--lime)] text-[var(--pine-950)]">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

const BRANDS = [
  "Chevrolet",
  "Fiat",
  "Toyota",
  "Jeep",
  "Honda",
  "Renault",
  "Ford",
  "Volkswagen",
  "Hyundai",
  "Nissan",
];

export function BrandMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-11">
            {BRANDS.map((b) => (
              <span key={`${copy}-${b}`} className="marquee-item">
                {b}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
