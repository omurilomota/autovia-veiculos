"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Brand } from "./brand";
import { useFavorites } from "@/lib/use-favorites";
import { STORE_WHATSAPP, whatsappLink } from "@/lib/utils";

const NAV = [
  { href: "/#estoque", label: "Estoque" },
  { href: "/#financiamento", label: "Financiamento" },
  { href: "/#troca", label: "Seu usado" },
  { href: "/#loja", label: "A loja" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-2 px-4 sm:h-[72px] sm:gap-4 sm:px-6">
        <Link
          href="/"
          aria-label="Auto Via Veículos — início"
          className="min-w-0"
          onClick={() => setOpen(false)}
        >
          <Brand compact />
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-7"
          aria-label="Navegação principal"
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <Link
            href="/#estoque"
            className="chip"
            title="Carros que você salvou"
            aria-label={`Favoritos (${count})`}
          >
            <Heart size={14} className={count > 0 ? "fill-[#e5484d] text-[#e5484d]" : ""} />
            <span className="hidden xs:inline">Favoritos</span>
            <span className="chip-count">{count}</span>
          </Link>

          <a
            href={`tel:+${STORE_WHATSAPP}`}
            className="hidden items-center gap-2 whitespace-nowrap text-[13.5px] font-bold text-[var(--pine-800)] 2xl:inline-flex"
          >
            <Phone size={15} />
            (18) 99999-0101
          </a>

          <a
            href={whatsappLink("Olá! Vim pelo site da Auto Via e quero falar sobre um carro.")}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whats btn-sm"
            aria-label="Chamar no WhatsApp"
          >
            <MessageCircle size={16} />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border-[1.5px] border-[var(--line)] bg-white text-[var(--pine-900)] sm:h-10 sm:w-10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-white px-4 pb-5 pt-2 lg:hidden">
          <nav className="flex flex-col" aria-label="Menu">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-dashed border-[var(--line)] py-3 text-[15px] font-semibold text-[var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:+${STORE_WHATSAPP}`}
              className="flex items-center gap-2 border-b border-dashed border-[var(--line)] py-3 text-[15px] font-semibold text-[var(--ink)]"
            >
              <Phone size={15} className="text-[var(--green-600)]" />
              (18) 99999-0101
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="py-3 text-[15px] font-semibold text-[var(--ink)]"
            >
              Instagram @demonstracao
            </a>
          </nav>
          <a
            href={whatsappLink("Olá! Vim pelo site da Auto Via e quero falar sobre um carro.")}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whats mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            <MessageCircle size={17} />
            Chamar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
