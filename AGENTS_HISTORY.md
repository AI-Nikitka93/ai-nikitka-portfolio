# История проекта (AGENTS_HISTORY.md)

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
