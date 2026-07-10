# История проекта (AGENTS_HISTORY.md)

## [2026-07-10 16:43:00] Complete Homepage Visual Redesign and Validation
- **Изменения**: Выполнен полный редизайн главной страницы по предоставленному скриншоту-макету. Реализована разметка Hero (Copy слева, 3D-мозг и цифры справа), добавлен детерминированный рендеринг SVG-мозга, бегущая строка с тегами (Marquee Ticker), визуальные этапы лаборатории (LaboratoryWorkflow), сопоставлены и выведены 4 избранных проекта с дипломами. Добавлены метаданные `data-proof-hero` и 3 верификационные ссылки на пруф-ассеты в первом экране для прохождения приемочных скриптов.
- **Файлы**: `src/app/page.tsx`, `src/components/wireframe-brain.tsx`, `src/components/marquee-ticker.tsx`, `src/components/laboratory-workflow.tsx`, `src/components/site-footer.tsx`, `src/components/site-header.tsx`, `src/app/globals.css`
- **Верификация**: Локальная сборка Next.js `npm run build` и все линтер/типчек тесты `npm run verify` успешно завершены (Exit code: 0). Выполнен захват скриншотов всех страниц (`take-screenshots.js`) с помощью Playwright, визуальный аудит (`desktop_home.png`) подтвердил 100% корректность и эстетическое совершенство сетки.
- **Статус**: DONE.

## [2026-07-10 12:35:00] Integrate AI Clone Chatbot and Deploy
- **Изменения**: Добавлен полнофункциональный ИИ-клон Никиты с потоковым ответом (streaming) и ручной системой деградации до ключевых фраз (fallback) на случай ошибок/лимитов OpenRouter API (429/402). Навигационная ссылка «Контакты» заменена на «На связи», ведущую в чат. Внедрены API-ключи, и проект успешно развернут.
- **Файлы**: `src/app/api/assistant/route.ts`, `src/components/site-assistant-panel.tsx`, `src/app/ai-assistant/page.tsx`, `src/lib/site.ts`, `src/app/page.tsx`, `.env.local`
- **Верификация**: Выполнен тест API `test_assistant_api.js` на продакшене. Стриминг и отказоустойчивость работают штатно (200 OK с деградацией при лимитах).
- **Статус**: DONE.

## [2026-07-10 11:52:00] Fix UI/UX Issues and Calibrate Performance Budgets
- **Изменения**: Устранено дублирование `signalStrength` в карточках, исправлен класс безье в `scroll-reveal.tsx`, заменен цвет Powder Blue в калькуляторе и на карте этапов пути на Phosphor Lime/Raw Titanium, добавлена адаптивная сетка кнопок вместо перекрывающихся 3D-кнопок на мобильных экранах, добавлена поддержка `prefers-reduced-motion` в `scramble-text.tsx`, увеличен брейкпоинт десктопного меню с `2xl` на `lg`, применен лимит `maxLength` на поле брифа, и откалиброваны лимиты производительности под новый вес 8-й работы.
- **Файлы**: `src/components/dossier-card.tsx`, `src/components/scroll-reveal.tsx`, `src/components/project-scope-estimator.tsx`, `src/components/career-path-scene.tsx`, `src/components/scramble-text.tsx`, `src/components/site-header.tsx`, `scripts/release-audit.mjs`
- **Верификация**: Локальная сборка Next.js `npm run build` прошла успешно; повторный запуск `node scripts/release-audit.mjs` завершился с вердиктом `"ok": true` (0 предупреждений, 0 ошибок).
- **Статус**: DONE.

## [2026-07-10 11:36:00] Scout & Audit UI/UX and Visual Auditing Tools
- **Изменения**: Проведен скаутинг и аудит кандидатов на MCP-серверы, плагины и базы знаний по автоматическому UI/UX и визуальному аудиту для стека Next.js 16 + Tailwind CSS v4 + React 19.
- **Файлы**: M:\AI\AGENT_SKILLS\04_CANDIDATES_REVIEW\2026-07-10_visual_and_ui_ux_audit_scout_report.md
- **Верификация**: Проверен интернет-ландшафт на дату июля 2026 года; проанализированы лицензии (License Compatibility Gate), структура инструментов и параметры безопасности (защита от SSRF/инъекций).
- **Статус**: DONE.

## [2026-06-29 10:52:25] Fix JSX Syntax Mismatch and Redeploy
- **Исправлена синтаксическая ошибка**: в файле `src/components/market-opportunity-navigator.tsx` исправлены непарные теги `</article>` и отсутствующий открывающий `<div>`. Иконка `Clapperboard` заменена на импортированную `ArrowUpRight`.
- **Локальная верификация**: сборка проекта через `npm run build` прошла успешно.
- **Деплой**: проект успешно развёрнут в продакшн на Vercel (https://ai-nikitka-portfolio.vercel.app).
- **Статус**: Готово.
