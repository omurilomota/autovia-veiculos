import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq, ne, sql } from "drizzle-orm";
import {
  Calendar,
  ChevronRight,
  DoorOpen,
  Fuel,
  Gauge,
  MessageCircle,
  Palette,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { db } from "@/db";
import { vehicleImages, vehicles } from "@/db/schema";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter, WhatsAppFloat } from "@/components/site/footer";
import { Gallery } from "@/components/site/gallery";
import { Simulator } from "@/components/site/simulator";
import { CarCard } from "@/components/site/car-card";
import { Reveal } from "@/components/site/reveal";
import { QuickLeadModal } from "@/components/quick-lead-modal";
import { estimateMonthlyPayment } from "@/lib/pricing";
import {
  formatCurrency,
  formatKm,
  fuelLabels,
  transmissionLabels,
  whatsappLink,
} from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [car] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.slug, slug))
    .limit(1);
  if (!car) notFound();

  const [images, others] = await Promise.all([
    db
      .select()
      .from(vehicleImages)
      .where(eq(vehicleImages.vehicleId, car.id))
      .orderBy(asc(vehicleImages.position)),
    db
      .select()
      .from(vehicles)
      .where(ne(vehicles.id, car.id))
      .orderBy(ne(vehicles.status, "disponivel"))
      .limit(12),
  ]);

  // registra a visualização (não bloqueia a resposta em caso de falha)
  db.update(vehicles)
    .set({ views: sql`${vehicles.views} + 1` })
    .where(eq(vehicles.id, car.id))
    .catch(() => undefined);

  const similar = [
    ...others.filter((o) => o.brand === car.brand && o.status !== "vendido"),
    ...others.filter((o) => o.brand !== car.brand && o.status !== "vendido"),
  ].slice(0, 3);

  const pics = images.length > 0 ? images.map((i) => i.url) : [car.coverImage || ""];
  const price = Number(car.price);
  const title = `${car.brand} ${car.model}`;
  const fullTitle = `${title} ${car.version ?? ""} ${car.yearManufacture}/${car.yearModel}`;
  const parcela = estimateMonthlyPayment({
    vehiclePrice: price,
    downPayment: price * 0.2,
    installments: 48,
  });
  const accessories = (car.accessories ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  const specs = [
    { icon: Calendar, label: "Ano", value: `${car.yearManufacture}/${car.yearModel}` },
    { icon: Gauge, label: "Quilometragem", value: formatKm(car.km) },
    { icon: Settings2, label: "Câmbio", value: transmissionLabels[car.transmission] },
    { icon: Fuel, label: "Combustível", value: fuelLabels[car.fuel] },
    { icon: Palette, label: "Cor", value: car.color || "—" },
    { icon: DoorOpen, label: "Portas", value: `${car.doors ?? 4}` },
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
        {/* breadcrumb */}
        <nav
          className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-semibold text-[var(--faint)]"
          aria-label="Você está em"
        >
          <Link href="/" className="transition-colors hover:text-[var(--pine-800)]">
            Início
          </Link>
          <ChevronRight size={13} />
          <Link href="/#estoque" className="transition-colors hover:text-[var(--pine-800)]">
            Estoque
          </Link>
          <ChevronRight size={13} />
          <span className="text-[var(--pine-800)]">{title}</span>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          {/* coluna esquerda */}
          <div>
            <Reveal>
              <Gallery images={pics} alt={fullTitle} />
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-6 rounded-2xl border-[1.5px] border-[var(--line)] bg-white p-6">
                <h2 className="font-display text-[20px] font-bold uppercase tracking-tight text-[var(--ink)]">
                  Sobre este carro
                </h2>
                <p className="mt-2.5 whitespace-pre-line text-[14.5px] leading-relaxed text-[var(--muted)]">
                  {car.description ||
                    "Seminovo revisado, higienizado e com procedência conferida pela equipe Auto Via. Documentação em dia, pronto para transferência."}
                </p>

                {accessories.length > 0 && (
                  <>
                    <h3 className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--faint)]">
                      Itens e opcionais
                    </h3>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {accessories.map((a) => (
                        <span key={a} className="spec-pill">
                          <ShieldCheck size={12} />
                          {a}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Reveal>
          </div>

          {/* coluna direita — fixa no scroll */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={60}>
              <div className="rounded-2xl border-[1.5px] border-[var(--line)] bg-white p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--faint)]">
                      {car.brand} · {car.yearManufacture}/{car.yearModel}
                    </p>
                    <h1 className="font-display mt-1 text-[27px] font-extrabold uppercase leading-[0.95] tracking-tight text-[var(--ink)] sm:text-[34px]">
                      {car.model}
                    </h1>
                    <p className="mt-1 text-[14px] font-medium text-[var(--muted)]">
                      {car.version}
                    </p>
                  </div>
                  {car.status === "reservado" ? (
                    <span className="car-badge car-badge-amber static">Reservado</span>
                  ) : (
                    <span className="car-badge car-badge-lime static">Disponível</span>
                  )}
                </div>

                <div className="mt-5 flex items-end justify-between gap-3 rounded-xl bg-[var(--paper)] px-4 py-3.5">
                  <div>
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[var(--faint)]">
                      Preço à vista
                    </p>
                    <p className="font-display text-[31px] font-extrabold leading-none text-[var(--pine-900)] sm:text-[40px]">
                      {formatCurrency(price)}
                    </p>
                  </div>
                  <p className="pb-1 text-right text-[12px] font-semibold leading-tight text-[var(--muted)]">
                    ou 48x de
                    <br />
                    <span className="text-[14.5px] font-bold text-[var(--pine-800)]">
                      {formatCurrency(parcela)}*
                    </span>
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {specs.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5"
                    >
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--faint)]">
                        <s.icon size={12} className="text-[var(--green-600)]" />
                        {s.label}
                      </p>
                      <p className="mt-0.5 text-[13.5px] font-bold text-[var(--ink)]">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappLink(
                    `Olá! Vi o ${fullTitle} por ${formatCurrency(price)} no site e quero negociar.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whats mt-5 w-full"
                >
                  <MessageCircle size={18} />
                  Negociar este carro
                </a>

                <div className="mt-2.5">
                  <QuickLeadModal
                    type="troca"
                    label="Dar meu usado na troca"
                    vehicleName={fullTitle}
                    className="btn btn-line w-full"
                  />
                </div>

                <p className="mt-4 flex items-start gap-2 text-[11.5px] leading-relaxed text-[var(--faint)]">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[var(--green-600)]" />
                  Procedência conferida e documentação em dia. Venha ver no pátio:
                  Rua das Acácias, 100 — Junqueirópolis/SP.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-5">
                <Simulator price={price} vehicleName={fullTitle} />
              </div>
            </Reveal>
          </div>
        </div>

        {/* relacionados */}
        {similar.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <h2 className="sec-title" style={{ marginTop: 0 }}>
                  Mais no <span className="accent">pátio.</span>
                </h2>
                <Link href="/#estoque" className="card-arrow-link pb-1">
                  Ver estoque completo <ChevronRight size={15} />
                </Link>
              </div>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((c, i) => (
                <Reveal key={c.id} delay={i * 80}>
                  <CarCard car={c} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
