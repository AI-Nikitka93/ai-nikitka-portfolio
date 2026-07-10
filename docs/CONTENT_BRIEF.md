# CONTENT BRIEF — AI_Nikitka93 Portfolio

**Дата:** 2026-04-21  
**Статус:** VALIDATED — MDX pipeline работает корректно  
**Для:** P-COPY (Copywriter Agent) или ручного копирайтинга  
**Цель:** Создание реального контента для blog и portfolio

---

## ✅ VALIDATION STATUS

**MDX Pipeline:** ✅ WORKING
- Frontmatter парсится корректно через `gray-matter`
- Markdown конвертируется в HTML через `marked`
- Динамические роуты рендерят контент без ошибок
- Build проходит успешно: `npm run build` ✓
- Тестовые файлы созданы и отображаются корректно

**Test files created:**
- `content/blog/test-mdx-pipeline.mdx` → `/blog/test-mdx-pipeline`
- `content/portfolio/test-case-pipeline.mdx` → `/portfolio/test-case-pipeline`

---

## 📁 FILE STRUCTURE

### Blog Posts
**Location:** `content/blog/*.mdx`  
**URL Pattern:** `/blog/[slug]`  
**Supported Extensions:** `.md`, `.mdx`

### Portfolio Cases
**Location:** `content/portfolio/*.mdx`  
**URL Pattern:** `/portfolio/[slug]`  
**Supported Extensions:** `.md`, `.mdx`

---

## 📋 FRONTMATTER SCHEMA

### BLOG POST FRONTMATTER (Required)

```yaml
---
title: string                    # REQUIRED — Заголовок статьи
description: string              # REQUIRED — Мета-описание для SEO
date: string                     # REQUIRED — ISO format: "2026-04-21"
excerpt: string                  # OPTIONAL — Краткое описание (auto-generated if missing)
category: string                 # OPTIONAL — Категория статьи
tags: string[]                   # OPTIONAL — Массив тегов
published: boolean               # OPTIONAL — Default: true
---
```

**Example:**

```yaml
---
title: "RAG в Enterprise: практический опыт внедрения"
description: "Разбор реального кейса внедрения RAG-системы в корпоративную среду: архитектура, проблемы и решения."
date: "2026-03-15"
excerpt: "Как мы внедряли RAG в enterprise и что из этого вышло."
category: "AI Engineering"
tags: ["RAG", "LLM", "Enterprise", "AI"]
published: true
---
```

### PORTFOLIO CASE FRONTMATTER (Required + Extended)

```yaml
---
title: string                    # REQUIRED — Название кейса
description: string              # REQUIRED — Описание для SEO
date: string                     # REQUIRED — ISO format: "2026-04-21"
excerpt: string                  # OPTIONAL — Краткое описание
category: string                 # OPTIONAL — Категория: "AI Video" | "AI Images" | "Agents & Prototypes" | "Hackathons & Experiments"
tags: string[]                   # OPTIONAL — Массив тегов
published: boolean               # OPTIONAL — Default: true

# PORTFOLIO-SPECIFIC FIELDS:
role: string                     # OPTIONAL — Роль в проекте
client: string                   # OPTIONAL — Клиент/организатор
year: string                     # OPTIONAL — Год реализации
tools: string[]                  # OPTIONAL — Использованные инструменты
---
```

**Example:**

```yaml
---
title: "LabStory / Helix — AI-мультфильм для лабораторной тематики"
description: "Анимационный AI-кейс для лабораторной тематики. Победитель конкурса с дипломами за лучший мультфильм и техническое мастерство."
date: "2025-11-20"
excerpt: "AI-мультфильм, получивший 2 диплома на конкурсе LabStory / Helix."
category: "AI Video"
tags: ["AI Video", "Animation", "Competition Winner", "B2B"]
published: true
role: "AI Video Creator & Prompt Engineer"
client: "LabStory / Helix Competition"
year: "2025"
tools: ["Runway Gen-3", "Midjourney", "ChatGPT", "Premiere Pro"]
---
```

---

## 📝 MARKDOWN SUPPORT

### ✅ Supported Elements

**Typography:**
- Headings: `# H1`, `## H2`, `### H3`, `#### H4`
- **Bold**, *italic*, ~~strikethrough~~
- Inline `code`

