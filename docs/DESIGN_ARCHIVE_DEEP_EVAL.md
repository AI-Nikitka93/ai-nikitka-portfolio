# DESIGN ARCHIVE DEEP EVAL

Дата проверки: `2026-04-25`

## Что именно было проверено

- `30` отдельных `DESIGN.md`
- contact sheets по `10` большим семействам
- live route check в браузере для текущего `/blog`
- сопоставление с уже живым production-слоем

## Как оценивалось

Каждая система оценивалась не по названию, а по сочетанию:

- visual hierarchy;
- page identity;
- плотности или пустоты;
- различимости маршрутов;
- пригодности для `homepage / proof archive / dossier detail / about / blog / links / operator / scope`.

## Главный вывод

Проблема текущего сайта не в том, что у него “не тот цвет”. Проблема в том, что из архива были взяты в основном:

- палитра;
- шрифты;
- общий dark mood.

Но почти не были перенесены:

- композиционные приемы;
- маршрутная идентичность страниц;
- разный ритм для `about / blog / links / operator / scope`;
- плотность или, наоборот, нужная пустота;
- характер сетки и тип page architecture.

Именно поэтому сайт долго ощущался как один и тот же shell с разными текстами.

---

## 1. `stitch_ai_nikitka93_archive_system`

### `ai_nikitka93_terminal`

Сильные стороны:
- очень ясный terminal/archive mood;
- хороший левый navigation rail;
- убедительная operator-логика;
- strong atmosphere для `operator`, `archive access`, `field notes`.

Слабые стороны:
- может стать слишком узким и мрачным;
- homepage легко уходит в “интерфейс терминала”, а не в сайт;
- перегружает человека, если применять везде.

Вердикт:
- брать для `operator`, частично `field notes`, частично `archive access`;
- не брать как единственный язык всего сайта.

### `monolith_archive`

Сильные стороны:
- сильная музейно-архивная масса;
- хороший вес для `proof archive` и `dossier detail`;
- ощущение важности и тяжести.

Слабые стороны:
- слишком тяжелый;
- на `homepage` и `links` может ощущаться неподвижным;
- местами почти душит контент.

Вердикт:
- брать точечно для `dossier detail`, отдельных hero-панелей и archive slabs;
- не брать для `blog` и не брать как общий rhythm.

---

## 2. `stitch_ai_nikitka93_cinematic_dossier`

### `cine_auteur`

Сильные стороны:
- отличная драматургия заголовков;
- киношный воздух;
- сильный scale contrast;
- хорошо работает на `homepage` и `dossier detail`.

Слабые стороны:
- слабее держит плотные data surfaces;
- проигрывает там, где нужна техническая дисциплина;
- не подходит для `links` и `scope`.

Вердикт:
- брать только как typographic hero-language и detail-page tone;
- не строить на нем весь сайт.

### `noir_technical`

Сильные стороны:
- хороший гибрид кино и техничности;
- сильнее, чем `cine_auteur`, держит operator/dossier surfaces;
- неплохой кандидат для dark proof routes.

Слабые стороны:
- местами уходит в surveillance aesthetic;
- может стать однообразным, если им покрыть все.

Вердикт:
- брать как secondary donor для `dossier detail`, `operator`, `proof archive`;
- не использовать как базовый language для `about` и `blog`.

---

## 3. `stitch_ai_nikitka93_research_archive`

### `academic_archive_1`

Сильные стороны:
- лучший research-poster discipline;
- отличный left-aligned rhythm;
- очень хорош для `blog`, `notes`, `about`, `directory`.

Слабые стороны:
- слишком рациональный для hero;
- без дополнительного акцента может стать сухим.

Вердикт:
- брать для `blog` почти напрямую;
- брать для `about` как structural donor;
- не использовать как единственный mood для homepage.

### `academic_archive_2`

Сильные стороны:
- почти то же, но мягче и легче;
- лучше читается на светлых пустотах и quieter routes;
- хороший материал для calm pages.

Слабые стороны:
- менее цепкий, чем первая версия;
- меньше характера.

Вердикт:
- брать как спокойный донор spacing и card rhythm;
- не брать как основной hero-style.

### `kinetic_grid`

Сильные стороны:
- добавляет движение и modular energy;
- хорошо оживляет `homepage`, `links`, `operator`, `notes`.

Слабые стороны:
- если переборщить, получается слишком “дизайнерский exercise”;
- может мешать читабельности.

Вердикт:
- брать как layer поверх Signal Lab;
- не строить на нем весь route shell.

### `technical_monolith`

Сильные стороны:
- сильная инженерная сухость;
- хорошо работает на proof/data-heavy screens;
- стабильная route geometry.

Слабые стороны:
- эмоционально беднее;
- на широком сайте может быстро наскучить.

Вердикт:
- брать для отдельных technical panels;
- не делать на нем `homepage`.

### `the_archival_void`

Сильные стороны:
- лучший контроль пустоты;
- идеален для `detail`, `about`, `blog article`;
- дает ощущение дорогой тишины.

Слабые стороны:
- на index pages может выглядеть пусто;
- не годится как основной язык archive/homepage.

