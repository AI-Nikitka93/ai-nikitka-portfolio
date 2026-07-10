"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Send, X, MessageSquare } from "lucide-react";
import { marked } from "marked";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

const initialGreeting =
  "Привет! Я цифровой клон Никиты. Задай мне любой вопрос: о его пути от электрика к нейросетям, хакатонах или о том, как связаться с ним.";

export function FloatingChat() {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: initialGreeting },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isExpanded]);

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
            "Произошла ошибка связи. Можешь написать мне в Telegram @digital_ai_art или на почту nikitka9318@gmail.com.";
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

  if (!mounted) return null;

  return (
    <>
      {/* 1. Floating Trigger Bubble */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-accent/25 bg-[rgba(10,13,12,0.88)] p-2 pr-4 backdrop-blur-md transition-all duration-300 hover:border-accent hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          aria-label="Открыть чат с ИИ-клоном"
        >
          {/* Pulsing Core Indicator */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(18,24,22,0.8)] border border-border-subtle">
            <span className="absolute h-4 w-4 rounded-full bg-accent/30 animate-ping" />
            <span className="h-2.5 w-2.5 rounded-full z-10 bg-accent animate-pulse" />
          </div>

          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-titanium leading-none mb-1">
              КЛОН // ОНЛАЙН
            </span>
            <span className="text-xs font-semibold leading-none text-accent">
              ЧАТ-ИИ
            </span>
          </div>
        </button>
      )}

      {/* 2. Expanded Chat overlay panel */}
      {isExpanded && (
        <aside className="fixed bottom-6 right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[500px] rounded-shell border border-accent/20 bg-[radial-gradient(circle_at_30%_18%,rgba(183,255,60,0.06),transparent_40%),linear-gradient(180deg,rgba(10,13,12,0.92),rgba(10,13,12,0.98))] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-between animate-[fadeIn_0.2s_ease-out]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-accent" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                ИИ-Клон Никиты
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-titanium hover:text-foreground transition-colors p-1"
              aria-label="Закрыть чат"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 my-3 pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col gap-1 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="font-mono text-[8px] uppercase tracking-wider text-titanium px-1">
                  {msg.role === "user" ? "вы" : "клон"}
                </span>
                <div
                  className={`rounded-panel border px-3 py-2 text-xs leading-6 max-w-[90%] ${
                    msg.role === "user"
                      ? "border-accent/30 bg-accent/5 text-foreground"
                      : "border-border-subtle bg-[rgba(18,24,22,0.54)] text-[rgba(214,207,191,0.9)]"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div
                      className="prose prose-invert prose-xs assistant-answer-markdown"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(msg.content) as string,
                      }}
                    />
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                  {msg.isStreaming && (
                    <span className="inline-block w-1 h-3 ml-1 bg-accent animate-ping" />
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Form input */}
          <form onSubmit={submit} className="flex gap-2 pt-3 border-t border-border-subtle">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
              className="flex-1 min-h-10 rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.58)] px-3 text-xs text-foreground outline-none transition-colors placeholder:text-[rgba(214,207,191,0.45)] focus:border-accent disabled:opacity-50"
              placeholder="Спросите о Никите..."
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-panel border border-accent bg-accent/5 text-foreground transition-colors hover:bg-accent/15 disabled:opacity-50"
            >
              <Send size={14} />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