**Lists:**
- Unordered lists (bullets)
- Ordered lists (numbers)
- Nested lists

**Code Blocks:**
```language
// Syntax highlighting через marked
const example = "code";
```

**Quotes:**
> Blockquotes для цитат

**Links:**
[Link text](https://example.com)

**Horizontal Rules:**
---

**Tables:**
| Column 1 | Column 2 |
|----------|----------|
| Data     | Data     |

### ⚠️ NOT Supported (Yet)

- ❌ JSX components (MDX components не настроены)
- ❌ Image optimization (используй обычный markdown `![alt](url)`)
- ❌ Custom React components
- ❌ Embedded videos (используй ссылки)

### 💡 Workarounds

**Images:**
```markdown
![Описание изображения](/images/portfolio/case-name.jpg)
```
*Note: Изображения должны быть в `public/images/`*

**Videos:**
```markdown
[Смотреть видео на YouTube](https://youtube.com/watch?v=...)
```

---

## 🎯 CONTENT REQUIREMENTS (From Strategy)

### Brand Positioning
- **Tone:** Modest, factual, proof-based
- **Voice:** "Prompt-first AI practitioner" (NOT "AI expert" or "guru")
- **Evidence:** Every claim must be backed by proof (awards, competitions, results)

### Content Boundaries
❌ **DO NOT include:**
- Politics or ideological content
- Personal/family details beyond professional bio
- Grievance narratives
- Invented achievements or exaggerated claims
- "Best", "top", "revolutionary" language

✅ **DO include:**
- Verified achievements (35AWARDS, LabStory/Helix, КИНОМАТИК, MiniMax, hackathons)
- Technical details and tools used
- Honest limitations and constraints
- Practical insights and lessons learned

---

## 📚 REQUIRED CONTENT (Priority Order)

### Phase 1: Flagship Portfolio Cases (HIGH PRIORITY)

**Must-have cases:**

1. **LabStory / Helix** (`labstory-helix.mdx`)
   - Category: "AI Video"
   - Strongest B2B proof
   - 2 diplomas (best animation + technical mastery)
   - Tools: Runway, Midjourney, prompt engineering

2. **КИНОМАТИК** (`kinomatik.mdx`)
   - Category: "AI Video"
   - Top-15 laureate
   - Cultural/historical theme
   - Public recognition

3. **35AWARDS** (`35awards.mdx`)
   - Category: "AI Images"
   - Top 35 in AI nomination
   - Top 35 Belarus & Minsk
   - Top 3% mobile photography
   - 1 work in Catalogue 2024

4. **MiniMax Agent Challenge** (`minimax-agents.mdx`)
   - Category: "Agents & Prototypes"
   - Multiple winning agents
   - Prompt-first prototyping proof

5. **Hackathons Collection** (`hackathons.mdx`)
   - Category: "Hackathons & Experiments"
   - VK RecSys: 68/~800
   - Yandex CodeRun: 104/2090
   - NVIDIA Blackwell: 64/~93, 56.183μs result

### Phase 2: Blog Posts (MEDIUM PRIORITY)

**Recommended topics** (3-5 articles for launch):

1. **"Мой воркфлоу с AI-инструментами"**
   - Practical workflow description
   - Tools and techniques
   - Honest about limitations

2. **"RAG в Enterprise: что реально работает"**
   - Based on actual experience
   - Technical but accessible
   - Proof-based insights

3. **"Prompt engineering: от хаоса к системе"**
   - Systematic approach to prompting
   - Real examples
   - Lessons learned

4. **"Как я попал в Top 35 на 35AWARDS"**
   - Competition experience
   - What worked and what didn't
   - Practical advice

5. **"AI-видео: инструменты и подводные камни"**
   - Tool comparison
   - Workflow insights
   - Realistic expectations

---

## 🚫 CONTENT CONSTRAINTS

### From `docs/PORTFOLIO_STRATEGY.md`:

**Positioning Guardrails:**
- ❌ Не обещать: enterprise-разработку, full-stack delivery, "заменю агентство"
- ❌ Не подчеркивать: политические конфликты, жалобы на рынок, личную трагедию
- ✅ Подчеркивать: доказуемые результаты, самостоятельное освоение, prompt-first метод

**Evidence Discipline:**
- **Observed:** 35AWARDS, LabStory/Helix, Kinomatik, MiniMax, VK RecSys, Yandex CodeRun, NVIDIA hackathon
- **Inferred:** Prompt-first approach, zero-budget mindset, experimental learning
- **Hypothesis:** Services demand will come from AI video + visual concepts + simple agents + consulting

---

## 📐 CONTENT STRUCTURE TEMPLATES

### Blog Post Structure

```markdown
---
[frontmatter]
---

# [Title]

[Opening paragraph — hook and context]

## Контекст / Проблема

[Why this topic matters]

## [Main Section 1]

[Content with examples]

## [Main Section 2]

[Content with examples]

## Что из этого вышло

[Results, lessons learned]

## Выводы

[Key takeaways]

---

**Теги:** [tag1], [tag2], [tag3]
```

### Portfolio Case Structure

```markdown
---
[frontmatter with role, client, year, tools]
---

# [Case Title]

[Brief intro — what this project is about]

## Контекст проекта

**Клиент:** [Client name]  
**Роль:** [Your role]  
**Год:** [Year]  
**Инструменты:** [Tools list]

## Задача

[What needed to be done]

## Процесс работы

### [Phase 1]
[Description]

### [Phase 2]
[Description]

## Ограничения

[Constraints, challenges]

## Результаты

[Achievements, awards, metrics]

## Что этот кейс доказывает

[Why this case matters for positioning]

---

**Категория:** [Category]  
**Теги:** [tags]
```

---

## ✅ VALIDATION CHECKLIST

Before creating content, verify:

- [ ] Frontmatter includes all REQUIRED fields
- [ ] `date` is in ISO format: `"YYYY-MM-DD"`
- [ ] `title` and `description` are unique and descriptive
- [ ] `category` matches approved categories
- [ ] `tags` are relevant and consistent
- [ ] Content tone is modest and factual
- [ ] All claims are backed by evidence
- [ ] No politics, personal details, or exaggerations
- [ ] Markdown syntax is correct
- [ ] File name matches slug pattern: `kebab-case.mdx`

---

## 🔧 TECHNICAL NOTES

### File Naming
- Use kebab-case: `my-article-title.mdx`
- Slug = filename without extension
- URL = `/blog/my-article-title` or `/portfolio/my-article-title`

### Frontmatter Parsing
- Uses `gray-matter` library
- Supports YAML frontmatter only
- Excerpt auto-generated from first 180 chars if not provided

### Markdown Processing
- Uses `marked` library for HTML conversion
- No syntax highlighting configured yet
- No image optimization configured yet

### Build Process
- Static generation at build time via `generateStaticParams()`
- All MDX files are pre-rendered to static HTML
- Changes require rebuild: `npm run build`

---

## 🚀 NEXT STEPS FOR COPYWRITER

1. **Read source materials:**
   - `О никите на 09.04.2026.txt`
   - `Электронные сертификат и обычение за несколько лет.txt`
   - `Статьи из еготелграм канала.txt`

2. **Create flagship portfolio cases** (Priority 1):
   - `content/portfolio/labstory-helix.mdx`
   - `content/portfolio/kinomatik.mdx`
   - `content/portfolio/35awards.mdx`
   - `content/portfolio/minimax-agents.mdx`
   - `content/portfolio/hackathons.mdx`

3. **Create 3-5 blog posts** (Priority 2):
   - Select topics from recommended list
   - Curate from Telegram channel if applicable
   - Ensure tone matches brand positioning

4. **Verify each file:**
   - Run `npm run build` after adding content
   - Check for TypeScript errors
   - Verify frontmatter is complete

5. **Delete test files:**
   - Remove `content/blog/test-mdx-pipeline.mdx`
   - Remove `content/portfolio/test-case-pipeline.mdx`

---

## 📞 HANDOFF CONTACT

**From:** P-41q (Repository Adapter)  
**To:** P-COPY (Copywriter) or Manual Content Creation  
**Status:** ✅ READY FOR CONTENT CREATION  
**Blockers:** None — pipeline validated and working

**Questions?** Refer to:
- `docs/PORTFOLIO_STRATEGY.md` — Full content strategy
- `docs/IMPLEMENTATION_HANDOFF.md` — Production copy skeleton
- `src/lib/mdx.ts` — MDX utility source code
- Test files in `content/` — Working examples
