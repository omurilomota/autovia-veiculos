import {
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Banknote,
  KeyRound,
  CarFront,
} from "lucide-react";

function Instagram({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { QuickLeadModal } from "@/components/quick-lead-modal";
import { Reveal } from "./reveal";
import { Plate } from "./brand";
import { whatsappLink } from "@/lib/utils";

export function FinanceTradeBands() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-5 lg:grid-cols-12">
        {/* financiamento */}
        <Reveal className="lg:col-span-7">
          <div id="financiamento" className="band-dark h-full p-6 sm:p-10">
            <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div className="max-w-sm">
                <span className="sec-tag" style={{ color: "var(--lime)" }}>
                  <span className="sec-num">02</span> Financiamento
                </span>
                <h2 className="h-display mt-4 text-[clamp(2rem,4vw,3rem)] text-white">
                  Parcela que cabe
                  <br />
                  no seu mês.
                </h2>
                <p className="mt-3.5 text-[14px] leading-relaxed text-white/70">
                  Santander e demais bancos parceiros. Você manda a proposta pelo
                  WhatsApp e a gente volta com as condições — sem compromisso.
                </p>
                <div className="mt-6">
                  <QuickLeadModal
                    type="simulacao"
                    label="Simular agora"
                    className="btn btn-lime"
                  />
                </div>
                <p className="mt-3 text-[11px] text-white/45">
                  Sujeito à análise de crédito. Entrada facilitada.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/50">
                  em até
                </p>
                <p className="band-outline-num">60x</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* troca */}
        <Reveal delay={100} className="lg:col-span-5">
          <div id="troca" className="band-lime h-full p-6 sm:p-10">
            <span className="sec-tag">
              <span className="sec-num" style={{ background: "var(--pine-900)", color: "var(--lime)" }}>
                03
              </span>
              Seu usado
            </span>
            <h2 className="h-display mt-4 text-[clamp(2rem,4vw,3rem)] text-[var(--pine-950)]">
              Seu usado
              <br />
              vale entrada.
            </h2>
            <p className="mt-3.5 text-[14px] leading-relaxed text-[var(--pine-800)]/80">
              Avaliamos carro ou moto na hora, com preço justo e sem enrolação. O
              valor entra abatido direto no negócio.
            </p>
            <div className="mt-6">
              <QuickLeadModal
                type="troca"
                label="Avaliar meu carro"
                className="btn btn-dark"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: Search, num: "01", title: "Escolha no site", text: "Filtre, salve favoritos e compare com calma." },
  { icon: Banknote, num: "02", title: "Simule a parcela", text: "Manda no WhatsApp e recebe as condições." },
  { icon: CarFront, num: "03", title: "Visite o pátio", text: "Veja de perto, entre, dê a partida. Sem pressa." },
  { icon: KeyRound, num: "04", title: "Saia de carro novo", text: "Documentação resolvida e chave na mão." },
];

export function StepsStrip() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <Reveal>
        <div className="grid gap-x-8 gap-y-6 rounded-2xl border-[1.5px] border-[var(--line)] bg-white px-5 py-6 sm:grid-cols-2 sm:px-7 sm:py-7 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.num} className="flex gap-4">
              <span className="step-num">{s.num}</span>
              <div>
                <p className="flex items-center gap-2 text-[14.5px] font-bold text-[var(--ink)]">
                  <s.icon size={16} className="text-[var(--green-600)]" />
                  {s.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function StoreSection() {
  return (
    <section id="loja" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[0.94fr_1.06fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-[var(--line)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/29566905/pexels-photo-29566905.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
              alt="Pátio de veículos"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,50,39,0.08) 40%, rgba(7,31,24,0.72) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 flex items-end gap-3">
              <Plate text="AV·2006" />
              <p className="pb-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/85">
                Pátio próprio
                <br />
                Rua das Acácias, 100
              </p>
            </div>
            <span className="absolute right-3 top-3 text-[9px] font-medium text-white/70">
              foto ilustrativa
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <span className="sec-tag">
            <span className="sec-num">04</span> A loja
          </span>
          <h2 className="sec-title">
            19 anos de estrada
            <br />
            <span className="accent">em Junqueirópolis.</span>
          </h2>
          <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[var(--muted)]">
            Loja de bairro, negócio de gente grande: aqui você fala com o dono,
            vê o carro no pátio e sai com a documentação resolvida. Quem compra,
            volta — e traz a família.
          </p>

          <div className="mt-6">
            <div className="info-row">
              <span className="info-icon">
                <MapPin size={17} />
              </span>
              <div>
                <p className="text-[14px] font-bold text-[var(--ink)]">
                  Rua das Acácias, 100 — Centro
                </p>
                <p className="text-[12.5px] text-[var(--muted)]">
                  Junqueirópolis/SP · CEP 00000-000
                </p>
              </div>
            </div>
            <div className="info-row">
              <span className="info-icon">
                <Clock size={17} />
              </span>
              <div>
                <p className="text-[14px] font-bold text-[var(--ink)]">
                  Seg a Sex · 8h às 18h
                </p>
                <p className="text-[12.5px] text-[var(--muted)]">
                  Sábado · 8h às 12h30
                </p>
              </div>
            </div>
            <div className="info-row">
              <span className="info-icon">
                <Phone size={17} />
              </span>
              <div>
                <p className="text-[14px] font-bold text-[var(--ink)]">(18) 99999-0101</p>
                <p className="text-[12.5px] text-[var(--muted)]">
                  WhatsApp e ligação · resposta rápida
                </p>
              </div>
            </div>
            <div className="info-row">
              <span className="info-icon">
                <Instagram size={17} />
              </span>
              <div>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[14px] font-bold text-[var(--ink)] transition-colors hover:text-[var(--green-600)]"
                >
                  @demonstracao <ArrowUpRight size={14} />
                </a>
                <p className="text-[12.5px] text-[var(--muted)]">
                  Novidades do pátio em primeira mão
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://maps.google.com/?q=Rua+das+Acacias,+100,+Junqueir%C3%B3polis+-+SP"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              <MapPin size={16} />
              Traçar rota
            </a>
            <a
              href={whatsappLink("Olá! Quero marcar uma visita ao pátio da Auto Via.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line"
            >
              <MessageCircle size={16} />
              Marcar visita
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
