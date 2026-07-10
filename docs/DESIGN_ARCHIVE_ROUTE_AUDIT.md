# DESIGN ARCHIVE ROUTE AUDIT

Дата проверки: `2026-04-25`

## Scope

Проверка выполнена по двум слоям:

- локальный дизайн-архив `Версии дизайна сайта`;
- живой сайт на `http://127.0.0.1:3000` через in-app browser.

Инвентаризация архива:

- семейств дизайна: `10`
- `DESIGN.md`: `30`
- `screen.png`: `236`

Живые маршруты, проверенные в браузере:

- `/`
- `/portfolio`
- `/portfolio/sig-06-vk-recsys-top-9-percent`
- `/links`
- `/ai-assistant`
- `/services-calculator`
- `/about`
- `/blog`
- `/awards-credentials`

## Executive Verdict

Текущий production уже не “пустой” и не сломанный, но он действительно все еще слишком ровный. Главная проблема не в цветах и не в шрифтах. Главная проблема в том, что слишком много маршрутов используют один и тот же structural chassis:

- один и тот же masthead;
- один и тот же hero-box;
- одинаковую плотность верхнего экрана;
- схожий rhythm модулей;
- похожую степень “тихости”.

Из-за этого страницы читаются как вариации одной заготовки, а не как разные среды внутри одного archive-system.

## Family Review

### 1. `stitch_nikitka93_signal_lab_archive`

Сильнейшее семейство как базовый закон проекта.

Что работает:

- masthead как technical editorial header;
- огромная типографика без SaaS-романтики;
- grid-background + mono metadata;
- archive / dossier / verifier / links выглядят как части одной системы, но с разной page identity.

Что брать в production:

- homepage hero discipline;
- proof archive as curated index, а не просто grid;
- verifier page как dossier-like human file;
- links как secure directory, а не набор иконок.

Вердикт: это главный эталон, относительно которого текущий production пока недобирает.

### 2. `stitch_bento_dossier_archive`

Лучший донор плотности и page richness.

Что работает:

- высокая информационная плотность без скатывания в хаос;
- разноразмерные модули;
- более живая first fold архитектура;
- отдельные utility surfaces для secondary routes.

Что брать:

- homepage below-hero density;
- proof archive card variety;
- links / scope / operator как более насыщенные operational surfaces.

Чего не брать:

- слишком generic dashboard-подачу там, где нужна editorial severity.

Вердикт: лучший structural booster для текущего сайта.

### 3. `stitch_classified_operator_archive`

Лучший источник operator / route / directory mechanics.

Что работает:

- links page выглядит как реальный routing table;
- operator и scope получают command-center gravity;
- блоки telemetry и status дают ощущение machine surface.

Чего не брать:

- чужую mil-spec агрессию как тон всего бренда;
- чрезмерную one-note жесткость.

Вердикт: брать локально для `/links`, `/ai-assistant`, `/services-calculator`.

### 4. `stitch_biomorphic_living_interface`

Полезно только как атмосферный донор.

Что работает:

- живой deep-green glow;
- ощущение сигнала и “дышащего” пространства;
- более сильный emotional layer в hero.

Что ломает систему:

- слишком много rounded / blob logic;
- слишком мягкий контур для proof-led бренда;
- ослабление архивной строгости.

Вердикт: годится только как background accent, не как main language.

### 5. `stitch_ai_nikitka93_research_archive`

Самое зрелое семейство по breadth и page coverage.

Что работает:

- есть полноценные home / archive / detail / scope / notes / verifier вариации;
- `the_archival_void` дает хорошую дисциплину для detail pages;
- high-contrast и grid-серии полезны как alternate route identities.

Чего не хватает:

- часть веток слишком музейные и слишком “тихие” для homepage.

Вердикт: это хороший second-opinion family, особенно для `/about`, `/blog`, detail pages.

### 6. `stitch_nikitka93_ai_core_archive`

Хорош для operator / dashboard / console logic.

Что работает:

