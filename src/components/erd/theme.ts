// src/components/erd/theme.ts

export interface ERTheme {
  canvas: {
    background: string;
    padding: number;
  };

  table: {
    width: number;
    minHeight: number;

    background: string;

    borderColor: string;
    borderWidth: number;
    borderRadius: number;

    padding: number;

    gap: number;
  };

  header: {
    background: string;
    color: string;

    height: number;

    fontSize: number;
    fontWeight: number;
  };

  section: {
    titleColor: string;
    titleSize: number;
    titleWeight: number;

    gap: number;
  };

  field: {
    color: string;
    fontSize: number;

    lineHeight: number;

    kindColors: {
      pk: string;
      fk: string;
      metric: string;
      attribute: string;
    };
  };

  edge: {
    color: string;
    width: number;
  };
}

export const DefaultTheme: ERTheme = {
  canvas: {
    background: "#ffffff",
    padding: 40,
  },

  table: {
    width: 260,
    minHeight: 140,

    background: "#ffffff",

    borderColor: "#d4d4d8",
    borderWidth: 2,
    borderRadius: 12,

    padding: 16,

    gap: 20,
  },

  header: {
    background: "#18181b",
    color: "#ffffff",

    height: 48,

    fontSize: 20,
    fontWeight: 700,
  },

  section: {
    titleColor: "#71717a",
    titleSize: 13,
    titleWeight: 700,

    gap: 8,
  },

  field: {
    color: "#27272a",

    fontSize: 15,

    lineHeight: 24,

    kindColors: {
      pk: "#2563eb",
      fk: "#0891b2",
      metric: "#16a34a",
      attribute: "#71717a",
    },
  },

  edge: {
    color: "#94a3b8",
    width: 2,
  },
};