"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Fuel,
  Gauge,
  Heart,
  MessageCircle,
  Settings2,
  Star,
} from "lucide-react";
import type { vehicles } from "@/db/schema";
import { useFavorites } from "@/lib/use-favorites";
import { estimateMonthlyPayment } from "@/lib/pricing";
import {
  formatCurrency,
  formatKm,
  fuelLabels,
  transmissionLabels,
  whatsappLink,
} from "@/lib/utils";

export type Car = typeof vehicles.$inferSelect;

export function CarCard({ car }: { car: Car }) {
  const { has, toggle } = useFavorites();
  const fav = has(car.id);
  const price = Number(car.price);
  const parcela = estimateMonthlyPayment({
    vehiclePrice: price,
    downPayment: price * 0.2,
    installments: 48,
  });
  const title = `${car.brand} ${car.model}`;
  const waMsg = `Olá! Vi o ${title} ${car.version ?? ""} ${car.yearManufacture}/${car.yearModel} por ${formatCurrency(price)} no site e quero negociar.`;

  return (
    <article className="car-card">
      <div className="car-card-media">
        <Link href={`/veiculos/${car.slug}`} aria-label={`Ver ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={car.coverImage || "https://images.pexels.com/photos/29566905/pexels-photo-29566905.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200"}
            alt={`${title} ${car.version ?? ""}`}
            loading="lazy"
          />
        </Link>

        {car.status === "reservado" ? (
          <span className="car-badge car-badge-amber">Reservado</span>
        ) : car.featured ? (
          <span className="car-badge car-badge-lime">
            <Star size={11} className="fill-current" />
            Destaque
          </span>
        ) : null}

        <button
          type="button"
          className={`fav-btn ${fav ? "is-fav" : ""}`}
          onClick={() => toggle(car.id)}
          aria-label={fav ? `Remover ${title} dos favoritos` : `Salvar ${title} nos favoritos`}
          aria-pressed={fav}
        >
          <Heart size={17} className={fav ? "fill-current" : ""} />
        </button>

        <span className="absolute bottom-2 right-2.5 z-[1] text-[9px] font-medium text-white/75">
          foto ilustrativa
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[var(--faint)]">
          {car.brand} · {car.yearManufacture}/{car.yearModel}
        </p>
        <h3 className="font-display mt-0.5 text-[22px] font-bold uppercase leading-none tracking-tight text-[var(--ink)]">
          <Link href={`/veiculos/${car.slug}`} className="transition-colors hover:text-[var(--green-600)]">
            {car.model}{" "}
            <span className="text-[15px] font-semibold normal-case tracking-normal text-[var(--muted)]">
              {car.version}
            </span>
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="spec-pill">
            <Gauge size={12} />
            {formatKm(car.km)}
          </span>
          <span className="spec-pill">
            <Settings2 size={12} />
            {transmissionLabels[car.transmission]}
          </span>
          <span className="spec-pill">
            <Fuel size={12} />
            {fuelLabels[car.fuel]}
          </span>
          <span className="spec-pill">
            <Calendar size={12} />
            {car.yearModel}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2 border-t border-dashed border-[var(--line)] pt-3.5">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--faint)]">
              À vista
            </p>
            <p className="price-big">{formatCurrency(price)}</p>
          </div>
          <p className="pb-0.5 text-right text-[11.5px] font-semibold leading-tight text-[var(--muted)]">
            ou 48x de
            <br />
            <span className="text-[13px] font-bold text-[var(--pine-800)]">
              {formatCurrency(parcela)}*
            </span>
          </p>
        </div>

        <div className="mt-3.5 grid grid-cols-[1fr_auto] items-center gap-2">
          <Link href={`/veiculos/${car.slug}`} className="card-arrow-link">
            Ver detalhes <ArrowRight size={15} />
          </Link>
          <a
            href={whatsappLink(waMsg)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whats btn-sm"
          >
            <MessageCircle size={15} />
            Negociar
          </a>
        </div>
      </div>
    </article>
  );
}
