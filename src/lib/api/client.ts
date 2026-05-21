const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function get<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate }
  });

  if (!res.ok) {
    throw new Error(`API error: ${path}`);
  }

  return res.json() as Promise<T>;
}