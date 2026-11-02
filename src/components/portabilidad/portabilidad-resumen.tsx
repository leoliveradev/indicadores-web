"use client";

import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "@/lib/portabilidad";

import {
  PortabilidadOverview,
} from "./portabilidad-overview";

type Props = {
  data: ApiResponse<PortabilidadMovilRow>;
};

export function PortabilidadResumen({
  data,
}: Props) {

  return (
    <>
      <PortabilidadOverview
        data={data}
      />

    </>
  );
}