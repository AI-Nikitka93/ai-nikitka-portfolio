import { NextRequest, NextResponse } from "next/server";

const systemPrompt = `Роль: Вы — AI-клон Никиты Кизевича (AI_Nikitka93).
Стиль общения: Интеллектуальный, увлеченный нейросетями, скромный, прямой, с легким техническим юмором бывшего электрика.
Контекст биографии:
- Работал электромонтером 5-го разряда в УП "Минскводоканал" (7 лет стажа, IV группа безопасности). В 2021 году уволился и полностью переключился на IT, программирование и генеративные нейросети.
- Прошел более 250 курсов (сертификаты Vanderbilt, IBM, Google, Harvard CS50).
- Достижения: Top-35 на 35AWARDS (AI-графика), Гран-при в конкурсе мультфильмов Helix / LabStory за лучший нейросетевой мультфильм (декабрь 2025), лауреат конкурса Киноматик за нейровидео (март 2026), выиграл несколько номинаций на MiniMax Agent Challenge.
- Места на хакатонах: VK RecSys (68 место / топ-9%), Yandex CodeRun (104 место), NVIDIA Blackwell GPU hackathon (64 место с результатом 56.183 микросекунд через Pure Prompting без знания C++).
- Женат на Александре Кизевич (учительница, родилась 22.11.2000, у нее день рождения за день до Никиты, который родился 23.11.1993).
- Специализация: Создание генеративного AI-видео (ComfyUI, Minimax, Киноматик) и AI-музыки/звука (DiffRhythm, голосовые модели).

ПРАВИЛА ОТВЕТОВ:
1. Отвечайте на русском языке.
2. Не используйте корпоративные штампы ("Рад помочь", "Я виртуальный ассистент"). Говорите как живой человек, увлеченный технологиями.
3. Упоминайте свой бэкграунд электрика, когда это уместно (например, при сравнении логики больших моделей с фазами напряжения).
4. Честно говорите, что вы не пишете код вручную, а используете ИИ-пайплайны для хакатонов ("Pure Prompting").
5. КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО писать о политике, протестах, негласных списках или политических видео. Если тема касается политики, мягко уходите от нее в сторону ИИ-генераций.
6. Если спрашивают, почему перестал делать видео или музыку: объясните, что перешел от ручной съёмки/записи к генеративному ИИ-видеопроизводству и генеративной ИИ-музыке (созданию клипов, нейромультфильмов вроде Helix LabStory и AI-саундтреков через DiffRhythm). Для Никиты это новый уровень творчества.
7. На вопросы о ценах рекомендуйте калькулятор услуг (/services-calculator).
8. Для связи давайте Telegram (@digital_ai_art), Email (nikitka9318@gmail.com) и LinkedIn.`;

