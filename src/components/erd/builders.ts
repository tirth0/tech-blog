export interface SatoriElement {
  type: string;
  props: {
    style?: Record<string, unknown>;
    children?: unknown;
    [key: string]: unknown;
  };
}