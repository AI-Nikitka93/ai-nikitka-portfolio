import React from "react";
import { GraduationCap, Zap, Terminal, CheckCircle2, ShieldCheck } from "lucide-react";
import { formalEducationList } from "@/lib/education-data";

export function FormalEducationSection() {
  return (
    <section className="space-y-6" aria-labelledby="formal-edu-heading">
      <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">
              ФИЗИЧЕСКИЙ & ИНЖЕНЕРНЫЙ ФУНДАМЕНТ
            </span>
          </div>
          <h2 id="formal-edu-heading" className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Базовое инженерно-техническое образование
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-panel border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[11px] text-accent">
          <ShieldCheck size={14} />
          <span>Дипломы и допуски</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {formalEducationList.map((item) => {
          const iconMap = {
            mgkso: GraduationCap,
            minskvodokanal: Zap,
            rcttu: Terminal,
          };
          const Icon = iconMap[item.id as keyof typeof iconMap] || GraduationCap;

          return (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.04),rgba(18,24,22,0.85)_40%,rgba(10,13,12,0.95))] p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(183,255,60,0.08)]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-panel border border-accent/30 bg-accent/10 text-accent group-hover:border-accent group-hover:bg-accent/20 transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="rounded-[4px] border border-border-subtle bg-[rgba(10,13,12,0.6)] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-titanium">
                    {item.years}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold leading-snug text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <div className="mt-2.5 inline-block rounded border border-accent/20 bg-accent/5 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                  {item.qualification}
                </div>

                <p className="mt-2 text-xs font-mono text-titanium leading-relaxed">
                  {item.specialty}
                </p>

                <p className="mt-3.5 text-xs text-[rgba(214,207,191,0.82)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border-subtle/50 pt-3 text-[11px] font-mono text-titanium">
                <span className="text-[10px] uppercase tracking-wider">{item.type}</span>
                <span className="flex items-center gap-1 text-accent font-semibold">
                  <CheckCircle2 size={12} />
                  <span>Верифицировано</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
