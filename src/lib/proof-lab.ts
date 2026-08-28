export type FlagshipProofCase = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  image: string;
  year: string;
  role: string;
  tools: readonly string[];
  result: string;
  evidence: string;
  outcome: string;
  sourceTraceUpgrade: string;
  verificationUrl?: string;
  verificationLabel?: string;
};

export const flagshipProofCases: readonly FlagshipProofCase[] = [
  {
    id: "kinomatik",
    slug: "sig-04-kinomatik-laureate-neurovideo-competition",
    title: "КИНОМАТИК",
    shortTitle: "КИНОМАТИК",
    eyebrow: "конкурс / 2026",
    image: "/proof-assets/sig-04-kinomatik.jpg",
    year: "2026",
    role: "Генерация видеокадров и монтаж",
    tools: ["нейросети", "монтаж", "саунд-дизайн"],
    result: "Диплом лауреата",
    evidence: "Официальный диплом",
    outcome: "Короткометражный ролик вошел в число 15 лучших работ международного конкурса цифрового искусства.",
    sourceTraceUpgrade: "Архив исходных генераций и проектный файл монтажа.",
    verificationUrl: "https://sputnik.by/20260305/itogi-mezhdunarodnogo-konkursa-tsifrovogo-iskusstva-kinomatik-1104859378.html",
    verificationLabel: "Сюжет на Sputnik Беларусь",
  },
  {
    id: "helix-film",
    slug: "sig-02-labstory-helix-best-animated-film",
    title: "LabStory / Helix",
    shortTitle: "Helix: фильм",
    eyebrow: "конкурс / 2025",
    image: "/proof-assets/sig-02-helix-film.png",
    year: "2025",
    role: "Создание видеоряда и монтаж",
    tools: ["генеративные видеомодели", "монтаж"],
    result: "Гран-при «Лучший фильм»",
    evidence: "Диплом победителя",
    outcome: "Анимационный ролик о лабораторной диагностике занял 1-е место на корпоративном творческом конкурсе.",
    sourceTraceUpgrade: "Презентационные материалы и исходные видеофайлы.",
    verificationUrl: "https://smartpress.by/news/nagrada-za-kreativ-v-helix-podveli-itogi-konkursa-animatsionnykh-i-multiplikatsionnykh-filmov-o-labo/",
    verificationLabel: "Новость на Smartpress",
  },
  {
    id: "35awards",
    slug: "sig-01-35awards-ai-imaging-field-results",
    title: "35AWARDS",
    shortTitle: "35AWARDS",
    eyebrow: "фотоконкурс / 2025-2026",
    image: "/proof-assets/sig-01-35awards-2026.jpg",
    year: "2025-2026",
    role: "Создание визуальных образов",
    tools: ["генеративное искусство", "промпт-инжиниринг"],
    result: "ТОП-35 авторов",
    evidence: "Официальные сертификаты",
    outcome: "Работы в номинации «Фото, созданные ИИ» получили высокую оценку жюри, 9 работ прошли в финальные этапы.",
    sourceTraceUpgrade: "PDF-сертификаты и прямая ссылка на профиль участника.",
    verificationUrl: "https://35awards.com/10th/author/nikita650/",
    verificationLabel: "Профиль 35AWARDS",
  },
  {
    id: "helix-tech",
    slug: "sig-03-labstory-helix-technical-mastery",
    title: "LabStory / Helix",
    shortTitle: "Helix: техника",
    eyebrow: "отдельный диплом / 2025",
    image: "/proof-assets/sig-03-helix-tech.png",
    year: "2025",
    role: "Постпродакшн",
    tools: ["цветокоррекция", "апскейлинг"],
    result: "Диплом «За техническое мастерство»",
    evidence: "Профильный диплом",
    outcome: "Специальная награда за качество обработки кадров и чистоту монтажа видеоряда.",
    sourceTraceUpgrade: "Скриншоты таймлайна и исходные файлы обработки.",
    verificationUrl: "https://smartpress.by/news/nagrada-za-kreativ-v-helix-podveli-itogi-konkursa-animatsionnykh-i-multiplikatsionnykh-filmov-o-labo/",
    verificationLabel: "Новость на Smartpress",
  },
];

export type SupportingProofHighlight = {
  readonly id: string;
  readonly title: string;
  readonly status: string;
  readonly image: string;
  readonly issuer: string;
  readonly date: string;
  readonly metric: string;
  readonly note: string;
  readonly pdfUrl?: string;
};

