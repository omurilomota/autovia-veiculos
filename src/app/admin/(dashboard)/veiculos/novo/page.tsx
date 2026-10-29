import { VehicleForm } from "@/components/admin/vehicle-form";
import Link from "next/link";

export default function NewVehiclePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <div>
          <Link href="/admin" className="text-xs font-bold text-zinc-400 hover:text-zinc-600">
            ← Voltar para lista de carros
          </Link>
          <h1 className="mt-1 text-xl font-black text-zinc-900">Cadastrar Novo Veículo</h1>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <VehicleForm />
      </div>
    </div>
  );
}
