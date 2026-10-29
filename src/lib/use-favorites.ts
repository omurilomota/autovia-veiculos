"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "autovia:favoritos";
const EVENT = "autovia-favoritos-changed";

function read(): number[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((n): n is number => typeof n === "number")
      : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIds(read());
    setReady(true);
    const sync = () => setIds(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: number) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((n) => n !== id)
      : [...current, id];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // armazenamento indisponível — mantém apenas em memória
    }
    setIds(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const has = useCallback((id: number) => ids.includes(id), [ids]);

  return { ids, has, toggle, ready, count: ids.length };
}
