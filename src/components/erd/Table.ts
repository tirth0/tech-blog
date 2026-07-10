// src/components/erd/Table.ts

import type { PositionedTable } from "./types";
import { DefaultTheme } from "./theme";
import { h, type SatoriNode } from "./utils";

const TYPE_COLUMN_WIDTH = 90;

export function createTable(table: PositionedTable): SatoriNode {
  return h(
    "div",
    {
      style: {
        position: "absolute",

        left: table.x,
        top: table.y,

        width: table.width,
        minHeight: table.height,

        display: "flex",
        flexDirection: "column",

        background: DefaultTheme.table.background,

        border: `${DefaultTheme.table.borderWidth}px solid ${DefaultTheme.table.borderColor}`,
        borderRadius: DefaultTheme.table.borderRadius,

        overflow: "hidden",
      },
    },
    [
      createHeader(table.title),
      createBody(table),
    ]
  );
}

function createHeader(title: string): SatoriNode {
  return h(
    "div",
    {
      style: {
        background: DefaultTheme.header.background,
        color: DefaultTheme.header.color,

        height: DefaultTheme.header.height,

        display: "flex",
        alignItems: "center",

        paddingLeft: DefaultTheme.table.padding,
        paddingRight: DefaultTheme.table.padding,

        fontSize: DefaultTheme.header.fontSize,
        fontWeight: DefaultTheme.header.fontWeight,
      },
    },
    title
  );
}

function createBody(table: PositionedTable): SatoriNode {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",

        gap: DefaultTheme.table.gap,

        padding: DefaultTheme.table.padding,
      },
    },
    table.sections.map(section => createSection(section, table))
  );
}

function createSection(
  section: PositionedTable["sections"][number],
  table: PositionedTable
): SatoriNode {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",

        gap: DefaultTheme.section.gap,
      },
    },
    [
      h(
        "div",
        {
          style: {
            color: DefaultTheme.section.titleColor,

            fontSize: DefaultTheme.section.titleSize,
            fontWeight: DefaultTheme.section.titleWeight,
          },
        },
        section.title
      ),

      ...section.fields.map(field => createField(field, table)),
    ]
  );
}

function createField(
  field: PositionedTable["sections"][number]["fields"][number],
  table: PositionedTable
): SatoriNode {
  const color =
    field.kind && DefaultTheme.field.kindColors[field.kind]
      ? DefaultTheme.field.kindColors[field.kind]
      : DefaultTheme.field.color;

  const nameColumnWidth =
    table.width -
    DefaultTheme.table.padding * 2 -
    TYPE_COLUMN_WIDTH;

  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        width: "100%",

        fontSize: DefaultTheme.field.fontSize,
        lineHeight: `${DefaultTheme.field.lineHeight}px`,
      },
    },
    [
      h(
        "div",
        {
          style: {
            width: nameColumnWidth,
            color,

            overflow: "hidden",
            whiteSpace: "nowrap",
          },
        },
        field.name
      ),

      h(
        "div",
        {
          style: {
            width: TYPE_COLUMN_WIDTH,

            textAlign: "right",

            color: "#71717a",
          },
        },
        field.type ?? ""
      ),
    ]
  );
}