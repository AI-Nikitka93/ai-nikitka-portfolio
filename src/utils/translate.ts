export type Lang = "ru" | "en";

export const translations = {
  ru: {
    // Navigation / Header
    navArtists: "Артисты",
    navCatalog: "Каталог",
    navTimeline: "Таймлайн",
    navStatus: "Публикация",
    portfolioTitle: "AI Nikitka93",
    portfolioSubtitle: "Музыкальное портфолио",

    // Hero
    heroOverline: "ПРОДЮСЕРСКИЙ ЦЕНТР // CATALOG SHOWCASE",
    heroTitle: "Живой каталог артистов, альбомов и релизных линий.",
    heroSubtitle: "Восемь уникальных музыкальных веток под одним продюсерским штабом: от multilingual pop и academic classical до Indian devotional, Chinese pop, Bossa Nova и Arabic organic house.",
    ctaOpenCatalog: "Открыть каталог",
    ctaViewArtists: "Смотреть артистов",

    // Stats
    statArtists: "АРТИСТА",
    statReleases: "РЕЛИЗОВ",
    statTracks: "ТРЕКОВ",
    statLatest: "ПОСЛЕДНИЙ",

    // Controls / Filters
    sortBy: "СОРТИРОВКА:",
    sortNewest: "СНАЧАЛА НОВЫЕ ↓",
    sortOldest: "СНАЧАЛА СТАРЫЕ ↑",
    searchPlaceholder: "Поиск по названию релиза или трека...",
    allGenres: "Все жанры",
    allArtists: "Все артисты",

    // Section Titles
    sectionArtistsTitle: "ВИРТУАЛЬНЫЙ ШТАБ // ARTISTS ROSTER",
    sectionArtistsHeading: "ШТАБ ВИРТУАЛЬНЫХ АРТИСТОВ",
    sectionCatalogTitle: "ПОЛНЫЙ КАТАЛОГ // RELEASES",
    sectionCatalogHeading: "ИЗДАНИЯ И ТРЕКЛИСТЫ",
    sectionTimelineTitle: "ХРОНОЛОГИЯ ИЗДАНИЙ // RELEASES TIMELINE",
    sectionTimelineHeading: "ХРОНОЛОГИЯ КАТАЛОГА",
    timelineYear: "ГОД",
    timelineDate: "ДАТА",
    timelineRelease: "НАЗВАНИЕ РЕЛИЗА",
    timelineArtist: "ИСПОЛНИТЕЛЬ",
    timelineGenre: "ЖАНР",
    timelineAction: "ДЕЙСТВИЕ",
    timelineView: "Смотреть",

    // Spotlight / Player
    spotlightTitle: "В ФОКУСЕ // DEEP DIVE",
    spotlightSubtitle: "Детальный обзор релиза, трекинг и история создания.",
    noSpotlight: "Выберите релиз из каталога или хронологии для детального изучения.",
    releaseType: "Тип релиза",
    releaseDate: "Дата выхода",
    releaseGenre: "Жанр",
    composer: "Композитор",
    language: "Язык исполнения",
    tracksTitle: "ТРЕКЛИСТ // TRACKLIST",
    aboutRelease: "ИСТОРИЯ РЕЛИЗА // ABOUT",

    // Footer
    footerStatus: "PUBLICATION STATUS",
    footerReadyText: "Готово как локальная витрина каталога.",
    footerBody: "Этот ресурс является официальным портфолио продюсера AI Nikitka93. Данные в каталоге, включая дискографии, метаданные и обложки, соответствуют внутренним стандартам дистрибьютора FreshTunes по состоянию на июль 2026 года. Внешние ссылки ведут на демонстрационные материалы, аудиозаписи размещены локально.",
    footerBackToReleases: "Вернуться к релизам",
    footerSnapshot: "Каталог обновлен: 05.06.2026",
  },
  en: {
    // Navigation / Header
    navArtists: "Artists",
    navCatalog: "Catalog",
    navTimeline: "Timeline",
    navStatus: "Status",
    portfolioTitle: "AI Nikitka93",
    portfolioSubtitle: "Music Portfolio",

    // Hero
    heroOverline: "PRODUCTION CENTER // CATALOG SHOWCASE",
    heroTitle: "Live catalog of virtual artists, albums, and release lanes.",
    heroSubtitle: "Eight unique musical directions under a single production staff: from multilingual pop and academic classical to Indian devotional, Chinese pop, Bossa Nova, and Arabic organic house.",
    ctaOpenCatalog: "Open Catalog",
    ctaViewArtists: "View Artists",

    // Stats
    statArtists: "ARTISTS",
    statReleases: "RELEASES",
    statTracks: "TRACKS",
    statLatest: "LATEST RELEASE",

    // Controls / Filters
    sortBy: "SORT BY:",
    sortNewest: "NEWEST FIRST ↓",
    sortOldest: "OLDEST FIRST ↑",
    searchPlaceholder: "Search by release or track title...",
    allGenres: "All Genres",
    allArtists: "All Artists",

    // Section Titles
    sectionArtistsTitle: "VIRTUAL STAFF // ARTISTS ROSTER",
    sectionArtistsHeading: "VIRTUAL ARTISTS ROSTER",
    sectionCatalogTitle: "COMPLETE CATALOG // RELEASES",
    sectionCatalogHeading: "RELEASES & TRACKLISTS",
    sectionTimelineTitle: "CHRONOLOGY // RELEASES TIMELINE",
    sectionTimelineHeading: "CATALOG CHRONOLOGY",
    timelineYear: "YEAR",
    timelineDate: "DATE",
    timelineRelease: "RELEASE TITLE",
    timelineArtist: "ARTIST",
    timelineGenre: "GENRE",
    timelineAction: "ACTION",
    timelineView: "View",

    // Spotlight / Player
    spotlightTitle: "SPOTLIGHT // DEEP DIVE",
    spotlightSubtitle: "Detailed release overview, tracking, and production history.",
    noSpotlight: "Select a release from the catalog or timeline for a deep dive.",
    releaseType: "Release Type",
    releaseDate: "Release Date",
    releaseGenre: "Genre",
    composer: "Composer",
    language: "Vocal Language",
    tracksTitle: "TRACKLIST // TRACKLIST",
    aboutRelease: "ABOUT THE RELEASE // ABOUT",

    // Footer
    footerStatus: "PUBLICATION STATUS",
    footerReadyText: "Ready as a local catalog showcase.",
    footerBody: "This resource is the official music portfolio of the producer AI Nikitka93. Catalog data, including discographies, metadata, and cover art, complies with FreshTunes distributor standards as of July 2026. External links point to demonstration materials, audio files are hosted locally.",
    footerBackToReleases: "Back to Releases",
    footerSnapshot: "Catalog snapshot: 05.06.2026",
  }
};

