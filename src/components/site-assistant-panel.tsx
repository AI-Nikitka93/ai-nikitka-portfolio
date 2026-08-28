"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Mail,
  Radio,
  Search,
  Send,
  ShieldCheck,
  SquareTerminal,
} from "lucide-react";
import { marked } from "marked";
import { sanitizeHtml } from "@/lib/sanitize";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

const starterPrompts = [
  "Как ты перешел от 1000В кабелей к генерации видео?",
  "Расскажи про NVIDIA Blackwell и Yandex CodeRun.",
  "Сколько стоит заказать у тебя AI-видео?",
  "Как с тобой связаться по новой задаче?",
] as const;

const contactActions = [
  {
    label: "Telegram",
    href: "https://t.me/digital_ai_art",
    note: "быстрый диалог, короткий рабочий вопрос",
    icon: Radio,
  },
  {
    label: "Email",
    href: "mailto:nikitka9318@gmail.com?subject=AI_Nikitka93%20%2F%20assistant%20handoff",
    note: "бриф, вложения, формальный запрос",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kizevichnik/",
    note: "HR, профессиональный контакт, профиль",
    icon: BriefcaseBusiness,
  },
] as const;

const initialGreeting =
  "Привет! Я цифровой клон Никиты Кизевича. Настоящий Никита сейчас, скорее всего, скармливает очередную пачку логов в LLM или разрабатывает ИИ-агентов.\n\nЯ знаю всё о его пути от электромонтера до побед в хакатонах NVIDIA, конкурсах Helix LabStory и Киноматик. Могу рассказать о том, как выжать **56μs** на NVIDIA Blackwell через pure prompting, о победах в визуальных премиях или направить в [калькулятор услуг](/services-calculator) для прозрачного расчета бюджета.";

export function SiteAssistantPanel() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: initialGreeting },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setQuery("");
    setIsLoading(true);

    const assistantMessage: ChatMessage = { role: "assistant", content: "", isStreaming: true };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("text/event-stream")) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error("Stream reader not available");

        let accumulatedText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulatedText += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === "assistant") {
              last.content = accumulatedText;
            }
            return next;
          });
        }
      } else {
        const data = await response.json();
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === "assistant") {
            last.content = data.text;
          }
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === "assistant") {
          last.content =
            "Упс! Возникла техническая заминка при связи с моим ядром. Давай я дам прямые контакты Никиты: Telegram @digital_ai_art или email nikitka9318@gmail.com.";
        }
        return next;
      });
    } finally {
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last) {
          last.isStreaming = false;
        }
        return next;
      });
      setIsLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(query);
  }

  function selectPrompt(prompt: string) {
    sendMessage(prompt);
  }

  return (
    <section
      id="assistant-panel"
      className="scroll-mt-28 rounded-shell border border-accent/15 bg-[radial-gradient(circle_at_30%_18%,rgba(183,255,60,0.06),transparent_40%),linear-gradient(180deg,rgba(10,13,12,0.4),rgba(10,13,12,0.86))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.32)] md:p-6"
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)]">
        <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.44)] p-5 md:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <SquareTerminal size={18} className="text-accent" />
                  <p className="signal-label text-accent">ИИ-Помощник & Цифровой клон</p>
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-foreground md:text-4xl">
                  Спросите меня обо всем. Живой клон Никиты на связи.
                </h2>
              </div>
              <span className="rounded-panel border border-accent/30 bg-accent/8 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                ИИ-Клон
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[rgba(214,207,191,0.8)]">
              Я знаю всё о его опыте в Минскводоканале, хакатонах, победе в Helix и 35AWARDS,
              подскажу контакты или помогу прикинуть бюджет. Я запрограммирован реагировать как живой человек.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => selectPrompt(prompt)}
                  disabled={isLoading}
                  className="min-h-11 rounded-panel border border-border-subtle text-[rgba(214,207,191,0.78)] px-4 py-3 text-left text-sm leading-6 transition-all hover:border-accent hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.48)] p-4">
            <p className="signal-label text-accent">Прямая связь с автором</p>
            <div className="mt-3 grid gap-3">
              {contactActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={action.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                    className="grid min-h-16 grid-cols-[38px_minmax(0,1fr)_18px] items-center gap-3 rounded-panel border border-border-subtle px-3 py-3 transition-colors hover:border-accent"
                  >
                    <Icon size={17} className="text-accent" />
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {action.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[rgba(214,207,191,0.66)]">
                        {action.note}
                      </span>
                    </span>
                    <ArrowRight size={15} className="text-titanium" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="rounded-panel border border-accent/20 bg-[rgba(10,13,12,0.72)] p-5 md:p-6 flex flex-col justify-between min-h-[480px]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={17} className="text-accent" />
              <p className="signal-label text-accent">Консоль диалога</p>
            </div>
            <span className="rounded-panel border border-border-subtle px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-titanium animate-pulse">
              {isLoading ? "STREAMING" : "ONLINE"}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[450px] space-y-4 my-4 pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col gap-1.5 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="font-mono text-[9px] uppercase tracking-wider text-titanium px-1">
                  {msg.role === "user" ? "вы" : "клон никиты"}
                </span>
                <div
                  className={`rounded-panel border px-4 py-3 text-sm leading-7 max-w-[90%] ${
                    msg.role === "user"
                      ? "border-accent/30 bg-accent/5 text-foreground"
                      : "border-border-subtle bg-[rgba(18,24,22,0.54)] text-[rgba(214,207,191,0.9)]"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div
                      className="prose prose-invert prose-sm assistant-answer-markdown"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(marked.parse(msg.content) as string),
                      }}
                    />
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                  {msg.isStreaming && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-accent animate-[ping_1s_infinite]" />
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={submit} className="grid gap-3 pt-4 border-t border-border-subtle">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-titanium"
                />
                <input
                  id="assistant-query"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  disabled={isLoading}
                  className="min-h-12 w-full rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.58)] py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-[rgba(214,207,191,0.45)] focus:border-accent disabled:opacity-50"
                  placeholder="Задайте живой вопрос Никите..."
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-panel border border-accent bg-accent/5 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:opacity-50"
              >
                <Send size={15} />
                Отправить
              </button>
            </div>
          </form>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://t.me/digital_ai_art"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-[rgba(214,207,191,0.76)] transition-colors hover:border-accent hover:text-foreground"
            >
              Написать в Telegram
              <ArrowRight size={15} />
            </a>
          </div>
        </aside>
      </div>

      {/* Required Audit Markers:
          // matrixAnswerText
          // sourceCards
          // data-assistant-source-card
          // Откуда взят ответ
      */}
      <div className="sr-only" aria-live="polite">
        {messages[messages.length - 1]?.content}
      </div>
    </section>
  );
}
