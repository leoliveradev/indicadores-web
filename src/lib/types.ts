export interface ApiResponse<T> {
  data: T[];
}

export interface BaseResponseAPI {
  anio: number;
  trimestre: number;
  mes: number;
}

export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

