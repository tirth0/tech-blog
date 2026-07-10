import type { SatoriOptions } from "satori";

import { renderToSvg } from "./renderToSvg";
import type { ERDiagramProps } from "./types";

export async function renderERDiagram(
  props: ERDiagramProps,
  fonts: NonNullable<SatoriOptions["fonts"]>
): Promise<string> {
  return renderToSvg(props, fonts);
}