// src/components/erd/Diagram.ts

import { DefaultTheme } from "./theme";
import { createEdge } from "./Edge";
import { createTable } from "./Table";
import { h, type SatoriNode } from "./utils";

import type {
  LayoutResult,
  PositionedTable,
} from "./types";

export function createDiagram(
  layout: LayoutResult
): SatoriNode {
  const lookup = new Map<string, PositionedTable>();

  for (const table of layout.tables) {
    lookup.set(table.id, table);
  }

  const children: SatoriNode[] = [];

  //
  // Draw edges first
  //

  for (const edge of layout.edges) {
    const from = lookup.get(edge.from);
    const to = lookup.get(edge.to);

    if (!from || !to) {
      continue;
    }

    children.push(
      createEdge(from, to)
    );
  }

  //
  // Draw tables above edges
  //

  for (const table of layout.tables) {
    children.push(
      createTable(table)
    );
  }

  return h(
    "div",
    {
      style: {
        position: "relative",

        width: layout.width,
        height: layout.height,

        background: DefaultTheme.canvas.background,

        display: "flex",
      },
    },
    children
  );
}