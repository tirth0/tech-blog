// src/components/erd/layouts.ts

import { DefaultTheme } from "./theme";
import type {
  ERDiagramProps,
  EREdge,
  ERTable,
  LayoutResult,
  PositionedTable,
} from "./types";

const DEFAULT_TABLE_HEIGHT = 180;
const TAU = Math.PI * 2;

export function applyLayout(
  props: ERDiagramProps
): LayoutResult {
  switch (props.layout ?? "star") {
    case "horizontal":
      return horizontalLayout(props);

    case "vertical":
      return verticalLayout(props);

    case "grid":
      return gridLayout(props);

    case "star":
    default:
      return starLayout(props);
  }
}

function positionTable(table: ERTable): PositionedTable {
  return {
    ...table,

    x: 0,
    y: 0,

    width: table.width ?? DefaultTheme.table.width,
    height: table.height ?? estimateHeight(table),
  };
}

function estimateHeight(table: ERTable): number {
  const sectionCount = table.sections.length;

  let rows = 0;

  for (const section of table.sections) {
    rows += 1; // section title
    rows += section.fields.length;
  }

  return (
    DefaultTheme.header.height +
    DefaultTheme.table.padding * 2 +
    rows * DefaultTheme.field.lineHeight +
    sectionCount * DefaultTheme.section.gap +
    (rows - sectionCount) * 4
  );
}
function starLayout(
  props: ERDiagramProps
): LayoutResult {
  const tables = props.tables.map(positionTable);

  if (tables.length === 0) {
    return computeBounds(
      tables,
      props.edges,
      props.padding ?? DefaultTheme.canvas.padding
    );
  }

  const center = tables[0];

  // Put the fact table at the origin.
  center.x = 0;
  center.y = 0;

  const surrounding = tables.slice(1);

  if (surrounding.length === 0) {
    return computeBounds(
      tables,
      props.edges,
      props.padding ?? DefaultTheme.canvas.padding
    );
  }

  const maxTableWidth = Math.max(
    ...surrounding.map(t => t.width)
  );

  const maxTableHeight = Math.max(
    ...surrounding.map(t => t.height)
  );

  const circumferenceNeeded =
    surrounding.length * (maxTableWidth + 80);

  const radius = Math.max(
    circumferenceNeeded / TAU,
    center.width / 2 + maxTableWidth / 2 + 120,
    center.height / 2 + maxTableHeight / 2 + 120
  );

  surrounding.forEach((table, index) => {
    const angle =
      (index / surrounding.length) * TAU;

    table.x =
      Math.cos(angle) * radius -
      table.width / 2;

    table.y =
      Math.sin(angle) * radius -
      table.height / 2;
  });

  return computeBounds(
    tables,
    props.edges,
    props.padding ?? DefaultTheme.canvas.padding
  );
}

function horizontalLayout(
  props: ERDiagramProps
): LayoutResult {
  const tables = props.tables.map(positionTable);

  let x = 0;

  for (const table of tables) {
    table.x = x;
    table.y = 0;

    x += table.width + 80;
  }

  return computeBounds(
    tables,
    props.edges,
    props.padding ?? DefaultTheme.canvas.padding
  );
}

function verticalLayout(
  props: ERDiagramProps
): LayoutResult {
  const tables = props.tables.map(positionTable);

  let y = 0;

  for (const table of tables) {
    table.x = 0;
    table.y = y;

    y += table.height + 80;
  }

  return computeBounds(
    tables,
    props.edges,
    props.padding ?? DefaultTheme.canvas.padding
  );
}

function gridLayout(
  props: ERDiagramProps
): LayoutResult {
  const tables = props.tables.map(positionTable);

  const columns = Math.ceil(Math.sqrt(tables.length));

  const spacingX = 80;
  const spacingY = 80;

  tables.forEach((table, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;

    table.x =
      column * (table.width + spacingX);

    table.y =
      row * (table.height + spacingY);
  });

  return computeBounds(
    tables,
    props.edges,
    props.padding ?? DefaultTheme.canvas.padding
  );
}

function computeBounds(
  tables: PositionedTable[],
  edges: EREdge[],
  padding: number
) {
  const minX = Math.min(...tables.map(t => t.x));
  const minY = Math.min(...tables.map(t => t.y));

  const maxX = Math.max(...tables.map(t => t.x + t.width));
  const maxY = Math.max(...tables.map(t => t.y + t.height));

  // Shift everything so the diagram starts at `padding`
  for (const table of tables) {
    table.x += padding - minX;
    table.y += padding - minY;
  }

  return {
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
    tables,
    edges,
  };
}