export function t(key: keyof typeof translations.ru, lang: Lang): string {
  return translations[lang][key];
}

// Artist localizations
export const artistTranslations = {
  "nikitka-ai": {
    lane: { ru: "Мультиязычный поп / сезонный AI-поп", en: "Multilingual pop / seasonal AI-pop" },
    shortLane: { ru: "Поп", en: "Pop" },
    core: { ru: "Русский, французский, английский поп; сезонные и экспериментальные релизы.", en: "Russian, French, English pop; seasonal and experimental releases." },
    role: { ru: "Главная смешанная поп-линия каталога.", en: "Main mixed pop line of the catalog." }
  },
  "nikita-kizevich": {
    lane: { ru: "Классика / камерная / киномузыка", en: "Classical / chamber / cinematic miniatures" },
    shortLane: { ru: "Классика", en: "Classical" },
    core: { ru: "Академическая, хоровая, камерная, симфоническая и кинематографическая музыка.", en: "Academic, choral, chamber, symphonic and cinematic music." },
    role: { ru: "Классическая музыка.", en: "Classical music." }
  },
  "nikitaal": {
    lane: { ru: "Этническая музыка / Азия / индийские мотивы", en: "World Music / Asia / Hindi-inspired" },
    shortLane: { ru: "Этника / Азия", en: "World / Asia" },
    core: { ru: "Индийская музыка, азиатские мотивы, этно-поп и духовные песнопения.", en: "Indian and Asian ethno-pop music inspired by Hindi and devotional themes." },
    role: { ru: "Индийская и азиатская этно-поп линия.", en: "Indian and Asian ethno-pop line." }
  },
  "niko-xian": {
    lane: { ru: "Китайский поп / C-pop", en: "Chinese-language pop / C-pop" },
    shortLane: { ru: "C-pop", en: "C-pop" },
    core: { ru: "Китайский поп, песни на китайском языке и неоновый сити-поп.", en: "Chinese-language pop and neon city pop direction." },
    role: { ru: "Линия китайской поп-музыки.", en: "Chinese pop-music line." }
  },
  "nkvis": {
    lane: { ru: "Кибер-техно-поп / K-techno / джерси-клаб", en: "Cyber-Techno-Pop, K-Techno, Choral Jersey Club" },
    shortLane: { ru: "K-pop / K-техно", en: "K-Pop / K-Techno" },
    core: { ru: "Виртуальная кибер-дива, существующая в цифровом зазеркалье Нео-Сеула.", en: "Virtual cyber-diva existing in the digital mirror-world of Neo-Seoul." },
    role: { ru: "Виртуальный K-Pop артист.", en: "Virtual K-Pop artist." }
  },
  "kezevix": {
    lane: { ru: "Электро-брейкс / дарксинт / индастриал-техно", en: "Electro-breaks, Darksynth, Industrial Techno" },
    shortLane: { ru: "Электроника / Техно", en: "Electronic / Techno" },
    core: { ru: "Виртуальный электро-техно продюсер, диджей и саунд-дизайнер.", en: "Virtual electro-techno producer, DJ, and sound designer." },
    role: { ru: "Инструментальная электронная ветка каталога.", en: "Instrumental electronic branch of the catalog." }
  },
  "niquiano": {
    lane: { ru: "Латиноамериканская / испанская музыка", en: "Latin / Spanish music" },
    shortLane: { ru: "Латина", en: "Latin" },
    core: { ru: "Испанская музыка и латиноамериканские акустические гитарные баллады.", en: "Spanish music and Latin-American acoustic guitar compositions." },
    role: { ru: "Латиноамериканская ветка каталога.", en: "Latin-American branch of the catalog." }
  },
  "nita-kizevich": {
    lane: { ru: "Арабский поп / органик-хаус", en: "Arabic Pop, Organic House, Acoustic Tarab" },
    shortLane: { ru: "Арабский поп", en: "Arabic Pop" },
    core: { ru: "Арабская музыка, ближневосточное поп-слияние, Organic House.", en: "Arabic music, Middle-Eastern pop fusion, Organic House." },
    role: { ru: "Арабская ветка каталога.", en: "Arabic branch of the catalog." }
  }
};