Вердикт:
- брать для calm routes и spacing discipline;
- не тащить на весь сайт.

---

## 4. `stitch_bento_dossier_archive`

### `ai_nikitka93`

Сильные стороны:
- лучшая плотность и modular richness;
- очень хорош для `homepage`, `proof archive`, `links`, `operator`;
- не дает сайту выглядеть пустым.

Слабые стороны:
- без дисциплины легко превращается в dashboard;
- требует аккуратного hierarchy control.

Вердикт:
- один из главных доноров production-сайта;
- именно его идеи были недовзяты в живую реализацию.

### `kinetic_brutalism`

Сильные стороны:
- сильная сетка;
- жесткий характер;
- хорош для bold editorial/data surfaces.

Слабые стороны:
- быстрее устает глаз;
- может задавить human pages.

Вердикт:
- брать как акцентный structural donor;
- не превращать в глобальную систему.

---

## 5. `stitch_biomorphic_living_interface`

### `bio_digital_fluidity`

Сильные стороны:
- очень сильная “живость”;
- необычные organic fields;
- визуально выделяется на фоне остальных.

Слабые стороны:
- конфликтует с архивной строгостью;
- быстро скатывается в art installation вместо рабочего интерфейса.

Вердикт:
- брать только как background atmosphere;
- не брать в core layout.

### `bio_minimalism_system`

Сильные стороны:
- чище и спокойнее;
- приятен в `about` и `operator` как легкий accent.

Слабые стороны:
- все равно слишком мягок для proof-first бренда.

Вердикт:
- брать только как secondary accent;
- не как базовую систему.

### `deep_pulse`

Сильные стороны:
- сильный glow/energy слой;
- хорош для standout hero или signal state.

Слабые стороны:
- легко превращает интерфейс в “эффект ради эффекта”.

Вердикт:
- брать очень дозированно.

### `ethereal_flow`

Сильные стороны:
- атмосферный;
- красиво размывает жесткость.

Слабые стороны:
- почти не держит technical rigor;
- слишком мягок и абстрактен.

Вердикт:
- не брать в production base.

---

## 6. `stitch_classified_operator_archive`

### `ai_nikitka93`

Сильные стороны:
- очень сильный command-center framing;
- хорошо работает на `homepage`, `archive`, `verifier`, `operator`.

Слабые стороны:
- риск переиграть в “секретную систему”;
- не годится как тон для всех страниц.

Вердикт:
- брать mechanics и page framing, не всю систему.

### `deep_stack`

Сильные стороны:
- агрессивная иерархия;
- хорошие stacked panels и dashboard slabs.

Слабые стороны:
- слишком жесткий;
- на длинном сайте быстро давит.

Вердикт:
- брать частично для data clusters.

### `direct_access`

Сильные стороны:
- отличный links/scope language;
- хорошо делает utility pages осмысленными;
- сильный access/routing feel.

Слабые стороны:
- слишком специфичен для общего сайта;
- header language может быть грубоват.

Вердикт:
- один из лучших доноров для `/links` и `/services-calculator`.

### `radar_grid`

Сильные стороны:
- необычный surveillance/radar aesthetic;
- хорошо выделяется среди остальных.

Слабые стороны:
- чужая palette (`navy / yellow / purple`) конфликтует с брендом;
- уводит в другой продукт.

Вердикт:
- не брать палитру;
- можно брать только отдельные map/radar data patterns.

---

## 7. `stitch_nikitka93_ai_core_archive`

### `core_intelligence_interface`

Сильные стороны:
- аккуратный AI-core mood;
- хорошая layered calm futurism;
- приятен для `operator`, `links`, `about`.

Слабые стороны:
- в мобильной вертикальной версии слишком узкий;
- может стать слишком “app-like”.

Вердикт:
- брать как secondary donor, не как главный base.

### `neural_overload`

Сильные стороны:
- яркий неоновый tech mood;
- хороший material для operator/assistant experimentation.

Слабые стороны:
- слишком mobile-app / cyber UI;
- конфликтует с более зрелым editorial брендом.

Вердикт:
- почти не брать, кроме пары micro-patterns.

---

## 8. `stitch_nikitka93_operator_interface`

### `ai_nikitka93_terminal_system`

Сильные стороны:
- один из лучших terminal systems;
- идеален для `operator`, `dossier detail log view`, `field logs`;
- очень strong page identity.

Слабые стороны:
- для человека “с улицы” может быть слишком суров;
- нельзя растягивать на весь сайт.

Вердикт:
- сильнейший донор для `/ai-assistant`.

### `focused_command`

Сильные стороны:
- чище и спокойнее;
- лучше подходит для реального продукта, чем более экстремальные terminal-версии.

Слабые стороны:
- слабее по характеру, чем другие operator-ветки.

Вердикт:
- хороший донор для production operator surface.

### `high_density_archive`

Сильные стороны:
- очень сильная плотность;
- хорош для `proof archive`, `links`, complex dashboards.

Слабые стороны:
- легко становится перегруженным;
- нужен careful hierarchy.

Вердикт:
- один из лучших доноров плотности после `Bento`.

