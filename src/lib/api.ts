import { BaseResponseAPI } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

async function fetchRawLatest(path: string, revalidate: number) {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate }
  });

  if (!res.ok) return undefined;

  const json = await res.json();
  const data: BaseResponseAPI[] = Array.isArray(json) ? json : (json.data ?? []);
  
  if (data.length === 0) return undefined;
  return data[data.length - 1];
}

export async function getLatestValue<T>(
  path: string, 
  selector: (item: BaseResponseAPI) => T,
  revalidate = 86400
): Promise<T | undefined> {
  const lastItem = await fetchRawLatest(path, revalidate);
  return lastItem ? selector(lastItem) : undefined;
}

export async function getLatestPeriod(
  path: string,
  revalidate = 86400
): Promise<{ anio: number; trimestre?: number; mes?: number } | undefined> {
  const lastItem = await fetchRawLatest(path, revalidate);
  if (!lastItem) return undefined;

  return {
    anio: lastItem.anio,
    trimestre: lastItem.trimestre,
    mes: lastItem.mes
  };
}

export async function getOverview() {
  const res = await fetch(`${API_URL}/api/v1/overview/latest`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error("Error fetching overview");
  }

  return res.json();
}

async function get<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate } })
  return res.json() as Promise<T>
}
