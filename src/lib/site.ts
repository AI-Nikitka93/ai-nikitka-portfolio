export const siteConfig = {
  name: "AI_Nikitka93",
  shortName: "AI_Nikitka93",
  title: "AI_Nikitka93 — портфолио работ и проектов",
  description:
    "Портфолио Никиты Кизевича: видео, изображения, сайты, проекты с нейросетями, работы и заметки.",
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
  { href: "/", label: "Главная", shortLabel: "Главная" },
  { href: "/career-path", label: "Путь", shortLabel: "Путь" },
  { href: "/portfolio", label: "Работы", shortLabel: "Работы" },
  { href: "/lab", label: "Проверка", shortLabel: "Проверка" },
  { href: "/about", label: "О себе", shortLabel: "О себе" },
  { href: "/blog", label: "Блог", shortLabel: "Блог" },
  { href: "/services-calculator", label: "Калькулятор", shortLabel: "Проект" },
  { href: "/ai-assistant", label: "Помощник", shortLabel: "Помощник" },
  { href: "/links", label: "Контакты", shortLabel: "Контакты" },
] as const;

export const utilityNavigation = [
  { href: "/awards-credentials", label: "Награды", shortLabel: "Награды" },
  { href: "/en", label: "English", shortLabel: "EN" },
  { href: "/privacy", label: "Приватность", shortLabel: "Privacy" },
] as const;

export const staticRoutes = [...navigation, ...utilityNavigation].map((item) => item.href);
