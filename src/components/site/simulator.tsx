"use client";

import { useMemo, useState } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import { estimateMonthlyPayment } from "@/lib/pricing";
import { formatCurrency, whatsappLink } from "@/lib/utils";

const TERMS = [24, 36, 48, 60];

export function Simulator({
  price,
  vehicleName,
}: {
  price: number;
  vehicleName: string;
}) {
  const [pct, setPct] = useState(20);
  const [term, setTerm] = useState(48);

  const down = Math.round((price * pct) / 100);
  const parcela = useMemo(
    () =>
      estimateMonthlyPayment({
        vehiclePrice: price,
        downPayment: down,
        installments: term,
      }),
    [price, down, term],
  );

  const msg = `Olá! Simulei no site o ${vehicleName}: entrada de ${formatCurrency(down)} (${pct}%) + ${term}x de ${formatCurrency(parcela)}. Quero enviar uma proposta de financiamento.`;

  return (
    <div className="rounded-2xl border-[1.5px] border-[var(--pine-800)]/20 bg-white p-5">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--pine-700)]">
        <Calculator size={15} />
        Simule a parcela
      </p>

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[12.5px] font-semibold text-[var(--muted)]">
            Entrada · {pct}%
          </span>
          <span className="font-display text-[19px] font-bold text-[var(--pine-900)]">
            {formatCurrency(down)}
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={70}
          step={5}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          className="range mt-2.5"
          style={{ "--fill": `${((pct - 10) / 60) * 100}%` } as React.CSSProperties}
          aria-label="Percentual de entrada"
        />
        <div className="mt-1 flex justify-between text-[10.5px] font-semibold text-[var(--faint)]">
          <span>10%</span>
          <span>70%</span>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-[12.5px] font-semibold text-[var(--muted)]">Prazo</span>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {TERMS.map((t) => (
            <button
              key={t}
              type="button"
              className={`term-chip ${term === t ? "is-active" : ""}`}
              onClick={() => setTerm(t)}
              aria-pressed={term === t}
            >
              {t}x
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between rounded-xl bg-[var(--pine-900)] px-4 py-3.5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
            Parcela estimada
          </p>
          <p className="font-display text-[32px] font-extrabold leading-none text-[var(--lime)]">
            {term}x {formatCurrency(parcela)}
          </p>
        </div>
        <p className="pb-0.5 text-right text-[10px] leading-tight text-white/45">
          taxa ref.
          <br />
          1,89% a.m.
        </p>
      </div>

      <a
        href={whatsappLink(msg)}
        target="_blank"
        rel="noreferrer"
        className="btn btn-whats mt-4 w-full"
      >
        <MessageCircle size={17} />
        Enviar proposta no WhatsApp
      </a>
      <p className="mt-2.5 text-center text-[10.5px] leading-relaxed text-[var(--faint)]">
        Estimativa sem compromisso. Valor final depende da análise do banco.
      </p>
    </div>
  );
}
