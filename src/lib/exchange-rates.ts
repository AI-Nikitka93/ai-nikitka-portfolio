export type CurrencyCode = "BYN" | "USD" | "EUR" | "RUB" | "PLN";
export type ExchangeRateStatus = "live" | "fallback" | "mixed";

export type ExchangeRate = {
  code: CurrencyCode;
  name: string;
  scale: number;
  officialRate: number;
  bynPerUnit: number;
  amountPerByn: number;
};

export type ExchangeRatesResponse = {
  base: "BYN";
  date: string;
  source: string;
  sourceUrl: string;
  status: ExchangeRateStatus;
  rates: Record<CurrencyCode, ExchangeRate>;
};

type NbrbRate = {
  Cur_ID: number;
  Date: string;
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
};

export const NBRB_RATES_URL = "https://api.nbrb.by/exrates/rates?periodicity=0";
const source = "Национальный банк Республики Беларусь";
const targetCurrencies: CurrencyCode[] = ["BYN", "USD", "EUR", "RUB", "PLN"];

export const fallbackRates: ExchangeRatesResponse = {
  base: "BYN",
  date: "2026-06-02T00:00:00",
  source,
  sourceUrl: NBRB_RATES_URL,
  status: "fallback",
  rates: {
    BYN: {
      code: "BYN",
      name: "Белорусский рубль",
      scale: 1,
      officialRate: 1,
      bynPerUnit: 1,
      amountPerByn: 1,
    },
    USD: {
      code: "USD",
      name: "Доллар США",
      scale: 1,
      officialRate: 2.7698,
      bynPerUnit: 2.7698,
      amountPerByn: 1 / 2.7698,
    },
    EUR: {
      code: "EUR",
      name: "Евро",
      scale: 1,
      officialRate: 3.2269,
      bynPerUnit: 3.2269,
      amountPerByn: 1 / 3.2269,
    },
    RUB: {
      code: "RUB",
      name: "Российский рубль",
      scale: 100,
      officialRate: 3.8563,
      bynPerUnit: 3.8563 / 100,
      amountPerByn: 1 / (3.8563 / 100),
    },
    PLN: {
      code: "PLN",
      name: "Злотый",
      scale: 10,
      officialRate: 7.6202,
      bynPerUnit: 7.6202 / 10,
      amountPerByn: 1 / (7.6202 / 10),
    },
  },
};

function isCurrencyCode(value: string): value is CurrencyCode {
  return targetCurrencies.includes(value as CurrencyCode);
}

function normalizeRate(rate: NbrbRate): ExchangeRate | null {
  if (!isCurrencyCode(rate.Cur_Abbreviation) || rate.Cur_Abbreviation === "BYN") {
    return null;
  }

  if (rate.Cur_Scale <= 0 || rate.Cur_OfficialRate <= 0) {
    return null;
  }

  const bynPerUnit = rate.Cur_OfficialRate / rate.Cur_Scale;

  return {
    code: rate.Cur_Abbreviation,
    name: rate.Cur_Name,
    scale: rate.Cur_Scale,
    officialRate: rate.Cur_OfficialRate,
    bynPerUnit,
    amountPerByn: 1 / bynPerUnit,
  };
}

export async function getExchangeRates(): Promise<ExchangeRatesResponse> {
  const response = await fetch(NBRB_RATES_URL, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 21_600,
    },
    signal: AbortSignal.timeout(4_500),
  });

  if (!response.ok) {
    throw new Error(`NBRB exchange-rate request failed with HTTP ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload)) {
    throw new Error("NBRB exchange-rate response is not an array");
  }

  const rates: Record<CurrencyCode, ExchangeRate> = { ...fallbackRates.rates };
  let liveCount = 0;
  let date = fallbackRates.date;

  for (const item of payload as NbrbRate[]) {
    const normalizedRate = normalizeRate(item);
    if (!normalizedRate) {
      continue;
    }

    rates[normalizedRate.code] = normalizedRate;
    liveCount += 1;
    date = item.Date || date;
  }

  return {
    base: "BYN",
    date,
    source,
    sourceUrl: NBRB_RATES_URL,
    status: liveCount >= targetCurrencies.length - 1 ? "live" : "mixed",
    rates,
  };
}

export function filterExchangeRates(
  exchangeRates: ExchangeRatesResponse,
  currencies: CurrencyCode[],
): ExchangeRatesResponse {
  const safeCurrencies = Array.from(new Set(["BYN", ...currencies])) as CurrencyCode[];
  const rates = safeCurrencies.reduce(
    (accumulator, currency) => {
      accumulator[currency] = exchangeRates.rates[currency] ?? fallbackRates.rates[currency];
      return accumulator;
    },
    {} as Record<CurrencyCode, ExchangeRate>,
  );

  return {
    ...exchangeRates,
    rates: rates as Record<CurrencyCode, ExchangeRate>,
  };
}

export function parseCurrencyList(value: string | null): CurrencyCode[] {
  if (!value) {
    return targetCurrencies;
  }

  return value
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter(isCurrencyCode);
}
