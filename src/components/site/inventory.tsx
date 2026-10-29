"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Heart, MessageCircle, Search, SearchX, X } from "lucide-react";
import { CarCard, type Car } from "./car-card";
import { Reveal } from "./reveal";
import { useFavorites } from "@/lib/use-favorites";
import { whatsappLink } from "@/lib/utils";

type Sort = "destaque" | "menor-preco" | "maior-preco" | "menor-km" | "mais-novo";

const SORT_LABELS: Record<Sort, string> = {
  destaque: "Destaques primeiro",
  "menor-preco": "Menor preço",
  "maior-preco": "Maior preço",
  "menor-km": "Menor km",
  "mais-novo": "Mais novos",
};

export function Inventory({ cars }: { cars: Car[] }) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("Todas");
  const [sort, setSort] = useState<Sort>("destaque");
  const [favOnly, setFavOnly] = useState(false);
  const { ids, count } = useFavorites();

  const brands = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of cars) map.set(c.brand, (map.get(c.brand) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [cars]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = cars.filter((c) => {
      if (brand !== "Todas" && c.brand !== brand) return false;
      if (favOnly && !ids.includes(c.id)) return false;
      if (!q) return true;
      return `${c.brand} ${c.model} ${c.version ?? ""} ${c.yearModel} ${c.color ?? ""}`
        .toLowerCase()
        .includes(q);
    });
    list = [...list];
    switch (sort) {
      case "menor-preco":
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "maior-preco":
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "menor-km":
        list.sort((a, b) => a.km - b.km);
        break;
      case "mais-novo":
        list.sort((a, b) => b.yearModel - a.yearModel);
        break;
      default:
        list.sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured) ||
            Number(b.createdAt) - Number(a.createdAt),
        );
    }
    return list;
  }, [cars, query, brand, sort, favOnly, ids]);

  const clearAll = () => {
    setQuery("");
    setBrand("Todas");
    setFavOnly(false);
  };

  return (
    <section id="estoque" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="sec-tag">
              <span className="sec-num">01</span> Estoque
            </span>
            <h2 className="sec-title">
              No pátio <span className="accent">hoje.</span>
            </h2>
          </div>
          <p className="max-w-[300px] pb-1 text-[13.5px] leading-relaxed text-[var(--muted)]">
            Tudo revisado e com preço na etiqueta. Gostou de um? Chama no WhatsApp
            que a gente negocia.
          </p>
        </div>
      </Reveal>

      {/* barra de filtros */}
      <div className="sticky top-[64px] z-30 -mx-4 mt-8 border-y border-[var(--line)]/70 bg-[var(--paper)]/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:top-[72px] sm:border-y-0 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="search-box flex-1">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar modelo, marca, ano… ex.: Strada 2021"
              aria-label="Buscar no estoque"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="text-[var(--faint)] transition-colors hover:text-[var(--ink)]"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className={`chip chip-fav shrink-0 ${favOnly ? "is-active" : ""}`}
              onClick={() => setFavOnly((v) => !v)}
              aria-pressed={favOnly}
              aria-label={`Ver apenas favoritos (${count})`}
            >
              <Heart size={14} className={favOnly ? "fill-current" : ""} />
              <span className="hidden xs:inline sm:inline">Favoritos</span>{" "}
              <span className="chip-count">{count}</span>
            </button>
            <div className="sort-wrap flex-1 lg:flex-none">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Ordenar estoque"
                className="w-full"
              >
                {(Object.keys(SORT_LABELS) as Sort[]).map((s) => (
                  <option key={s} value={s}>
                    {SORT_LABELS[s]}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            className={`chip ${brand === "Todas" ? "is-active" : ""}`}
            onClick={() => setBrand("Todas")}
          >
            Todas <span className="chip-count">{cars.length}</span>
          </button>
          {brands.map(([b, n]) => (
            <button
              key={b}
              type="button"
              className={`chip ${brand === b ? "is-active" : ""}`}
              onClick={() => setBrand(brand === b ? "Todas" : b)}
            >
              {b} <span className="chip-count">{n}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[12.5px] font-semibold text-[var(--faint)]" aria-live="polite">
        {results.length} {results.length === 1 ? "carro encontrado" : "carros encontrados"}
        {brand !== "Todas" && ` · ${brand}`}
        {favOnly && " · só favoritos"}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((car, i) => (
            <Reveal key={car.id} delay={(i % 3) * 80}>
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-2xl border-[1.5px] border-dashed border-[var(--line)] bg-white px-6 py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--lime-soft)] text-[var(--pine-700)]">
            <SearchX size={26} />
          </span>
          <h3 className="font-display mt-4 text-2xl font-bold uppercase text-[var(--ink)]">
            {favOnly && count === 0 ? "Nenhum favorito ainda" : "Nada com esses filtros"}
          </h3>
          <p className="mt-1.5 max-w-sm text-[14px] text-[var(--muted)]">
            {favOnly && count === 0
              ? "Toque no coração de um carro para salvar aqui e comparar com calma."
              : "A gente procura pra você. Manda o modelo que quer no WhatsApp que avisamos quando chegar."}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <button type="button" className="btn btn-line btn-sm" onClick={clearAll}>
              Limpar filtros
            </button>
            <a
              href={whatsappLink(
                `Olá! Procuro um carro${query ? ` (${query})` : ""} que não achei no site. Podem me avisar quando chegar?`,
              )}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whats btn-sm"
            >
              <MessageCircle size={15} />
              Pedir pra equipe procurar
            </a>
          </div>
        </div>
      )}

      <p className="mt-6 text-[11.5px] leading-relaxed text-[var(--faint)]">
        *Parcela estimada em 48x com 20% de entrada, taxa de referência de 1,89% a.m.
        Valores e condições sujeitos à análise de crédito. Fotos ilustrativas — venha ver o
        carro de perto no pátio.
      </p>
    </section>
  );
}
