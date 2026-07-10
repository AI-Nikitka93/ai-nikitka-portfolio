# DESIGN VARIANTS SYNTHESIS

Дата проверки: `2026-04-25`

## Goal

Собрать не один “самый красивый” вариант, а рабочий гибрид из локального дизайн-архива `Версии дизайна сайта`, который усилит production UI без возврата к скучному SaaS-шаблону.

## Source Set

Ключевые источники, изученные по `DESIGN.md` и `screen.png`:

- `Версии дизайна сайта/stitch_nikitka93_signal_lab_archive/`
- `Версии дизайна сайта/stitch_bento_dossier_archive/`
- `Версии дизайна сайта/stitch_biomorphic_living_interface/`
- `Версии дизайна сайта/stitch_classified_operator_archive/`
- `Версии дизайна сайта/stitch_ai_nikitka93_research_archive/`

## Final Ruling

Финальная визуальная база для сайта должна быть не одиночной темой, а связкой:

1. `Signal Lab Archive` как главный фундамент.
2. `Bento Dossier Archive` как источник плотности, модульности и route surfaces.
3. `Biomorphic Living Interface` как очень ограниченный источник глубины и AI-atmosphere.
4. `Classified Operator Archive` как источник command-center framing для отдельных операторских блоков.
5. `The Archival Void` как источник дисциплины пустоты для detail-экранов, но не как общий язык всего сайта.

## What Becomes The Base

### 1. Base System: Signal Lab Archive

Берем как основной visual law:

- черный `Void Black` фон;
- `Phosphor Lime` как высокосигнальный акцент;
- `Archive Bone` для главной типографики;
- `IBM Plex Mono` для metadata и data surfaces;
- жесткие бордеры вместо теней;
- editorial / archive framing;
- верхнюю навигацию как technical masthead;
- крупную типографику hero-блоков;
- терминальные подписи, статусные строки, data labels.

Почему:

- это лучше всего совпадает с уже утвержденной бренд-конституцией;
- это самый сильный anti-SaaS вариант;
- он одинаково хорошо держит и homepage, и archive, и text-backed dossiers.

### 2. Density Layer: Bento Dossier Archive

Берем как вторичный structural donor:

- плотную модульную компоновку главной;
- разноразмерные панели на homepage и archive;
- сильные secondary surfaces для counters, route previews, quick facts;
- более насыщенную сетку для `/links`, `/operator`, `/scope`;
- card hierarchy, где важность задается размером и положением, а не только цветом.

Почему:

- текущему сайту не хватает “наполненности” первого экрана;
- bento-структура хорошо работает для proof-led бренда;
- это дает ощущение сложной рабочей поверхности, а не лендинга.

### 3. Atmosphere Accent: Biomorphic Living Interface

Берем очень дозированно:

- мягкий deep-green ambient glow;
- редкие organic underlays;
- более живые AI-surfaces для `/operator`;
- мягкие световые пятна под важными блоками;
- ощущение “живого сигнала” в фоне.

Чего не брать:

- большие скругления как системное правило;
- glassmorphism как главный язык;
- мягкую friendly-подачу;
- расплывчатые большие organic blobs поверх контента.

Почему:

- полный biomorphic-path конфликтует с архивной строгостью;
- но локальные живые акценты убирают излишнюю сухость интерфейса.

### 4. Tactical Framing: Classified Operator Archive

Берем не палитру, а механику:

- command-strip логику навигации для некоторых secondary sections;
- радарно-операторское ощущение у `/operator` и частично `/links`;
- telemetry framing в data blocks;
- более резкие utility-модули.

Чего не брать:

- navy / purple / yellow palette;
- милитари-перегруз;
- агрессию как основной тон всего сайта.

### 5. Restraint Layer: The Archival Void

Берем точечно:

- более спокойные detail pages;
- больше воздуха вокруг заголовка и metadata на detail route;
- одноплоскостную чистоту для некоторых article-like sections.

Чего не брать:

- пустоту как общий закон homepage;
- чрезмерное визуальное молчание на archive и links surfaces.

## Route-by-Route Synthesis

## Homepage

Базовая модель:

- `Signal Lab` masthead + typography;
- `Bento`-плотность ниже hero;
- редкий biomorphic green atmosphere под главным visual plane.

Что именно брать:

