// src/components/erd/utils.ts

export interface SatoriNode {
  type: string;
  props: {
    style?: Record<string, unknown>;
    children?: SatoriChild;
    [key: string]: unknown;
  };
}

export type SatoriChild =
  | string
  | number
  | SatoriNode
  | SatoriChild[];

export function h(
  type: string,
  props: Record<string, unknown> = {},
  children?: SatoriChild
): SatoriNode {
  return {
    type,
    props: {
      ...props,
      ...(children !== undefined ? { children } : {}),
    },
  };
}