import Link from "next/link";
import { desc } from "drizzle-orm";
import { CarFront, KeyRound, Plus, Tag } from "lucide-react";
import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { formatCurrency, formatKm, vehicleTitle } from "@/lib/utils";
import { deleteVehicle, updateVehicleStatus } from "@/lib/actions/admin";
import { StatusSelect, DeleteButton } from "@/components/admin/controls";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const allVehicles = await db
    .select()
    .from(vehicles)
    .orderBy(desc(vehicles.createdAt));

  const count = (s: string) => allVehicles.filter((v) => v.status === s).length;

  const stats = [
    { icon: CarFront, label: "À venda", value: count("disponivel"), color: "var(--green-600)" },
    { icon: Tag, label: "Reservados", value: count("reservado"), color: "#b07d1e" },
    { icon: KeyRound, label: "Vendidos", value: count("vendido"), color: "var(--muted)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-[1.5px] border-[var(--line)] pb-5">
        <div>
          <p className="sec-tag">
            <span className="sec-num">AV</span> Painel da loja
          </p>
          <h1 className="font-display mt-2 text-[32px] font-extrabold uppercase leading-none tracking-tight text-[var(--ink)]">
            Estoque de veículos
          </h1>
          <p className="mt-1.5 text-[13px] text-[var(--muted)]">
            O que você muda aqui aparece no site na hora.
          </p>
        </div>
        <Link href="/admin/veiculos/novo" className="btn btn-dark btn-sm">
          <Plus size={16} />
          Adicionar carro
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border-[1.5px] border-[var(--line)] bg-white p-4"
          >
            <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--faint)]">
              <s.icon size={13} style={{ color: s.color }} />
              {s.label}
            </p>
            <p className="font-display mt-1 text-[34px] font-extrabold leading-none" style={{ color: s.color }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border-[1.5px] border-[var(--line)] bg-white">
        <div className="border-b border-[var(--line)] bg-[var(--paper)] px-4 py-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
            Carros cadastrados ({allVehicles.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]">
            <thead className="border-b border-[var(--line)] text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--faint)]">
              <tr>
                <th className="px-4 py-3">Veículo</th>
                <th className="px-4 py-3">Ano</th>
                <th className="px-4 py-3">KM</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Status no site</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]/60">
              {allVehicles.map((car) => (
                <tr key={car.id} className="transition-colors hover:bg-[var(--paper)]/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {car.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={car.coverImage}
                          alt=""
                          className="h-10 w-14 rounded-md border border-[var(--line)] object-cover"
                        />
                      ) : (
                        <span className="grid h-10 w-14 place-items-center rounded-md bg-[var(--paper)] text-[var(--faint)]">
                          <CarFront size={16} />
                        </span>
                      )}
                      <div>
                        <span className="block font-bold text-[var(--ink)]">
                          {vehicleTitle(car)}
                        </span>
                        <span className="text-[10.5px] text-[var(--faint)]">
                          {car.color || "cor não informada"}
                          {car.featured && " · ★ destaque"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[var(--muted)]">
                    {car.yearManufacture}/{car.yearModel}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[var(--muted)]">
                    {formatKm(car.km)}
                  </td>
                  <td className="font-display px-4 py-3 text-[16px] font-bold text-[var(--pine-900)]">
                    {formatCurrency(car.price)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect id={car.id} status={car.status} action={updateVehicleStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/veiculos/${car.id}`}
                        className="rounded-lg border-[1.5px] border-[var(--line)] px-2.5 py-1.5 text-[11.5px] font-bold text-[var(--ink)] transition-colors hover:border-[var(--pine-700)] hover:text-[var(--pine-800)]"
                      >
                        Editar
                      </Link>
                      <DeleteButton id={car.id} name={vehicleTitle(car)} action={deleteVehicle} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