- из `homepage_signal_lab/screen.png`: masthead, hero scale, technical labels, manifesto framing;
- из `ai_nikitka93_homepage/screen.png`: разноразмерные secondary panels, route hub, counters, multi-surface first fold;
- из `homepage_bio_digital_origin/screen.png`: мягкую глубину позади hero plane, но без доминирования rounded glass language.

Итог:

- hero остается editorial и резким;
- под hero добавляется более плотная система модулей;
- первый экран должен выглядеть “богаче” текущего, но не терять архивную дисциплину.

## Proof Archive

Базовая модель:

- `Signal Lab` как semantic shell;
- `Bento` как карточная компоновка.

Что именно брать:

- из `proof_archive_index/screen.png`: massive heading, archive telemetry, text-backed data posters, chronology/log table;
- из `proof_archive/screen.png`: varied card sizes, сочетание visual dossiers и metric-led cards, сильная модульная сетка.

Итог:

- archive не должен быть равномерной сеткой из одинаковых карточек;
- один главный featured dossier может быть wide;
- text-backed dossiers обязаны занимать крупные ячейки и выглядеть как data-editorial hero units;
- нижняя часть страницы может включать auxiliary archive log / chronology strip.

## Dossier Detail

Базовая модель:

- `Signal Lab` typography and metadata discipline;
- `Archival Void` spacing restraint.

Что брать:

- большая title-plane;
- metadata rail;
- спокойная detail hierarchy;
- больше воздуха, чем на index pages.

Итог:

- detail route должен быть менее шумным, чем archive grid;
- text-backed dossier detail должен получать giant metric block и verification rail;
- image-backed dossier detail должен использовать image plate без теней и без glossy card UI.

## Links

Базовая модель:

- `Signal Lab` grid background and masthead;
- `Bento` modular destination cards;
- `Classified Operator` utility feel.

Что брать:

- из `links_connect/screen.png`: directory logic, secure-comms framing, left explanatory rail;
- из `links_directory` family: более модульную структуру destination list.

Итог:

- `/links` должен стать route-hub / secure directory, а не списком социальных кнопок;
- крупные destination slabs;
- отдельная compact contact transmission block возможна как secondary section.

## Operator / AI Assistant

Базовая модель:

- `Signal Lab` terminal-editorial interface;
- `Classified Operator` telemetry widgets;
- `Biomorphic` atmosphere only in background.

Что брать:

- из `operator_ai_interface/screen.png`: research console, report layout, evidence panes;
- из operator-вариантов `bento` и `classified`: utility side blocks and system feel.

Итог:

- это не чат в пузырях;
- это analysis terminal + result board;
- ответ модели должен жить рядом с findings, metadata и evidence panes.

## Field Notes / Blog

Базовая модель:

- `Signal Lab` editorial journal;
- `Archival Void` restraint on article view;
- `Bento` только для index density.

Итог:

- list page может быть плотной и индексной;
- detail article page должна быть чище и спокойнее.

## Scope / Services

Базовая модель:

- `Signal Lab` authority;
- `Bento` for offer modules;
- `Classified` tactical framing for intake steps.

Итог:

- не pricing cards;
- а structured inquiry surface с route-like modules и process framing.

## Verifier / About

Базовая модель:

- `Signal Lab` typography;
- `Archival Void` calmer spacing.

Итог:

- более человеческая, но все еще строгая страница;
- меньше плотности, больше доверия и структуры.

## Hard Rejections

Что нельзя тащить в production:

- чужие палитры `purple / yellow / navy` из `Classified Operator`;
- общий glassmorphism-first язык из biomorphic-ветки;
- чрезмерные rounded cards как системную норму;
- слишком пустую museum-like тишину из `The Archival Void` на homepage и archive;
- generic dashboard-иконки и SaaS-кнопки.

## Implementation Priority

Если переносить сильные части в живой сайт, приоритет такой:

1. Усилить homepage через `Signal Lab + Bento`.
2. Перестроить `/links` как secure directory / route hub.
3. Сделать `/operator` более сильным analysis-console surface.
4. Перебалансировать `/portfolio` в сторону varied dossier hierarchy.
5. Успокоить detail routes, добавив `Archival Void` spacing discipline.

## One-Line Design Law

`Signal Lab` задает язык, `Bento` дает массу, `Biomorphic` дает жизнь, `Classified` дает нерв, `Archival Void` дает дисциплину.
