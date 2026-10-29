"use client";

import { saveVehicle, type FormState } from "@/lib/actions/admin";
import { useActionState } from "react";
import { SubmitButton } from "@/components/submit-button";

const initialState: FormState = { ok: false, message: "" };

export type VehicleFormValues = {
  id?: number;
  brand?: string;
  model?: string;
  version?: string | null;
  yearManufacture?: number;
  yearModel?: number;
  km?: number;
  price?: string;
  fuel?: string;
  transmission?: string;
  color?: string | null;
  doors?: number | null;
  description?: string | null;
  accessories?: string | null;
  status?: string;
  featured?: boolean;
  images?: string[];
};

export function VehicleForm({ vehicle }: { vehicle?: VehicleFormValues }) {
  const [state, formAction] = useActionState(saveVehicle, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {vehicle?.id && <input type="hidden" name="id" value={vehicle.id} />}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-xs font-bold text-zinc-700">
          Marca
          <input
            type="text"
            name="brand"
            defaultValue={vehicle?.brand}
            placeholder="Ex: Fiat, Chevrolet, Toyota"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Modelo
          <input
            type="text"
            name="model"
            defaultValue={vehicle?.model}
            placeholder="Ex: Strada, Onix, Hilux"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Versão
          <input
            type="text"
            name="version"
            defaultValue={vehicle?.version ?? ""}
            placeholder="Ex: 1.3 Freedom CS Plus"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Ano Fab.
          <input
            type="number"
            name="yearManufacture"
            defaultValue={vehicle?.yearManufacture || 2020}
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Ano Mod.
          <input
            type="number"
            name="yearModel"
            defaultValue={vehicle?.yearModel || 2021}
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          KM Rodados
          <input
            type="number"
            name="km"
            defaultValue={vehicle?.km ?? 0}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Preço (R$)
          <input
            type="number"
            name="price"
            defaultValue={vehicle?.price}
            placeholder="Ex: 65900"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Câmbio
          <select
            name="transmission"
            defaultValue={vehicle?.transmission ?? "manual"}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          >
            <option value="manual">Manual</option>
            <option value="automatico">Automático</option>
          </select>
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Combustível
          <select
            name="fuel"
            defaultValue={vehicle?.fuel ?? "flex"}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          >
            <option value="flex">Flex</option>
            <option value="gasolina">Gasolina</option>
            <option value="diesel">Diesel</option>
          </select>
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Cor
          <input
            type="text"
            name="color"
            defaultValue={vehicle?.color ?? ""}
            placeholder="Branco, Prata, Preto..."
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </label>

        <label className="block text-xs font-bold text-zinc-700">
          Status no Site
          <select
            name="status"
            defaultValue={vehicle?.status ?? "disponivel"}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          >
            <option value="disponivel">Disponível no Pátio</option>
            <option value="reservado">Reservado / Sinal Pago</option>
            <option value="vendido">Vendido (Ocultar)</option>
          </select>
        </label>

        <div className="flex items-center pt-4">
          <label className="flex items-center gap-2 text-xs font-bold text-zinc-800 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={vehicle?.featured}
              className="h-4 w-4 rounded border-zinc-300 text-emerald-600"
            />
            Destacar este carro na frente
          </label>
        </div>
      </div>

      <label className="block text-xs font-bold text-zinc-700">
        Descrição do Carro
        <textarea
          name="description"
          rows={3}
          defaultValue={vehicle?.description ?? ""}
          placeholder="Ex: Veículo tirado na região, único dono, todas revisões feitas, manual e chave reserva..."
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
        />
      </label>

      <label className="block text-xs font-bold text-zinc-700">
        Opcionais (separados por vírgula)
        <input
          type="text"
          name="accessories"
          defaultValue={vehicle?.accessories ?? ""}
          placeholder="Ar condicionado, Direção elétrica, Vidros elétricos, Multimídia, Câmera de ré"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
        />
      </label>

      <label className="block text-xs font-bold text-zinc-700">
        Fotos (URLs de fotos, uma por linha)
        <textarea
          name="images"
          rows={3}
          placeholder="https://.../foto1.jpg&#10;https://.../foto2.jpg"
          defaultValue={vehicle?.images?.join("\n") ?? ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
        />
      </label>

      <div className="pt-2">
        <SubmitButton className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700">
          {vehicle?.id ? "Salvar Alterações" : "Cadastrar Veículo no Site"}
        </SubmitButton>
      </div>

      {state.message && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700">
          {state.message}
        </div>
      )}
    </form>
  );
}