export function translateArtist(artist: any, field: "lane" | "shortLane" | "core" | "role", lang: Lang): string {
  const artId = artist.id as keyof typeof artistTranslations;
  if (artistTranslations[artId] && artistTranslations[artId][field]) {
    return artistTranslations[artId][field][lang];
  }
  return artist[field] || "";
}

// Metadata translations
export const metadataTranslations = {
  // Types
  "Сингл": { ru: "Сингл", en: "Single" },
  "Single": { ru: "Сингл", en: "Single" },
  "Альбом": { ru: "Альбом", en: "Album" },
  "Album": { ru: "Альбом", en: "Album" },
  "EP": { ru: "EP", en: "EP" },
  "Сборник": { ru: "Сборник", en: "Compilation" },
  "Compilation": { ru: "Сборник", en: "Compilation" },
  
  // Genres
  "Pop": { ru: "Поп", en: "Pop" },
  "Classical": { ru: "Классика", en: "Classical" },
  "World": { ru: "Этника", en: "World" },
  "Electronic": { ru: "Электроника", en: "Electronic" },
  "Latin": { ru: "Латина", en: "Latin" },
  "Arabic": { ru: "Арабская", en: "Arabic" },

  // Languages
  "арабский": { ru: "арабский", en: "Arabic" },
  "английский": { ru: "английский", en: "English" },
  "испанский": { ru: "испанский", en: "Spanish" },
  "корейский": { ru: "корейский", en: "Korean" },
  "русский": { ru: "русский", en: "Russian" },
  "китайский": { ru: "китайский", en: "Chinese" },
  "хинди": { ru: "хинди", en: "Hindi" },
  "японский": { ru: "японский", en: "Japanese" },
  "французский": { ru: "французский", en: "French" },
  "португальский": { ru: "португальский", en: "Portuguese" },
};

export function translateMeta(value: string, lang: Lang): string {
  const val = value as keyof typeof metadataTranslations;
  if (metadataTranslations[val]) {
    return metadataTranslations[val][lang];
  }
  return value;
}