export const supportingProofHighlights: readonly SupportingProofHighlight[] = [
  {
    id: "35awards-season-11",
    title: "35AWARDS XI — номинация нейрофото",
    status: "свежий сертификат",
    image: "/proof-assets/sig-01-35awards-2026.jpg",
    issuer: "35AWARDS",
    date: "2026-06-01",
    metric: "2 photo in TOP 35",
    note:
      "В 11th 35AWARDS 3 из 93 авторских фото дошли до третьей фазы, 2 вошли в best 35 в номинации с нейросетевыми изображениями.",
  },
  {
    id: "digital-marathon-2026",
    title: "Цифровой марафон 2026",
    status: "дополнительный результат",
    image: "/proof-assets/support-01-digital-marathon-2026.jpg",
    issuer: "Сбер / Школа 21 / Нетология",
    date: "2026-05-15",
    metric: "45 место / 278 из 510",
    note:
      "Категория «Исследователь», 45 место (278 баллов из 510). Этапы: обучение 35/35, тест 96/100, проектный этап 130/150.",
  },
  {
    id: "amd-developer-hackathon-2026",
    title: "AMD Developer Hackathon 2026",
    status: "сертификат участия",
    image: "/proof-assets/support-07-amd-hackathon-2026.jpg",
    issuer: "AMD Developer Cloud / LabLab.ai",
    date: "2026-05-10",
    metric: "успешная сдача решения",
    note:
      "Сертификат CMQHZY14G02KTS601KPV3CW9B. Разработка ИИ-решения. Стек: AMD Developer Cloud, AMD ROCm, HuggingFace Spaces/Hub, Qwen3, LangChain, AgentOps.",
    pdfUrl: "/proof-assets/support-07-amd-hackathon-2026.pdf",
  },
  {
    id: "russian-house-2026",
    title: "Диплом Россотрудничества (Русский дом)",
    status: "диплом лауреата",
    image: "/proof-assets/support-02-russian-house-2026.jpg",
    issuer: "Россотрудничество",
    date: "2026-03-05",
    metric: "Лауреат I степени",
    note: "Диплом за работу «Партизаны» на Международном конкурсе цифрового искусства «КИНОМАТИК» в номинации «Нейросетевое видео».",
    pdfUrl: "/proof-assets/support-02-russian-house-2026.pdf",
  },
  {
    id: "unique-eurasia-2026",
    title: "Диплом «Уникальная Евразия»",
    status: "диплом за креатив",
    image: "/proof-assets/support-03-unique-eurasia-2026.jpg",
    issuer: "Уникальная Евразия",
    date: "2026-03-05",
    metric: "Специальная награда",
    note: "Диплом за творческий подход и креативность в конкурсе «КИНОМАТИК» (за создание глубокого визуального образа в нейровидео).",
    pdfUrl: "/proof-assets/support-03-unique-eurasia-2026.pdf",
  },
  {
    id: "kinomatic-gratitude-2026",
    title: "Благодарность оргкомитета КИНОМАТИК",
    status: "благодарственное письмо",
    image: "/proof-assets/support-04-kinomatik-gratitude-2026.jpg",
    issuer: "Ассоциация цифрового искусства / Киноматик",
    date: "2026-03-05",
    metric: "Официальное признание",
    note: "Благодарственное письмо за вклад в развитие нейросетевого искусства и участие в финальном показе фестиваля.",
    pdfUrl: "/proof-assets/support-04-kinomatik-gratitude-2026.pdf",
  },
  {
    id: "minsk-photo-2018",
    title: "Диплом Минского фотоконкурса",
    status: "историческая награда",
    image: "/proof-assets/support-06-minsk-photo-2018.jpg",
    issuer: "Минский городской исполнительный комитет",
    date: "2018-09-08",
    metric: "Победитель (Фотография)",
    note: "Диплом за активное участие в городском фотоконкурсе. Подтверждает долгосрочный интерес к композиции и визуальной эстетике.",
    pdfUrl: "/proof-assets/support-06-minsk-photo-2018.pdf",
  },
  {
    id: "my-rodny-kut-2013",
    title: "Грамота «Мой родны кут»",
    status: "историческая награда",
    image: "/proof-assets/support-05-my-rodny-kut-2013.jpg",
    issuer: "Белорусский союз художников / БРСМ",
    date: "2013-01-03",
    metric: "Лауреат конкурса",
    note: "Грамота выставки-конкурса фоторабот молодых художников. Свидетельствует о начале творческого пути в области визуального искусства.",
    pdfUrl: "/proof-assets/support-05-my-rodny-kut-2013.pdf",
  },
  {
    id: "35awards-neurophoto-100-years",
    title: "35AWARDS — Мир через 100 лет",
    status: "BEST Photographer",
    image: "/proof-assets/sig-01-35awards.jpg",
    issuer: "35AWARDS",
    date: "2025",
    metric: "ТОП-10 фотографий",
    note:
      "Сертификат No. 35-1006-1342690. Работа вошла в 10 лучших фото конкурса по голосованию. Автор вошел в BEST лучших фотографов.",
  },
  {
    id: "35awards-season-10-category-files",
    title: "35AWARDS — категории 10-го сезона",
    status: "дополнительные сертификаты",
    image: "/proof-assets/sig-01-35awards-living-creatures.jpg",
    issuer: "35AWARDS",
    date: "2025",
    metric: "Living Creatures / Undocumented Events / Landscape",
    note:
      "Эти файлы подтверждают отдельные категории 35AWARDS и остаются дополнительными документами.",
  },
  {
    id: "coderun-winter-challenge",
    title: "Зимний алгоритмический марафон CodeRun",
    status: "104 место из 2090",
    image: "/proof-assets/support-01-digital-marathon-2026.jpg",
    issuer: "CodeRun / LLM Reasoning",
    date: "2026-02-15",
    metric: "104 место из 2090 участников",
    note:
      "21-дневный марафон сложных алгоритмических задач. Решение задач теории чисел и вычислительной геометрии через многошаговую декомпозицию и строгий промпт-инжиниринг.",
  },
  {
    id: "carebridge-navigator-devpost",
    title: "CareBridge Navigator (HealthTech / UN SDG 3)",
    status: "Honorable Mention",
    image: "/proof-assets/support-07-amd-hackathon-2026.jpg",
    issuer: "Devpost / PresentMe Academy",
    date: "2026-08-15",
    metric: "Exceptional Performance Distinction",
    note:
      "Международный хакатон по цифровому здоровью (485 участников). Построение модульной концепции цифровой навигации в MedTech с автоматизированным анализом архитектуры.",
  },
  {
    id: "legaltech-problem-solving",
    title: "Прикладной LegalTech & AI-анализ норм права",
    status: "практическое решение",
    image: "/proof-assets/support-02-russian-house-2026.jpg",
    issuer: "LLM + Python / ReportLab",
    date: "2025–2026",
    metric: "100% результативность",
    note:
      "Анализ градостроительных нормативов и стандартов защиты прав потребителей через LLM. Генерация юридически строгих досудебных обращений и регламентных документов.",
  },
] as const;