- mobile-like shell logic;
- AI-core framing;
- data-surfaces и compact telemetry.

Риск:

- легко уйти в generic futuristic UI.

Вердикт: частичный донор для compact dashboards и assistant surfaces.

### 7. `stitch_nikitka93_operator_interface`

Сильный терминальный pipeline, особенно для AI assistant.

Что работает:

- operator as log-view and query-result interface;
- clear utility framing;
- strong mono rhythm.

Риск:

- легко увести весь проект в одну terminal-joke эстетику.

Вердикт: брать частями, не как общий стиль.

### 8. `stitch_ai_nikitka93_cinematic_dossier`

Очень полезен как reminder про scale и drama.

Что работает:

- hero и dossier detail получают cinematic emphasis;
- image-led pages выглядят дорого.

Риск:

- если сделать этим всю систему, text-backed evidence ослабнет.

Вердикт: использовать как scale reference, не как system base.

### 9. `stitch_ai_nikitka93_archive_system`

Хороший technical archive fallback.

Что работает:

- monolith-like archive behavior;
- operator console;
- archive request framing.

Вердикт: уступает `Signal Lab` и `Research Archive`, но полезен как запасной донор technical framing.

### 10. `stitch_spatial_proof_archive`

Полезен скорее как exploration-layer.

Что работает:

- spatial mood;
- research direction для более иммерсивных сцен.

Что не готово как база:

- семейство слишком фрагментировано и не дает такого ясного route-law, как `Signal Lab`.

Вердикт: полезно как future experimental layer, не как immediate production source.

## Route-By-Route Review Against Current Site

### `/`

Текущее состояние:

- strong headline уже есть;
- identity split считывается;
- shell работает;
- но first fold все еще слишком близок к “one hero inside one card”.

Чем архив лучше:

- `Signal Lab` homepage дает гораздо более жесткий masthead and manifesto law;
- `Bento` homepage дает насыщение ниже hero;
- `Biomorphic` дает живой ambient field.

Что делает текущую главную скучной:

- hero и secondary panels живут слишком в одном масштабе;
- нет ощущения, что homepage — это entrance surface;
- нижний слой не создает достаточной многоуровневой работы глаза.

Вердикт: `6.5/10`. Работает, но не доминирует.

### `/portfolio`

Текущее состояние:

- copy сильнее, чем раньше;
- archive rule и narrative уже есть;
- route читабелен.

Чем архив лучше:

- `proof_archive_index` из `Signal Lab` дает featured plate + metric card + chronology strip;
- `Bento proof_archive` дает реальную иерархию карточек.

Что делает текущий архив скучнее, чем должен быть:

- first fold все еще слишком text-led;
- featured dossier не доминирует физически;
- chronology / archive log не вынесены как самостоятельный surface;
- text-backed dossiers еще можно усилить размером и неожиданной компоновкой.

Вердикт: `7/10`. Уже не пусто, но еще не “вау”.

### `/portfolio/[slug]`

Текущее состояние:

- detail route стал чище;
- status localization уже живая;
- text-backed dossier работает лучше, чем раньше.

Чем архив лучше:

- `Signal Lab detail` и `Archival Void detail` дают больше контраста между title-plane и metadata rail;
- cinematic family лучше держит visual drama.

Что пока не идеально:

- detail page все еще слишком похожа на общую коробочную логику;
- giant metric block для text-backed dossier должен звучать громче;
- нужен более самостоятельный proof layout, а не просто content card.

Вердикт: `7/10`. Хороший базовый уровень, но еще без собственного ритуала раскрытия.

### `/links`

Текущее состояние:

- route уже перестроен в directory, а не в social icons wall;
- смысловая логика верная.

Чем архив лучше:

- `classified_operator_archive/07_links` и `signal_lab_archive/links_connect` делают links page настоящим routing table;
- у них крупные destination slabs и отдельный transmission surface.

Что у нас скучнее:

- текущий экран still reads as “good editorial page”, not as “secure route hub”;
- слишком мягкая плотность;
- destination cards могут быть крупнее и жестче;
- transmission block должен быть самостоятельным, а не просто обычным section.

