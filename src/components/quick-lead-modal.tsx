"use client";

import { useEffect, useState } from "react";
import { Banknote, MessageCircle, Repeat, X } from "lucide-react";
import { STORE_WHATSAPP } from "@/lib/utils";

export function QuickLeadModal({
  type,
  label,
  vehicleName,
  className = "btn btn-line",
}: {
  type: "simulacao" | "troca";
  label: string;
  vehicleName?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extra, setExtra] = useState("");

  const isSim = type === "simulacao";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = isSim
      ? `Olá! Me chamo ${name}. Quero simular o financiamento${vehicleName ? ` do ${vehicleName}` : ""}.${extra ? ` ${extra}.` : ""} Meu WhatsApp: ${phone}.`
      : `Olá! Me chamo ${name}. Quero avaliar meu carro na troca${vehicleName ? ` pelo ${vehicleName}` : ""}. Meu carro: ${extra}. Meu WhatsApp: ${phone}.`;
    window.open(
      `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {isSim ? <Banknote size={17} /> : <Repeat size={17} />}
        {label}
      </button>

      {open && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={isSim ? "Simular financiamento" : "Avaliar carro na troca"}
        >
          <div className="modal-panel">
            <div className="flex items-start justify-between gap-3 border-b border-[var(--line)] px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--lime)] text-[var(--pine-950)]">
                  {isSim ? <Banknote size={20} /> : <Repeat size={20} />}
                </span>
                <div>
                  <h3 className="font-display text-[21px] font-bold uppercase leading-none tracking-tight text-[var(--ink)]">
                    {isSim ? "Simular parcela" : "Avaliar meu usado"}
                  </h3>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)]">
                    {vehicleName ? `Referência: ${vehicleName}` : "Resposta direto no WhatsApp"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[1.5px] border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--pine-700)] hover:text-[var(--pine-900)]"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <div className="field">
                <label htmlFor={`${type}-nome`}>Seu nome</label>
                <input
                  id={`${type}-nome`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como te chamamos?"
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor={`${type}-fone`}>Seu WhatsApp</label>
                <input
                  id={`${type}-fone`}
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(18) 99999-9999"
                  autoComplete="tel"
                />
              </div>
              <div className="field">
                <label htmlFor={`${type}-extra`}>
                  {isSim ? "Entrada ou observação (opcional)" : "Seu carro atual"}
                </label>
                <input
                  id={`${type}-extra`}
                  required={!isSim}
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  placeholder={
                    isSim
                      ? "Ex.: R$ 15.000 de entrada, 48x"
                      : "Ex.: Palio 2014, 90 mil km"
                  }
                />
              </div>

              <button type="submit" className="btn btn-whats w-full">
                <MessageCircle size={17} />
                Enviar no WhatsApp
              </button>
              <p className="text-center text-[11.5px] leading-relaxed text-[var(--faint)]">
                Abre o WhatsApp com a mensagem pronta.
                <br />
                Sem cadastro, sem robô — quem responde é a equipe da loja.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
