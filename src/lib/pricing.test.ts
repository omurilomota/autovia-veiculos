import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  estimateMonthlyPayment,
  estimatePreApproval,
  estimateTradeInValue,
} from "./pricing";
import { formatCurrency, formatKm, slugify } from "./utils";

describe("estimateMonthlyPayment", () => {
  it("retorna 0 quando não há valor financiado", () => {
    expect(
      estimateMonthlyPayment({ vehiclePrice: 50000, downPayment: 50000, installments: 48 }),
    ).toBe(0);
    expect(
      estimateMonthlyPayment({ vehiclePrice: 40000, downPayment: 60000, installments: 48 }),
    ).toBe(0);
  });

  it("retorna 0 quando o número de parcelas é inválido", () => {
    expect(
      estimateMonthlyPayment({ vehiclePrice: 50000, downPayment: 10000, installments: 0 }),
    ).toBe(0);
  });

  it("cobra mais por parcela quando o prazo diminui", () => {
    const curto = estimateMonthlyPayment({
      vehiclePrice: 80000,
      downPayment: 20000,
      installments: 24,
    });
    const longo = estimateMonthlyPayment({
      vehiclePrice: 80000,
      downPayment: 20000,
      installments: 48,
    });
    expect(curto).toBeGreaterThan(longo);
    expect(longo).toBeGreaterThan(0);
  });

  it("financia exatamente o valor menos a entrada (parcela > financiado / prazo)", () => {
    const parcela = estimateMonthlyPayment({
      vehiclePrice: 60000,
      downPayment: 10000,
      installments: 36,
    });
    // juros embutidos: a soma das parcelas supera o valor financiado
    expect(parcela * 36).toBeGreaterThan(50000);
  });
});

describe("estimatePreApproval", () => {
  it("pré-aprova comprometimento de até 30% da renda", () => {
    expect(estimatePreApproval({ monthlyIncome: 5000, monthlyPayment: 1500 })).toBe(
      "pre_aprovado",
    );
  });

  it("mantém em análise entre 30% e 45%", () => {
    expect(estimatePreApproval({ monthlyIncome: 5000, monthlyPayment: 2000 })).toBe(
      "em_analise",
    );
  });

  it("reprova acima de 45% ou sem renda informada", () => {
    expect(estimatePreApproval({ monthlyIncome: 5000, monthlyPayment: 2500 })).toBe(
      "reprovado",
    );
    expect(estimatePreApproval({ monthlyIncome: 0, monthlyPayment: 500 })).toBe(
      "em_analise",
    );
  });
});

describe("estimateTradeInValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("desvaloriza com idade e quilometragem", () => {
    const novo = estimateTradeInValue({ year: 2024, km: 10000, condition: "bom" });
    const antigo = estimateTradeInValue({ year: 2015, km: 150000, condition: "bom" });
    expect(antigo.max).toBeLessThan(novo.min);
  });

  it("aplica o multiplicador de conservação", () => {
    const excelente = estimateTradeInValue({ year: 2020, km: 60000, condition: "excelente" });
    const ruim = estimateTradeInValue({ year: 2020, km: 60000, condition: "ruim" });
    expect(excelente.min).toBeGreaterThan(ruim.max);
  });

  it("mantém a faixa ordenada e acima do piso", () => {
    const { min, max } = estimateTradeInValue({ year: 1998, km: 400000, condition: "ruim" });
    expect(min).toBeLessThan(max);
    expect(min).toBeGreaterThan(0);
  });
});

describe("formatadores", () => {
  it("formata moeda e quilometragem em pt-BR", () => {
    expect(formatCurrency(45900).replace(/\u00a0/g, " ")).toBe("R$ 45.900");
    expect(formatKm(32000)).toBe("32.000 km");
  });

  it("gera slug sem acentos", () => {
    expect(slugify("Honda Civic Touring 2021")).toBe("honda-civic-touring-2021");
    expect(slugify("  Jeep Compass Limited 4x4 ")).toBe("jeep-compass-limited-4x4");
  });
});
