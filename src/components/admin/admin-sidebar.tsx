import Link from "next/link";
import { CarFront, ExternalLink, LogOut, Plus } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { Brand, Plate } from "@/components/site/brand";

export function AdminSidebar({ userName }: { userName: string }) {
  return (
    <aside
      className="flex h-screen w-60 shrink-0 flex-col border-r border-white/10"
      style={{ background: "var(--pine-950)" }}
    >
      <div className="border-b border-white/10 p-5">
        <Link href="/admin" aria-label="Painel Auto Via">
          <Brand light size={38} />
        </Link>
      </div>

      <nav className="flex-1 space-y-1.5 p-4">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-bold text-[var(--lime)]"
          style={{ background: "rgba(200,241,105,0.1)" }}
        >
          <CarFront size={16} />
          Estoque de carros
        </Link>
        <Link
          href="/admin/veiculos/novo"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-white/65 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Plus size={16} />
          Novo veículo
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-white/65 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink size={16} />
          Ver site da loja
        </Link>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3">
          <Plate text="EQUIPE" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Logado como</p>
        <p className="truncate text-[12.5px] font-bold text-white/85">{userName}</p>
        <form action={logoutAction} className="mt-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 py-2 text-[12px] font-bold text-white/70 transition-colors hover:border-[var(--lime)] hover:text-[var(--lime)]"
          >
            <LogOut size={14} />
            Sair do painel
          </button>
        </form>
      </div>
    </aside>
  );
}