### `technical_terminal`

Сильные стороны:
- прохладный технический режим;
- хороший компромисс между operator и читаемостью.

Слабые стороны:
- не так выразителен;
- может потеряться на фоне более сильных веток.

Вердикт:
- брать как спокойный technical donor.

---

## 9. `stitch_nikitka93_signal_lab_archive`

### `ai_nikitka93_signal_lab`

Сильные стороны:
- лучший общий закон всего архива;
- самая точная связка editorial + technical + proof-led;
- хорошие screen identities почти для всех маршрутов;
- очень сильный `field_notes_journal`, `homepage_signal_lab`, `links_connect`, `operator_ai_interface`, `proof_archive_index`.

Слабые стороны:
- без помощи `Bento` иногда не хватает плотности;
- в чистом виде иногда слишком “чистый”.

Вердикт:
- это по-прежнему лучший base system для production;
- но он должен работать не один, а в гибриде.

---

## 10. `stitch_spatial_proof_archive`

### `ai_nikitka93_design_system`

Сильные стороны:
- strong spatial archive framing;
- хорошие identity/links/archive/about surfaces;
- более “большой” и архитектурный взгляд.

Слабые стороны:
- если тащить напрямую, сайт станет слишком выставочным;
- less practical for dense reading surfaces.

Вердикт:
- брать как framing donor для hero/archive, не как full base.

### `monolith`

Сильные стороны:
- вес, архитектура, slab feeling;
- хорошо для proof-heavy hero tiles.

Слабые стороны:
- слишком тяжелый и однотонный.

Вердикт:
- брать точечно для featured cards.

### `neuro_glitch_technical_interface`

Сильные стороны:
- нервный tech-edge;
- хороший signal disruption effect.

Слабые стороны:
- glitch быстро устаревает;
- легко становится лишним.

Вердикт:
- не брать как основу.

### `shadow_operator`

Сильные стороны:
- сильная темная spatial/operator vibe;
- интересен для `operator` и `links`.

Слабые стороны:
- слабее в ясности, чем `Signal Lab` и `Operator Interface`.

Вердикт:
- secondary donor only.

---

## Что по факту сильнее всего

### Главные победители

1. `ai_nikitka93_signal_lab`
2. `ai_nikitka93` из `stitch_bento_dossier_archive`
3. `academic_archive_1`
4. `the_archival_void`
5. `ai_nikitka93_terminal_system`
6. `direct_access`
7. `focused_command`

### Что брать обязательно

- из `Signal Lab`: общий закон сайта;
- из `Bento`: плотность и route richness;
- из `Academic Archive`: `blog` и часть `about`;
- из `Archival Void`: calm detail pages и правильный воздух;
- из `Operator Interface`: настоящий характер `/ai-assistant`;
- из `Direct Access`: `/links` и часть `/scope`.

### Что брать очень осторожно

- biomorphic family;
- `neural_overload`;
- `radar_grid`;
- `neuro_glitch`.

---

## Где текущий сайт недобирает по сравнению с архивом

### `/blog`

До последнего rewrite route выглядел как generic shell.
Из архива в нем не было:

- poster-like index;
- больших номерных блоков;
- сильной пустоты как intentional приема;
- journal rhythm.

### `/about`

Проблема была не только в copy, но и в том, что route не перенимал спокойную дисциплину из `Academic Archive` и `Archival Void`.

### `/links`

Сайт до сих пор сильно слабее архивных:

- `links_connect`
- `links_directory`
- `links_route_hub`
- `direct_access`

Именно там у архива были сильные route-specific идеи, которые еще не перенесены до конца.

### `/ai-assistant`

Production пока лучше, чем был, но все еще слабее:

- `operator_ai_interface`
- `ai_nikitka93_terminal_system`
- `focused_command`

Не хватает настоящей console-архитектуры и route-specific density.

### Homepage

Все еще не выжат максимум из:

- `homepage_signal_lab`
- `ai_nikitka93_homepage`
- `v1_homepage_kinetic_grid`

Сейчас база есть, но не хватает той плотности и силы, которую давали эти экраны.

---

## Финальный verdict

Явная ошибка предыдущих итераций была в том, что из папки дизайнов я взял:

- стиль,
- цвет,
- настроение.

Но не взял:

- композицию;
- page identity;
- разный rhythm маршрутов;
- сильные route-specific layouts.

Если доводить сайт до уровня архива, надо делать не “общий polish”, а прямой перенос идей по маршрутам:

1. `homepage` = `Signal Lab + Bento + kinetic grid density`
2. `portfolio` = `Signal Lab + Bento + monolith featured slabs`
3. `dossier detail` = `Signal Lab + Archival Void + terminal evidence rails`
4. `about` = `Academic Archive + Archival Void`
5. `blog` = `Academic Archive + Archival Void`
6. `links` = `Direct Access + links_connect + links_route_hub`
7. `operator` = `AI_Nikitka93 Terminal System + Focused Command`
8. `scope` = `Direct Access + scope_service_layer + project_intake_command`

Это уже не “вкусовщина”, а результат реального визуального сравнения архива с production.
