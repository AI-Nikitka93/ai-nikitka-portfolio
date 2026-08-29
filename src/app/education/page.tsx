import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FormalEducationSection } from "@/components/formal-education-section";
import { EducationRegistry } from "@/components/education-registry";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Образование и сертификаты",
  description:
    "Базовое инженерное образование, профессиональные квалификации и реестр 250+ онлайн-курсов и сертификатов Никиты Кизевича (AI_Nikitka93).",
  path: "/education",
});

export default function EducationPage() {
  return (
    <PageShell
      eyebrow="ОБРАЗОВАНИЕ & КВАЛИФИКАЦИИ"
      title="Инженерная база, непрерывное обучение и реестр 250+ сертификатов."
      description="Здесь собрана вся образовательная траектория: от базового государственного диплома электромеханика и 5-го разряда электромонтера до специализаций ведущих мировых институтов (Vanderbilt, IBM, Google, Harvard, ООН, ВОЗ)."
      actions={
        <>
          <Link
            href="/awards-credentials"
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent/20"
          >
            <Award size={15} />
            <span>Награды и конкурсы</span>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.06)]"
          >
            <span>Смотреть работы</span>
            <ArrowRight size={15} />
          </Link>
        </>
      }
      aside={
        <div className="signal-frame signal-radial-accent rounded-panel p-5">
          <p className="signal-label text-accent">Ключевые ориентиры</p>
          <div className="mt-4 space-y-3">
            {[
              ["База", "Техник-электромеханик"],
              ["Разряд", "5-й разряд (>1000В)"],
              ["Онлайн-курсы", "250+ программ"],
              ["Верификация", "100% со ссылками"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3 text-sm text-[rgba(214,207,191,0.78)] last:border-b-0 last:pb-0"
              >
                <span>{label}</span>
                <span className="text-right font-mono uppercase text-accent font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-12 sm:space-y-16">
        {/* SECTION 1: Formal Education & Physical Bedrock */}
        <ScrollReveal>
          <FormalEducationSection />
        </ScrollReveal>

        {/* SECTION 2: Digital Registry of 250+ Courses & Specializations */}
        <ScrollReveal>
          <EducationRegistry />
        </ScrollReveal>
      </div>
    </PageShell>
  );
}
