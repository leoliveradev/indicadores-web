export function getLatest<T>(rows: T[]) {
  return rows?.[rows.length - 1];
}