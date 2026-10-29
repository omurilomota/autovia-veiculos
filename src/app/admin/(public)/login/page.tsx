"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowLeft, KeyRound } from "lucide-react";
import { loginAction, type LoginState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Brand, Plate } from "@/components/site/brand";

const initialState: LoginState = { ok: false, message: "" };

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        background:
          "repeating-linear-gradient(-18deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 26px), radial-gradient(600px 400px at 80% 10%, rgba(200,241,105,0.1), transparent 60%), var(--pine-950)",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-between">
          <Brand light />
          <Plate text="EQUIPE" />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-2xl">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--pine-700)]">
            <KeyRound size={14} />
            Acesso da loja
          </p>
          <h1 className="font-display mt-2 text-[26px] font-extrabold uppercase leading-none tracking-tight text-[var(--ink)]">
            Painel do estoque
          </h1>

          <form action={formAction} className="mt-5 space-y-4">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                defaultValue="admin@exemplo.com"
                required
                autoComplete="username"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <SubmitButton className="btn btn-dark w-full">
              Entrar no painel
            </SubmitButton>

            {state.message && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-center text-[12.5px] font-bold text-red-700">
                {state.message}
              </p>
            )}
          </form>
        </div>

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-white/60 transition-colors hover:text-[var(--lime)]"
        >
          <ArrowLeft size={15} />
          Voltar para o site
        </Link>
      </div>
    </div>
  );
}
