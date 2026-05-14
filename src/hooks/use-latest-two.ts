import { useState, useEffect } from "react";

type Row = Record<string, any>;

export function useLatestTwo<T = Row>(path: string) {
  const [cur, setCur] = useState<T | null>(null);
  const [prev, setPrev] = useState<T | null>(null);
  const [all, setAll] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

    (async () => {
      try {
        setLoading(true);
        const r = await fetch(`${BASE}${path}`);
        const j = await r.json();
        
        // 1. Extraemos el array de datos de forma segura
        const arr: T[] = j.data ?? j;

        // 2. Verificamos que sea un array real y que no esté vacío
        if (active && Array.isArray(arr) && arr.length > 0) {
          setAll(arr);
          // Usamos la sintaxis clásica de corchetes que nunca falla y es 100% compatible
          setCur(arr[arr.length - 1] ?? null);
          setPrev(arr[arr.length - 2] ?? null);
        }
      } catch (error) {
        console.error(`Error fetching ${path}:`, error);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [path]);

  return { cur, prev, all, loading };
}