"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body
        style={{
          minHeight: "100vh",
          margin: 0,
          background: "#0a0d0c",
          color: "#d6cfbf",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
          }}
        >
          <section
            style={{
              maxWidth: "720px",
              border: "1px solid rgba(142,150,140,0.24)",
              borderRadius: "24px",
              background: "rgba(18,24,22,0.92)",
              padding: "32px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#b7ff3c",
                fontFamily: "ui-monospace, monospace",
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Системная ошибка
            </p>
            <h1 style={{ margin: "16px 0 0", fontSize: "clamp(32px, 6vw, 54px)" }}>
              Сайт не загрузил страницу.
            </h1>
            <p style={{ margin: "16px 0 0", lineHeight: 1.8, color: "rgba(214,207,191,0.78)" }}>
              Это аварийный экран верхнего уровня. Повторите загрузку или вернитесь на главную
              страницу.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "28px" }}>
              <button
                type="button"
                onClick={reset}
                style={{
                  minHeight: "44px",
                  border: "1px solid #b7ff3c",
                  borderRadius: "14px",
                  background: "transparent",
                  color: "#d6cfbf",
                  cursor: "pointer",
                  padding: "12px 18px",
                }}
              >
                Повторить
              </button>
              <Link
                href="/"
                style={{
                  minHeight: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid rgba(142,150,140,0.24)",
                  borderRadius: "14px",
                  color: "#d6cfbf",
                  padding: "12px 18px",
                  textDecoration: "none",
                }}
              >
                На главную
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
