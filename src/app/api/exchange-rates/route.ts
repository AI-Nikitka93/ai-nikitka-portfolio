import { NextResponse, type NextRequest } from "next/server";
import {
  fallbackRates,
  filterExchangeRates,
  getExchangeRates,
  parseCurrencyList,
} from "@/lib/exchange-rates";

export const revalidate = 21_600;
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const currencies = parseCurrencyList(request.nextUrl.searchParams.get("currencies"));

  try {
    const exchangeRates = await getExchangeRates();

    return NextResponse.json(filterExchangeRates(exchangeRates, currencies), {
      headers: {
        "Cache-Control": "s-maxage=21600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown exchange-rate error";

    return NextResponse.json(
      {
        ...filterExchangeRates(fallbackRates, currencies),
        status: "fallback",
        error: message,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=900, stale-while-revalidate=21600",
        },
      },
    );
  }
}
