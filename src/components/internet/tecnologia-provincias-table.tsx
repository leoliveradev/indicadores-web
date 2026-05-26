"use client";

import type { InternetTecnologiaProvinciaRow } from "@/lib/types";
import {fmtNumber} from "@/lib/format";

export function TecnologiaProvinciasTable({
  data,
}: {
  data: InternetTecnologiaProvinciaRow[];
}) {
  return (
    <div className="table-wrap">

      <table className="data-table">
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Provincia</th>
            <th>Fibra</th>
            <th>Cable</th>
            <th>ADSL</th>
            <th>Wireless</th>
            <th>Otros</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.anio + "-T" + row.trimestre + row.provincia}>
              <td>{row.anio + "-T" + row.trimestre}</td>
              <td>{row.provincia}</td>
              <td>{fmtNumber(row.fibra_optica)}</td>
              <td>{fmtNumber(row.cablemodem)}</td>
              <td>{fmtNumber(row.adsl)}</td>
              <td>{fmtNumber(row.wireless)}</td>
              <td>{fmtNumber(row.otros)}</td>
              <td><b>{fmtNumber(row.total)}</b></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}