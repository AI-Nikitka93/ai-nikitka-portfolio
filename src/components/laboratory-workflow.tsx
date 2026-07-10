import React from "react";
import { Brain, Cpu, Search, Wrench, Award, Terminal } from "lucide-react";

export const stepsData = [
  {
    id: "idea",
    index: "01",
    title: "IDEA",
    desc: "Генерация идей и гипотез",
    icon: Brain
  },
  {
    id: "research",
    index: "02",
    title: "RESEARCH",
    desc: "Исследования и анализ",
    icon: Search
  },
  {
    id: "prototype",
    index: "03",
    title: "PROTOTYPE",
    desc: "Прототипирование и тесты",
    icon: Terminal
  },
  {
    id: "train",
    index: "04",
    title: "TRAINING",
    desc: "Обучение моделей и алгоритмов",
    icon: Cpu
  },
  {
    id: "deploy",
    index: "05",
    title: "DEPLOY",
    desc: "Внедрение и масштабирование",
    icon: Wrench
  },
  {
    id: "impact",
    index: "06",
    title: "IMPACT",
    desc: "Реальные результаты и польза",
    icon: Award
  }
] as const;

export function LaboratoryWorkflow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-6">
      {stepsData.map((step, idx) => {
        const Icon = step.icon;
        return (
          <div
            key={step.id}
            className="group relative rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-4 flex flex-col justify-between hover:border-accent/40 transition-colors duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                  {step.index}
                </span>
                <Icon size={16} className="text-titanium group-hover:text-accent transition-colors duration-300" />
              </div>
              <h4 className="mt-3 text-sm font-semibold tracking-wider text-foreground">
                {step.title}
              </h4>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-[rgba(214,207,191,0.64)]">
              {step.desc}
            </p>

            {/* Accent connector arrow for desktop views */}
            {idx < stepsData.length - 1 && (
              <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-accent opacity-40">
                ➔
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