Вердикт: `6.5/10`. Правильное направление, но еще не хватает operator tension.

### `/ai-assistant`

Текущее состояние:

- route уже не выглядит как generic chatbot landing;
- copy framing правильный.

Чем архив лучше:

- `operator_ai_interface` и operator families дают analysis terminal feel;
- there is output board, telemetry, evidence panes, query discipline.

Что делает текущий route недостаточно сильным:

- верхний экран все еще слишком похож на остальные content routes;
- пока нет полноценного “console + report + evidence” page physics;
- operator должен быть отдельным инструментом, а не еще одной editorial page.

Вердикт: `6/10`. Здесь biggest gap.

### `/services-calculator`

Текущее состояние:

- pricing-card SaaS trap avoided;
- route framed as briefing surface.

Чем архив лучше:

- `scope_services` и `classified scope` дают more tactical intake logic;
- there is clearer step structure and operational staging.

Что у нас пока скучно:

- page still reads as explanatory text-first route;
- не хватает staged inquiry modules;
- нет ощущения mission intake / routing / packet definition.

Вердикт: `6/10`. Смысл хороший, физика страницы слабее.

### `/about`

Текущее состояние:

- самый явный unfinished route.

Что найдено в живом браузере:

- mix RU/EN в hero и body;
- страница пока ближе к placeholder shell, чем к finished verifier surface.

Чем архив лучше:

- `verifier_about` из `Signal Lab` и `Research Archive` делает human layer доказательной и строгой;
- there is proper identity file structure.

Вердикт: `4/10`. Нужен отдельный полный rewrite под verifier-file logic.

### `/blog`

Текущее состояние:

- functional empty state есть;
- route wired correctly.

Проблема:

- визуально и языково это пока служебная страница, а не `Field Notes` surface;
- mix RU/EN тоже заметен.

Чем архив лучше:

- `field_notes_journal`, `field_notes_index`, `recovered_field_notes` дают route identity;
- notes index может быть очень красивым даже без большого объема контента.

Вердикт: `4.5/10`. Сейчас это working shell, а не сильная страница.

### `/awards-credentials`

Текущее состояние:

- route still reads like reserve page;
- language drift persists;
- visual identity secondary.

Вердикт: `4/10`. Либо full rewrite, либо route should stay hidden until properly designed.

## Why The Current Site Still Feels Boring

Пять причин:

1. Слишком много routes используют один hero-card pattern.
2. Маршруты недостаточно разведены по page physics.
3. `links`, `operator`, `scope` пока еще слишком похожи на “content pages”, а не на инструменты.
4. Вторичный слой (`about`, `blog`, `awards-credentials`) не доведен и тянет вниз общее впечатление.
5. В живом production все еще недостаточно bento-density и archive telemetry surfaces.

## Immediate Design Ruling

Следующий кодовый проход должен брать максимум из архива так:

- `/` = `Signal Lab masthead + Bento first fold density + restrained green ambient field`
- `/portfolio` = `Signal Lab archive logic + Bento card hierarchy + chronology strip`
- `/portfolio/[slug]` = `Signal Lab detail + Archival Void spacing + giant metric block for text-backed dossiers`
- `/links` = `Signal Lab secure directory + Classified routing slabs`
- `/ai-assistant` = `operator_ai_interface + terminal report board + telemetry sidepanes`
- `/services-calculator` = `scope_services + tactical step framing`
- `/about` = `verifier file`
- `/blog` = `field notes journal`
- `/awards-credentials` = `background shelf`, not quasi-placeholder page

## Priority Order

1. Rewrite `/about`, `/blog`, `/awards-credentials` because they are the weakest and still language-drifting.
2. Strengthen `/ai-assistant` into a real console/report surface.
3. Strengthen `/links` and `/services-calculator` with harder route-specific mechanics.
4. Rebuild homepage lower fold and `/portfolio` hierarchy with more bento density and archive log surfaces.

