// src/components/erd/renderToSvg.ts

import satori, { type SatoriOptions } from "satori";

import { createDiagram } from "./Diagram";
import { applyLayout } from "./layouts";
import type { ERDiagramProps } from "./types";

export async function renderToSvg(
  props: ERDiagramProps,
  fonts: NonNullable<SatoriOptions["fonts"]>
): Promise<string> {
  const layout = applyLayout(props);

  return satori(createDiagram(layout), {
    width: layout.width,
    height: layout.height,
    embedFont: true,
    fonts,
  });
}