"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Check, CircleDollarSign, LoaderCircle, Mail, RotateCcw } from "lucide-react";
import {
  addOns,
  calculateServiceEstimate,
  deadlineOptions,
  readinessOptions,
  services,
  sizeOptions,
  type AddOnId,
  type DeadlineId,
  type ReadinessId,
  type ServiceId,
  type SizeId,
} from "@/lib/service-pricing";
import { fallbackRates, type CurrencyCode, type ExchangeRatesResponse } from "@/lib/exchange-rates";

const currencyCodes: CurrencyCode[] = ["BYN", "USD", "EUR", "RUB", "PLN"];
type RateStatus = "loading" | "live" | "mixed" | "fallback" | "error";

function convertFromByn(amountByn: number, currency: CurrencyCode, rates: ExchangeRatesResponse) {
  if (currency === "BYN") {
    return amountByn;
  }

  const rate = rates.rates[currency];
  if (!rate?.bynPerUnit || rate.bynPerUnit <= 0) {
    return amountByn;
  }

  return amountByn / rate.bynPerUnit;
}

function formatCurrency(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat("ru-BY", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "дата курса не определена";
  }

  return new Intl.DateTimeFormat("ru-BY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getRateStatusLabel(status: RateStatus, rates: ExchangeRatesResponse) {
  if (status === "loading") {
    return "загружаю курс НБ РБ";
  }

  if (status === "live") {
    return `курс НБ РБ от ${formatDate(rates.date)}`;
  }

  if (status === "mixed") {
    return `курс НБ РБ от ${formatDate(rates.date)}, часть значений резервная`;
  }

  if (status === "error") {
    return `сервер курса недоступен, показан резерв от ${formatDate(rates.date)}`;
  }

  return `резервный курс от ${formatDate(rates.date)}`;
}

export function ProjectScopeEstimator() {
  const [serviceId, setServiceId] = useState<ServiceId>("video");
  const [sizeId, setSizeId] = useState<SizeId>("standard");
  const [readinessId, setReadinessId] = useState<ReadinessId>("rough");
  const [deadlineId, setDeadlineId] = useState<DeadlineId>("normal");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnId[]>(["handoff"]);
  const [currency, setCurrency] = useState<CurrencyCode>("BYN");
  const [brief, setBrief] = useState("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRatesResponse>(fallbackRates);
  const [rateStatus, setRateStatus] = useState<RateStatus>("loading");

  useEffect(() => {
    let ignore = false;

    async function loadRates() {
      try {
        const response = await fetch("/api/exchange-rates");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = (await response.json()) as ExchangeRatesResponse;
        if (ignore) {
          return;
        }

        setExchangeRates(data);
        setRateStatus(data.status);
      } catch {
        if (!ignore) {
          setExchangeRates(fallbackRates);
          setRateStatus("error");
        }
      }
    }

    loadRates();

    return () => {
      ignore = true;
    };
  }, []);

  const estimate = useMemo(
    () =>
      calculateServiceEstimate({
        serviceId,
        sizeId,
        readinessId,
        deadlineId,
        addOnIds: selectedAddOns,
      }),
    [deadlineId, readinessId, selectedAddOns, serviceId, sizeId],
  );

  const selectedService = estimate.service;
  const selectedSize = estimate.size;
  const selectedReadiness = estimate.readiness;
  const selectedDeadline = estimate.deadline;
  const activeAddOns = estimate.activeAddOns;
  const basePriceByn = selectedService.basePriceByn;
  const priceRangeByn = estimate.priceRangeByn;
  const selectedRange = {
    min: convertFromByn(priceRangeByn.min, currency, exchangeRates),
    target: convertFromByn(priceRangeByn.target, currency, exchangeRates),
    max: convertFromByn(priceRangeByn.max, currency, exchangeRates),
  };
  const rateStatusLabel = getRateStatusLabel(rateStatus, exchangeRates);

  const mailHref = useMemo(() => {
    const convertedRange = `${formatCurrency(selectedRange.min, currency)} - ${formatCurrency(
      selectedRange.max,
      currency,
    )}`;
    const bynRange = `${formatCurrency(priceRangeByn.min, "BYN")} - ${formatCurrency(
      priceRangeByn.max,
      "BYN",
    )}`;
    const body = [
      "Здравствуйте, Никита.",
      "",
      "Хочу обсудить задачу:",
      `Тип: ${selectedService.label}`,
      `Размер: ${selectedSize.label}`,
      `Материалы: ${selectedReadiness.label}`,
      `Срок: ${selectedDeadline.label}`,
      `Дополнительно: ${activeAddOns.map((item) => item.label).join(", ") || "дополнительные пункты не выбраны"}`,
      `Ориентир с сайта: ${bynRange} (${convertedRange})`,
      `Валюта экрана: ${currency}`,
      `Курс: ${rateStatusLabel}`,
      "",
      "Понимаю, что финальная цена подтверждается после брифа.",
      "",
      brief ? `Короткое описание: ${brief}` : "Короткое описание: ",
    ].join("\n");

    return `mailto:nikitka9318@gmail.com?subject=${encodeURIComponent(
      `Бриф: ${selectedService.label}`,
    )}&body=${encodeURIComponent(body)}`;
  }, [
    activeAddOns,
    brief,
    currency,
    priceRangeByn.max,
    priceRangeByn.min,
    rateStatusLabel,
    selectedDeadline.label,
    selectedReadiness.label,
    selectedRange.max,
    selectedRange.min,
    selectedService.label,
    selectedSize.label,
  ]);

  function toggleAddOn(addOnId: AddOnId) {
    setSelectedAddOns((current) =>
      current.includes(addOnId)
        ? current.filter((item) => item !== addOnId)
        : [...current, addOnId],
    );
  }

  function reset() {
    setServiceId("video");
    setSizeId("standard");
    setReadinessId("rough");
    setDeadlineId("normal");
    setSelectedAddOns(["handoff"]);
    setCurrency("BYN");
    setBrief("");
  }

  return (
    <section className="rounded-shell border border-border-subtle bg-[linear-gradient(145deg,rgba(214,207,191,0.09),rgba(18,24,22,0.82)_36%,rgba(10,13,12,0.96))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.32)] md:p-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
        <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.42)] p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <CircleDollarSign size={18} className="text-accent" />
                <p className="signal-label text-accent">Калькулятор бюджета</p>
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-foreground md:text-4xl">
                Выберите формат, и сайт сразу покажет ориентир в BYN.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[rgba(214,207,191,0.82)]">
                Это быстрый расчет для первого разговора: что нужно сделать,
                сколько входных материалов есть и насколько сжат срок.
              </p>
            </div>
            <div className="rounded-panel border border-accent/20 bg-accent/8 px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                База
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">BYN</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            <ControlGroup title="Тип задачи">
              <div
                role="radiogroup"
                aria-label="Тип задачи"
                className="grid gap-3 md:grid-cols-2"
              >
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    role="radio"
                    onClick={() => setServiceId(service.id)}
                    aria-checked={serviceId === service.id}
                    className={`min-h-32 rounded-panel border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                      serviceId === service.id
                        ? "border-accent bg-accent/10"
                        : "border-border-subtle bg-[rgba(18,24,22,0.48)] hover:border-accent/40"
                    }`}
                  >
                    <span className="text-base font-semibold text-foreground">{service.label}</span>
                    <span className="mt-2 block text-sm leading-6 text-[rgba(214,207,191,0.76)]">
                      {service.note}
                    </span>
                    <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.16em] text-titanium">
                      от {formatCurrency(service.basePriceByn, "BYN")}
                    </span>
                  </button>
                ))}
              </div>
            </ControlGroup>

            <div className="grid gap-5 lg:grid-cols-3">
              <ControlGroup title="Размер">
                <SegmentedControl
                  value={sizeId}
                  items={sizeOptions}
                  ariaLabel="Размер задачи"
                  getMeta={(item) => `x${item.multiplier}`}
                  onChange={(value) => setSizeId(value as SizeId)}
                />
              </ControlGroup>
              <ControlGroup title="Материалы">
                <SegmentedControl
                  value={readinessId}
                  items={readinessOptions}
                  ariaLabel="Готовность материалов"
                  getMeta={(item) => `+${formatCurrency(item.priceAddByn, "BYN")}`}
                  onChange={(value) => setReadinessId(value as ReadinessId)}
                />
              </ControlGroup>
              <ControlGroup title="Срок">
                <SegmentedControl
                  value={deadlineId}
                  items={deadlineOptions}
                  ariaLabel="Срок проекта"
                  getMeta={(item) => `x${item.multiplier}`}
                  onChange={(value) => setDeadlineId(value as DeadlineId)}
                />
              </ControlGroup>
            </div>

            <ControlGroup title="Дополнительно">
              <div className="grid gap-3 md:grid-cols-2">
                {addOns.map((addOn) => {
                  const checked = selectedAddOns.includes(addOn.id);
                  return (
                    <label
                      key={addOn.id}
                      className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-panel border px-4 py-3 text-left text-sm leading-6 transition-colors focus-within:ring-1 focus-within:ring-accent ${
                        checked
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border-subtle bg-[rgba(18,24,22,0.48)] text-[rgba(214,207,191,0.78)] hover:border-accent/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddOn(addOn.id)}
                        className="sr-only"
                      />
                      <span
                        className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center border ${
                          checked ? "border-accent text-accent" : "border-border"
                        }`}
                      >
                        {checked ? <Check size={12} /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block">{addOn.label}</span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-titanium">
                          +{formatCurrency(convertFromByn(addOn.priceByn, currency, exchangeRates), currency)}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </ControlGroup>

            <label className="grid gap-3">
              <span className="signal-label">Короткое описание</span>
              <textarea
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
                rows={4}
                maxLength={400}
                placeholder="Например: нужен короткий ролик для презентации идеи, есть референсы и дедлайн через две недели."
                className="min-h-28 rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.5)] px-4 py-3 text-sm leading-7 text-foreground outline-none transition-colors placeholder:text-[rgba(214,207,191,0.45)] focus:border-accent"
              />
            </label>
          </div>
        </div>

        <aside className="rounded-panel border border-border-subtle bg-[rgba(214,207,191,0.08)] p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="signal-label text-accent">Итог сейчас</p>
              <p className="mt-2 text-sm leading-6 text-[rgba(214,207,191,0.76)]">
                Основной расчет в BYN, остальные валюты пересчитываются по курсу.
              </p>
            </div>
            {rateStatus === "loading" ? (
              <LoaderCircle size={18} className="animate-spin text-accent" aria-hidden />
            ) : null}
          </div>

          <div className="mt-5 rounded-panel border border-accent/20 bg-[rgba(10,13,12,0.42)] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
              Ориентир
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-normal text-foreground md:text-5xl">
              {formatCurrency(selectedRange.min, currency)} - {formatCurrency(selectedRange.max, currency)}
            </p>
            <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
              В BYN: {formatCurrency(priceRangeByn.min, "BYN")} -{" "}
              {formatCurrency(priceRangeByn.max, "BYN")}. Финальная цена после короткого брифа.
            </p>
          </div>

          <div
            className="mt-4 grid grid-cols-5 gap-2"
            role="radiogroup"
            aria-label="Выбор валюты"
          >
            {currencyCodes.map((code) => (
              <button
                key={code}
                type="button"
                role="radio"
                onClick={() => setCurrency(code)}
                aria-checked={currency === code}
                className={`min-h-11 rounded-panel border px-2 text-center font-mono text-xs uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  currency === code
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border-subtle text-[rgba(214,207,191,0.68)] hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-panel border border-border-subtle px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
              Курс
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">{rateStatusLabel}</p>
            <a
              href={exchangeRates.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 inline-flex min-h-11 items-center text-xs text-[rgba(214,207,191,0.68)] underline-offset-4 hover:text-accent hover:underline"
            >
              Источник: {exchangeRates.source}
            </a>
          </div>

          <div className="mt-4 grid gap-3">
            {[
              ["Формат", selectedService.label],
              ["Базовый ориентир", `${formatCurrency(basePriceByn, "BYN")} / ${selectedService.baseUnit}`],
              ["Размер", selectedSize.note],
              ["Материалы", selectedReadiness.note],
              ["Срок", selectedDeadline.note],
            ].map(([label, value]) => (
              <div key={label} className="rounded-panel border border-border-subtle px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row xl:flex-col">
            <a
              href={mailHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              <Mail size={16} />
              Отправить бриф
              <ArrowRight size={15} />
            </a>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-[rgba(214,207,191,0.76)] transition-colors hover:border-accent hover:text-foreground"
            >
              <RotateCcw size={15} />
              Сбросить
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ControlGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="signal-label">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function SegmentedControl<T extends { id: string; label: string; note: string }>({
  value,
  items,
  ariaLabel,
  getMeta,
  onChange,
}: {
  value: string;
  items: ReadonlyArray<T>;
  ariaLabel: string;
  getMeta: (item: T) => string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="grid gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="radio"
          onClick={() => onChange(item.id)}
          aria-checked={value === item.id}
          className={`min-h-20 rounded-panel border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
            value === item.id
              ? "border-accent bg-accent/10"
              : "border-border-subtle bg-[rgba(18,24,22,0.48)] hover:border-accent/40"
          }`}
        >
          <span className="flex items-start justify-between gap-3">
            <span className="block text-sm font-semibold text-foreground">{item.label}</span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-titanium">
              {getMeta(item)}
            </span>
          </span>
          <span className="mt-2 block text-xs leading-5 text-[rgba(214,207,191,0.68)]">
            {item.note}
          </span>
        </button>
      ))}
    </div>
  );
}
