export function formatCurrency(value: number | string) {
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "R$ 0,00";
  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatKm(value: number | string) {
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "0 km";
  return `${num.toLocaleString("pt-BR")} km`;
}

export function formatDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function vehicleTitle(v: { brand: string; model: string; version?: string | null }) {
  return [v.brand, v.model, v.version].filter(Boolean).join(" ");
}

export const STORE_WHATSAPP = "5518999990101";

export function whatsappLink(message: string, phone: string = STORE_WHATSAPP) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export const fuelLabels: Record<string, string> = {
  flex: "Flex",
  gasolina: "Gasolina",
  diesel: "Diesel",
  eletrico: "Elétrico",
  hibrido: "Híbrido",
};

export const transmissionLabels: Record<string, string> = {
  manual: "Manual",
  automatico: "Automático",
};

export const vehicleStatusLabels: Record<string, string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  vendido: "Vendido",
  preparacao: "Em preparação",
};

export const leadStatusLabels: Record<string, string> = {
  novo: "Novo",
  contato: "Em contato",
  test_drive: "Test drive",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
};

export const leadStatusColors: Record<string, string> = {
  novo: "bg-sky-100 text-sky-700 border-sky-200",
  contato: "bg-amber-100 text-amber-700 border-amber-200",
  test_drive: "bg-violet-100 text-violet-700 border-violet-200",
  negociacao: "bg-orange-100 text-orange-700 border-orange-200",
  fechado: "bg-emerald-100 text-emerald-700 border-emerald-200",
  perdido: "bg-rose-100 text-rose-700 border-rose-200",
};

export const leadSourceLabels: Record<string, string> = {
  site: "Site",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  indicacao: "Indicação",
  portal: "Portal",
  outro: "Outro",
};

export const leadTypeLabels: Record<string, string> = {
  geral: "Contato geral",
  financiamento: "Financiamento",
  test_drive: "Test drive",
  avaliacao: "Avaliação de troca",
  veiculo: "Interesse em veículo",
};

export const testDriveStatusLabels: Record<string, string> = {
  agendado: "Agendado",
  confirmado: "Confirmado",
  realizado: "Realizado",
  cancelado: "Cancelado",
};

export const evaluationStatusLabels: Record<string, string> = {
  novo: "Novo",
  contatado: "Contatado",
  avaliado: "Avaliado",
  descartado: "Descartado",
};

export const financingStatusLabels: Record<string, string> = {
  pendente: "Pendente",
  pre_aprovado: "Pré-aprovado",
  em_analise: "Em análise",
  reprovado: "Reprovado",
};
