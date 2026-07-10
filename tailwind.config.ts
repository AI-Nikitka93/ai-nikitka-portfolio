const config = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        surface: {
          DEFAULT: "var(--color-surface)",
          muted: "var(--color-surface-muted)",
          strong: "var(--color-surface-strong)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
          strong: "var(--color-accent-strong)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          subtle: "var(--color-border-subtle)",
        },
        panel: {
          DEFAULT: "var(--color-panel)",
          soft: "var(--color-panel-soft)",
        },
        titanium: "var(--color-titanium)",
        ember: "var(--color-ember)",
        oxide: "var(--color-oxide)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        panel: "1rem",
        shell: "1.25rem",
      },
    },
  },
};

export default config;
