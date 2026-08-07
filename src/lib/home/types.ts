export interface Overview {
  periodo: string;

  accesos: {
    fija: number;
    internet: number;
    tv: number;
    moviles: number;
  };

  penetracion: {
    fija: number;
    internet: number;
    tv: number;
    moviles: number;
  };

  portabilidad: {
    moviles: {
      acumuladas: number;
      mes: number;
    };
    fija: {
      acumuladas: number;
      mes: number;
    };
  };

  miscelaneas: {
    velocidad_mbps: number;
    radiobases_4g: number;
    fibra_pct: number;
    satelital_pct: number;
  };

  ingresos: {
    fija: number;
    internet: number;
    tv: number;
    moviles: number;
  };

  postal: {
    facturacion: number;
    produccion: number;
  };
}
