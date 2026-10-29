import { VehicleForm } from "@/components/admin/vehicle-form";
import { db } from "@/db";
import { vehicleImages, vehicles } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, Number(id))).limit(1);
  if (!vehicle) notFound();

  const images = await db
    .select()
    .from(vehicleImages)
    .where(eq(vehicleImages.vehicleId, vehicle.id))
    .orderBy(asc(vehicleImages.position));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <div>
          <Link href="/admin" className="text-xs font-bold text-zinc-400 hover:text-zinc-600">
            ← Voltar para lista de carros
          </Link>
          <h1 className="mt-1 text-xl font-black text-zinc-900">
            Editar: {vehicle.brand} {vehicle.model}
          </h1>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <VehicleForm
          vehicle={{
            ...vehicle,
            images: images.map((i) => i.url),
          }}
        />
      </div>
    </div>
  );
}
