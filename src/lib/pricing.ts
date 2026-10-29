// Simple financing estimate (Price table) for marketing purposes.
// Rate is a conservative placeholder; real integration with banks can replace this later.
export function estimateMonthlyPayment({
  vehiclePrice,
  downPayment,
  installments,
}: {
  vehiclePrice: number;
  downPayment: number;
  installments: number;
}) {
  const financedAmount = Math.max(vehiclePrice - downPayment, 0);
  const monthlyRate = 0.0189; // ~1,89% a.m. estimado
  if (financedAmount <= 0 || installments <= 0) return 0;
  const factor = Math.pow(1 + monthlyRate, installments);
  const payment = (financedAmount * monthlyRate * factor) / (factor - 1);
  return Math.round(payment * 100) / 100;
}

export function estimatePreApproval({
  monthlyIncome,
  monthlyPayment,
}: {
  monthlyIncome: number;
  monthlyPayment: number;
}) {
  if (!monthlyIncome || monthlyIncome <= 0) return "em_analise" as const;
  const commitment = monthlyPayment / monthlyIncome;
  if (commitment <= 0.3) return "pre_aprovado" as const;
  if (commitment <= 0.45) return "em_analise" as const;
  return "reprovado" as const;
}

// Rough trade-in valuation heuristic based on year/km/condition.
// In production this would query the FIPE table API.
export function estimateTradeInValue({
  year,
  km,
  condition,
}: {
  year: number;
  km: number;
  condition: string;
}) {
  const currentYear = new Date().getFullYear();
  const age = Math.max(currentYear - year, 0);

  // Base value loosely modeled after a mid-range popular car.
  let base = 95000;
  base -= age * 4200;
  base -= Math.min(km / 1000, 220) * 220;

  const conditionMultiplier: Record<string, number> = {
    excelente: 1.08,
    bom: 1.0,
    regular: 0.88,
    ruim: 0.72,
  };

  base *= conditionMultiplier[condition] ?? 1;
  base = Math.max(base, 8000);

  const min = Math.round((base * 0.92) / 100) * 100;
  const max = Math.round((base * 1.08) / 100) * 100;

  return { min, max };
}
