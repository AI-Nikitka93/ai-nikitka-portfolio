export const siteConfig = {
  name: "AI_Nikitka93",
  shortName: "AI_Nikitka93",
  title: "AI_Nikitka93 — портфолио работ и проектов",
  description:
    "Портфолио Никиты Кизевича (AI_Nikitka93): вайбкодинг сайтов, веб-сервисы, генеративные медиа и автоматизация прикладных задач с помощью нейросетей.",
  url: "https://kizevich.com",
  locale: "ru_BY",
  ogImage: "/opengraph-image",
  lastUpdated: "2026-06-05",
};

function formatRussianDate(isoDate: string) {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

export const siteFreshnessLabel = formatRussianDate(siteConfig.lastUpdated);

export const navigation = [
  { href: "/", label: "ГЛАВНАЯ", shortLabel: "ГЛАВНАЯ" },
  { href: "/about", label: "ОБО МНЕ", shortLabel: "ОБО МНЕ" },
  { href: "/portfolio", label: "ПРОЕКТЫ", shortLabel: "ПРОЕКТЫ" },
  { href: "/lab", label: "ЛАБОРАТОРИЯ", shortLabel: "ЛАБОРАТОРИЯ" },
  { href: "/blog", label: "СТАТЬИ", shortLabel: "СТАТЬИ" },
  { href: "/awards-credentials", label: "НАГРАДЫ", shortLabel: "НАГРАДЫ" },
  { href: "/links", label: "КОНТАКТЫ", shortLabel: "КОНТАКТЫ" },
] as const;

export const utilityNavigation = [
  { href: "/en", label: "English", shortLabel: "EN" },
  { href: "/privacy", label: "Приватность", shortLabel: "Privacy" },
] as const;

export const staticRoutes = [
  "/",
  "/career-path",
  "/portfolio",
  "/lab",
  "/about",
  "/blog",
  "/services-calculator",
  "/ai-assistant",
  "/links",
  "/awards-credentials",
  "/en",
  "/privacy",
];

