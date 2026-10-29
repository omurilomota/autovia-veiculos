"use client";

import { Trash2 } from "lucide-react";

export function StatusSelect({
  id,
  status,
  action,
}: {
  id: number;
  status: string;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border-[1.5px] border-[var(--line)] bg-white px-2 py-1.5 text-[11.5px] font-bold text-[var(--ink)] outline-none focus:border-[var(--green-600)]"
        aria-label="Alterar status do veículo"
      >
        <option value="disponivel">Disponível</option>
        <option value="reservado">Reservado</option>
        <option value="vendido">Vendido</option>
        <option value="preparacao">Em preparação</option>
      </select>
    </form>
  );
}

export function DeleteButton({
  id,
  name,
  action,
}: {
  id: number;
  name: string;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Excluir "${name}" do estoque? Essa ação não pode ser desfeita.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center gap-1 rounded-lg border-[1.5px] border-red-200 px-2.5 py-1.5 text-[11.5px] font-bold text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 size={12} />
        Excluir
      </button>
    </form>
  );
}
