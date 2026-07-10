export const services = [
  {
    id: "video",
    label: "Видео с нейросетями",
    note: "короткий ролик, объясняющее видео или нейросетевая сцена",
    baseUnit: "короткий ролик / одна сцена",
    basePriceByn: 480,
  },
  {
    id: "visuals",
    label: "Изображения с нейросетями",
    note: "серия изображений, обложки, подборка стиля или концепты",
    baseUnit: "серия до 6 отобранных визуалов",
    basePriceByn: 260,
  },
  {
    id: "assistant",
    label: "Бот или простой помощник",
    note: "простая логика помощника, FAQ, навигация, заявка или эксперимент",
    baseUnit: "рабочий прототип с простой логикой",
    basePriceByn: 650,
  },
  {
    id: "workflow",
    label: "Инструкции для нейросети",
    note: "понятные формулировки задач, сценарии, правила и инструкция",
    baseUnit: "собранный порядок работы с объяснением",
    basePriceByn: 320,
  },
  {
    id: "consulting",
    label: "Консультация",
    note: "разбор задачи, инструмента, идеи, ограничений и реалистичного следующего шага",
    baseUnit: "разбор и план следующего шага",
    basePriceByn: 120,
  },
] as const;

export const sizeOptions = [
  {
    id: "quick",
    label: "Небольшой",
    note: "один результат или короткий разбор",
    multiplier: 0.78,
  },
  {
    id: "standard",
    label: "Стандартный",
    note: "несколько вариантов, отбор и правки",
    multiplier: 1,
  },
  {
    id: "series",
    label: "Серия материалов",
    note: "несколько материалов или несколько сценариев",
    multiplier: 1.48,
  },
] as const;

export const readinessOptions = [
  {
    id: "ready",
    label: "Материалы готовы",
    note: "есть референсы, тексты, ограничения",
    priceAddByn: 0,
  },
  {
    id: "rough",
    label: "Есть наброски",
    note: "нужна сборка структуры",
    priceAddByn: 90,
  },
  {
    id: "blank",
    label: "Нужно с нуля",
    note: "сначала нужен бриф и направление",
    priceAddByn: 180,
  },
] as const;

export const deadlineOptions = [
  {
    id: "calm",
    label: "Спокойно",
    note: "можно работать итеративно",
    multiplier: 1,
  },
  {
    id: "normal",
    label: "Есть срок",
    note: "нужно держать план и контрольные точки",
    multiplier: 1.12,
  },
  {
    id: "rush",
    label: "Срочно",
    note: "быстрая сборка, жесткий отбор, меньше запаса на правки",
    multiplier: 1.35,
  },
] as const;

export const addOns = [
  { id: "script", label: "Сценарий или структура с нуля", priceByn: 90 },
  { id: "variants", label: "Несколько версий под площадки", priceByn: 120 },
  { id: "commercial", label: "Коммерческое использование", priceByn: 80 },
  { id: "handoff", label: "Инструкция после сдачи", priceByn: 70 },
  { id: "integration", label: "Интеграция, бот или внешний сервис", priceByn: 220 },
] as const;

export type ServiceId = (typeof services)[number]["id"];
export type SizeId = (typeof sizeOptions)[number]["id"];
export type ReadinessId = (typeof readinessOptions)[number]["id"];
export type DeadlineId = (typeof deadlineOptions)[number]["id"];
export type AddOnId = (typeof addOns)[number]["id"];

export type PricingSelection = {
  serviceId: ServiceId;
  sizeId: SizeId;
  readinessId: ReadinessId;
  deadlineId: DeadlineId;
  addOnIds: AddOnId[];
};

export function getById<T extends { id: string }>(items: readonly T[], id: string) {
  return items.find((item) => item.id === id) ?? items[0];
}

function roundToNearestTen(value: number) {
  return Math.max(10, Math.round(value / 10) * 10);
}

export function calculateServiceEstimate(selection: PricingSelection) {
  const service = getById(services, selection.serviceId);
  const size = getById(sizeOptions, selection.sizeId);
  const readiness = getById(readinessOptions, selection.readinessId);
  const deadline = getById(deadlineOptions, selection.deadlineId);
  const activeAddOns = addOns.filter((addOn) => selection.addOnIds.includes(addOn.id));
  const addOnsTotalByn = activeAddOns.reduce((sum, addOn) => sum + addOn.priceByn, 0);
  const baseScopeByn = service.basePriceByn * size.multiplier;
  const subtotalByn = baseScopeByn + readiness.priceAddByn + addOnsTotalByn;
  const targetByn = roundToNearestTen(subtotalByn * deadline.multiplier);

  const priceRangeByn = {
    min: roundToNearestTen(targetByn * 0.85),
    target: targetByn,
    max: roundToNearestTen(targetByn * 1.22),
  };

  return {
    service,
    size,
    readiness,
    deadline,
    activeAddOns,
    addOnsTotalByn,
    baseScopeByn: roundToNearestTen(baseScopeByn),
    priceRangeByn,
  };
}
