"use client";

import { usePathname } from "next/navigation";

export function SkipLink() {
  const pathname = usePathname();
  const label = pathname === "/en" ? "Skip to content" : "Перейти к содержанию";

  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
