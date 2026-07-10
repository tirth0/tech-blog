import type { ERTheme } from "./theme";
export interface ERField {
  name: string;

  /**
   * PK / FK / Metric / Attribute
   */
  kind?: "pk" | "fk" | "metric" | "attribute";

  /**
   * Optional data type.
   */
  type?: string;

  /**
   * Optional description.
   */
  description?: string;
}

export interface ERSection {
  title: string;
  fields: ERField[];
}

export interface ERTable {
  id: string;

  title: string;

  /**
   * Override automatic width.
   */
  width?: number;

  /**
   * Override automatic height.
   */
  height?: number;

  sections: ERSection[];
}

export interface EREdge {
  from: string;

  to: string;

  /**
   * Optional relationship label.
   */
  label?: string;

  /**
   * Future support.
   */
  style?: "solid" | "dashed";

  /**
   * Future support.
   */
  cardinality?: "1:1" | "1:N" | "N:1" | "N:N";
}

export type ERLayout =
  | "star"
  | "horizontal"
  | "vertical"
  | "grid";

export interface ERDiagramProps {
  tables: ERTable[];
  edges: EREdge[];
  layout?: "star" | "horizontal" | "vertical" | "grid";
  padding?: number;
}

export interface PositionedTable extends ERTable {
  x: number;
  y: number;

  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface LayoutResult {
  width: number;
  height: number;
  tables: PositionedTable[];
  edges: EREdge[];
}