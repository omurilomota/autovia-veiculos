import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Brand, Plate } from "./brand";
import { whatsappLink } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-xs">
            <Brand light />
            <p className="mt-4 text-[13.5px] leading-relaxed text-white/55">
              Seminovos com procedência, preço na etiqueta e chave na mão. Há mais
              de 19 anos no mesmo endereço, do mesmo jeito: olho no olho.
            </p>
            <div className="mt-5">
              <Plate />
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:max-w-lg sm:grid-cols-3">
            <div>
              <p className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-white">
                Navegar
              </p>
              <nav className="mt-3.5 flex flex-col gap-2.5">
                <Link href="/#estoque" className="footer-link">Estoque</Link>
                <Link href="/#financiamento" className="footer-link">Financiamento</Link>
                <Link href="/#troca" className="footer-link">Seu usado na troca</Link>
                <Link href="/#loja" className="footer-link">A loja</Link>
              </nav>
            </div>
            <div>
              <p className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-white">
                Contato
              </p>
              <div className="mt-3.5 flex flex-col gap-2.5">
                <a
                  href={whatsappLink("Olá! Vim pelo site da Auto Via.")}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  (18) 99999-0101
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link inline-flex items-center gap-1"
                >
                  @demonstracao <ArrowUpRight size={12} />
                </a>
                <span className="text-[13px] text-white/40">
                  Seg–Sex 8h–18h
                  <br />
                  Sáb 8h–12h30
                </span>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-white">
                Endereço
              </p>
              <p className="mt-3.5 text-[13px] leading-relaxed text-white/55">
                Rua das Acácias, 100
                <br />
                Centro
                <br />
                Junqueirópolis/SP
                <br />
                CEP 00000-000
              </p>
              <a
                href="https://maps.google.com/?q=Rua+das+Acacias,+100,+Junqueir%C3%B3polis+-+SP"
                target="_blank"
                rel="noreferrer"
                className="footer-link mt-2.5 inline-flex items-center gap-1"
                style={{ color: "var(--lime)" }}
              >
                Abrir no mapa <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11.5px] text-white/35">
          <p>
            © {new Date().getFullYear()} Auto Via Veículos LTDA · CNPJ
            00.000.000/0001-00
          </p>
          <p className="hidden sm:block">
            Preços e disponibilidade sujeitos a alteração sem aviso.
          </p>
          <Link href="/admin" className="footer-link">
            Área da loja →
          </Link>
        </div>

        <p className="mt-4 text-center text-[10.5px] tracking-[0.08em] text-white/20">
          <a
            href="https://wa.me/5518998133524"
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com Murilo Mota no WhatsApp"
            className="transition-colors hover:text-white/55"
          >
            Desenvolvido por Murilo Mota · 55 (18) 99813-3524
          </a>
        </p>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Olá! Estou no site da Auto Via e quero negociar um carro.")}
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      aria-label="Negociar pelo WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Negociar agora</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
