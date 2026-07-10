// src/components/erd/Edge.ts

import type { Point, PositionedTable } from "./types";
import { DefaultTheme } from "./theme";
import { h, type SatoriNode } from "./utils";

export function createEdge(
  from: PositionedTable,
  to: PositionedTable
): SatoriNode {
  const points = routeEdge(from, to);

  const segments = [];

  for (let i = 0; i < points.length - 1; i++) {
    segments.push(createSegment(points[i], points[i + 1]));
  }

  return h(
    "div",
    {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
      },
    },
    segments
  );
}

function routeEdge(
  from: PositionedTable,
  to: PositionedTable
): Point[] {
  const start = anchor(from, to);
  const end = anchor(to, from);

  const middleX = (start.x + end.x) / 2;

  return [
    start,
    {
      x: middleX,
      y: start.y,
    },
    {
      x: middleX,
      y: end.y,
    },
    end,
  ];
}

function anchor(
  table: PositionedTable,
  other: PositionedTable
): Point {
  const centerX = table.x + table.width / 2;
  const centerY = table.y + table.height / 2;

  const otherCenterX = other.x + other.width / 2;
  const otherCenterY = other.y + other.height / 2;

  const dx = otherCenterX - centerX;
  const dy = otherCenterY - centerY;

  if (Math.abs(dx) > Math.abs(dy)) {
    return {
      x: dx > 0 ? table.x + table.width : table.x,
      y: centerY,
    };
  }

  return {
    x: centerX,
    y: dy > 0 ? table.y + table.height : table.y,
  };
}

function createSegment(
  from: Point,
  to: Point
): SatoriNode {
  const vertical = from.x === to.x;

  return h("div", {
    style: {
      position: "absolute",

      left: Math.min(from.x, to.x),
      top: Math.min(from.y, to.y),

      width: vertical
        ? DefaultTheme.edge.width
        : Math.abs(to.x - from.x),

      height: vertical
        ? Math.abs(to.y - from.y)
        : DefaultTheme.edge.width,

      background: DefaultTheme.edge.color,
    },
  });
}