export const labExperimentTracks = [
  {
    id: "proof-scanner",
    title: "Первые работы для просмотра",
    status: "можно смотреть",
    lane: "главный вход",
    href: "/#proof-scanner",
    summary:
      "Быстрый вход в четыре работы с дипломами и понятными итогами: что было сделано, где участвовал и чем подтверждается.",
    next: "Добавлять новые материалы после просмотра файла, скриншота или публичной ссылки.",
  },
  {
    id: "case-spine",
    title: "Короткая схема работы",
    status: "можно смотреть",
    lane: "структура",
    href: "/portfolio",
    summary:
      "Страницы работ читаются одинаково: что сделал, с чем работал, какой итог и чем это подтверждается.",
    next: "Расширять только при появлении прямых файлов, скриншотов или публичных ссылок.",
  },
  {
    id: "assistant-source-cards",
    title: "Помощник по сайту",
    status: "можно смотреть",
    lane: "навигация",
    href: "/ai-assistant",
    summary:
      "Помощник ведет к работам, калькулятору, контактам и странице о Никите.",
    next: "Перед подключением внешней нейросети нужно описать источники, логи и приватность.",
  },
  {
    id: "source-trace-upgrade",
    title: "Что еще можно подтвердить сильнее",
    status: "нужны материалы",
    lane: "ожидает материалы",
    href: "/portfolio#text-backed",
    summary:
      "Для VK, NVIDIA и MiniMax нужны личные скриншоты, файлы или прямые публичные ссылки.",
    next: "Добавить личные скриншоты VK/NVIDIA/MiniMax только после проверки, что их можно публично показывать.",
  },
] as const;

export const assistantSourceCards = [
  {
    id: "portfolio-proof",
    title: "Работы и подтверждения",
    href: "/portfolio",
    label: "8 работ",
    note: "Восемь страниц с работами, датами, результатами и понятными подтверждениями.",
  },
  {
    id: "flagship-cases",
    title: "С чего начать",
    href: "/#proof-scanner",
    label: "4 работы",
    note: "КИНОМАТИК, Helix и 35AWARDS: дипломы, даты и страницы работ.",
  },
  {
    id: "pricing-scope",
    title: "Калькулятор услуг",
    href: "/services-calculator",
    label: "BYN",
    note: "Ориентир бюджета, валютный пересчет и короткий бриф перед прямым контактом.",
  },
  {
    id: "contact-handoff",
    title: "Контакты",
    href: "/links",
    label: "Telegram / email",
    note: "Куда писать по конкретной задаче или отдельному вопросу.",
  },
] as const;