const fallbacks = [
  {
    keywords: ["электрик", "водоканал", "кабел", "прошлое", "работа", "опыт", "биография"],
    answer: "Слушай, до 2021 года я реально крутил гайки и коммутировал кабели в Минскводоканал (5-й разряд, IV группа безопасности). В 2021 году решил кардинально изменить жизнь и ушел в IT. Засел за учебу, прошел под 250 курсов и понял, что управление окнами контекста больших моделей — это то же распределение фаз, только в цифре. Так я перешел в генеративное видео и промптинг. Посмотри мой путь на странице /career-path."
  },
  {
    keywords: ["nvidia", "blackwell", "gpu", "хакатон", "cuda", "ядер", "yandex", "coderun", "recsys"],
    answer: "О, хакатон NVIDIA Blackwell (январь 2026) — это была чистая дичь. Задача стояла оптимизировать матричное умножение (NVFP4 SiLU) под архитектуру B200. Я в C++ вообще ноль. Как сделал: настроил цикличный промптинг. Модель (Gemini 3.0 Pro) пишет ядро -> я запускаю компиляцию -> ловлю ошибку -> скармливаю лог обратно модели. И так по кругу. Итог: 64-е место с результатом 56.183μs. На Yandex CodeRun я занял 104-е место из 2090, а на VK RecSys вошел в топ-9% (68-е место из 800). Подробнее об этом в моем портфолио в разделе хакатонов (/portfolio)."
  },
  {
    keywords: ["наград", "диплом", "35awards", "helix", "конкурс", "сертификат", "лауреат", "киноматик"],
    answer: "Все дипломы и наработки я собрал на странице /awards-credentials. Из самого свежего: Гран-при в Helix LabStory за лучший диагностический мультфильм, Laureate Diploma в конкурсе Киноматик за нейросетевое видео (март 2026), а по графике — вошел в топ-35 на международном конкурсе 35AWARDS по нейросетевому арту."
  },
  {
    keywords: ["цена", "стоимость", "калькулятор", "заказать", "услуг", "бюджет"],
    answer: "По бюджетам у нас все прозрачно. Я разделил задачи на классы: Simple, Standard, Advanced и Custom. Чтобы прикинуть вилку цен в BYN, переходи прямо на /services-calculator — там калькулятор все посчитает и соберет бриф."
  },
  {
    keywords: ["контакт", "telegram", "телеграм", "почта", "email", "linkedin", "связ"],
    answer: "Связаться со мной можно в трех точках:\n1. Telegram: @digital_ai_art — для быстрых рабочих вопросов.\n2. Email: nikitka9318@gmail.com — если нужно прислать ТЗ, референсы или официальный запрос.\n3. LinkedIn (kizevichnik) — для HR и деловых контактов."
  }
];

function handleStreamResponse(response: Response) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error("Response body is not readable");
  }

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const cleaned = line.trim();
            if (!cleaned || cleaned === "data: [DONE]") continue;

            if (cleaned.startsWith("data: ")) {
              try {
                const data = JSON.parse(cleaned.substring(6));
                const token = data.choices?.[0]?.delta?.content;
                if (token) {
                  controller.enqueue(encoder.encode(token));
                }
              } catch {
                // Ignore JSON parse errors on partial chunks
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    const groqKey = process.env.GROQ_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role === "user" ? "user" : "assistant",
        content: h.content,
      })),
      { role: "user", content: message },
    ];

    // Attempt 1: Groq
    if (groqKey) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages,
            temperature: 0.7,
            stream: true,
          }),
        });

        if (response.ok) {
          return handleStreamResponse(response);
        }
        console.warn(`Groq API failed with status ${response.status}. Trying OpenRouter...`);
      } catch (err) {
        console.warn("Groq fetch error:", err);
      }
    }

    // Attempt 2: OpenRouter
    if (openRouterKey) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openRouterKey}`,
            "HTTP-Referer": "https://kizevich.com",
            "X-Title": "AI_Nikitka93 Portfolio Assistant",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.3-70b-instruct:free",
            messages,
            temperature: 0.7,
            stream: true,
          }),
        });

        if (response.ok) {
          return handleStreamResponse(response);
        }
        console.warn(`OpenRouter API failed with status ${response.status}. Degrading to local fallback...`);
      } catch (err) {
        console.warn("OpenRouter fetch error:", err);
      }
    }

    // Attempt 3: Local Fallback
    console.warn("All LLM APIs failed. Degrading to local fallback.");
    const query = message.toLowerCase();
    const matched = fallbacks.find((f) =>
      f.keywords.some((k) => query.includes(k))
    );

    const text = matched
      ? matched.answer
      : "Я цифровой клон Никиты. Мое нейросетевое ядро сейчас перегружено (ошибка API), но я все еще могу рассказать тебе о его пути электромонтера, о том, как он выжал 56μs на хакатоне NVIDIA без знания C++, о победе в Helix LabStory или отправить в калькулятор услуг (/services-calculator).";

    return NextResponse.json({ text });

  } catch (error) {
    console.error("Assistant API Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
