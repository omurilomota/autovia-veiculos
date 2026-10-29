"use server";

import { db } from "@/db";
import {
  financingSimulations,
  leads,
  testDrives,
  vehicleEvaluations,
  vehicles,
} from "@/db/schema";
import { estimateMonthlyPayment, estimatePreApproval, estimateTradeInValue } from "@/lib/pricing";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function num(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

export type ActionState<T = undefined> = {
  ok: boolean;
  message: string;
  data?: T;
};

export async function createContactLead(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = str(formData, "name");
  const phone = str(formData, "phone");
  if (!name || !phone) {
    return { ok: false, message: "Preencha nome e telefone." };
  }
  const vehicleIdRaw = str(formData, "vehicleId");
  await db.insert(leads).values({
    name,
    phone,
    email: str(formData, "email"),
    message: str(formData, "message"),
    source: "site",
    type: vehicleIdRaw ? "veiculo" : "geral",
    vehicleId: vehicleIdRaw ? Number(vehicleIdRaw) : null,
  });
  revalidatePath("/admin/leads");
  return { ok: true, message: "Recebemos sua mensagem! Nossa equipe vai te responder em breve." };
}

export async function createTestDrive(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = str(formData, "name");
  const phone = str(formData, "phone");
  const vehicleId = Number(formData.get("vehicleId"));
  const preferredDate = str(formData, "preferredDate");
  const preferredTime = str(formData, "preferredTime");

  if (!name || !phone || !vehicleId || !preferredDate || !preferredTime) {
    return { ok: false, message: "Preencha todos os campos obrigatórios." };
  }

  const [lead] = await db
    .insert(leads)
    .values({
      name,
      phone,
      source: "site",
      type: "test_drive",
      vehicleId,
      message: `Agendamento de test drive para ${preferredDate} às ${preferredTime}`,
      status: "test_drive",
    })
    .returning({ id: leads.id });

  await db.insert(testDrives).values({
    leadId: lead?.id,
    vehicleId,
    name,
    phone,
    cnh: str(formData, "cnh"),
    preferredDate,
    preferredTime,
  });

  revalidatePath("/admin/test-drives");
  revalidatePath("/admin/leads");
  return {
    ok: true,
    message: "Test drive agendado! Você receberá a confirmação pelo WhatsApp.",
  };
}

export type EvaluationResult = { min: number; max: number };

export async function createEvaluation(
  _prev: ActionState<EvaluationResult>,
  formData: FormData,
): Promise<ActionState<EvaluationResult>> {
  const name = str(formData, "name");
  const phone = str(formData, "phone");
  const brand = str(formData, "brand");
  const model = str(formData, "model");
  const year = num(formData, "year");
  const km = num(formData, "km");
  const condition = str(formData, "condition") || "bom";

  if (!name || !phone || !brand || !model || !year) {
    return { ok: false, message: "Preencha todos os campos obrigatórios." };
  }

  const { min, max } = estimateTradeInValue({ year, km, condition });

  const [lead] = await db
    .insert(leads)
    .values({
      name,
      phone,
      email: str(formData, "email"),
      source: "site",
      type: "avaliacao",
      message: `Avaliação de troca: ${brand} ${model} ${year}, ${km} km, estado ${condition}`,
    })
    .returning({ id: leads.id });

  await db.insert(vehicleEvaluations).values({
    leadId: lead?.id,
    name,
    phone,
    email: str(formData, "email"),
    brand,
    model,
    year,
    km,
    condition,
    accessories: str(formData, "accessories"),
    estimatedMin: String(min),
    estimatedMax: String(max),
  });

  revalidatePath("/admin/avaliacoes");
  revalidatePath("/admin/leads");
  return {
    ok: true,
    message: "Avaliação estimada com sucesso!",
    data: { min, max },
  };
}

export type FinancingResult = {
  monthlyPayment: number;
  status: "pre_aprovado" | "em_analise" | "reprovado";
};

export async function createFinancingSimulation(
  _prev: ActionState<FinancingResult>,
  formData: FormData,
): Promise<ActionState<FinancingResult>> {
  const name = str(formData, "name");
  const phone = str(formData, "phone");
  const vehiclePrice = num(formData, "vehiclePrice");
  const downPayment = num(formData, "downPayment");
  const installments = num(formData, "installments") || 48;
  const monthlyIncome = num(formData, "monthlyIncome");
  const vehicleIdRaw = str(formData, "vehicleId");

  if (!name || !phone || !vehiclePrice) {
    return { ok: false, message: "Preencha todos os campos obrigatórios." };
  }

  const monthlyPayment = estimateMonthlyPayment({
    vehiclePrice,
    downPayment,
    installments,
  });
  const status = estimatePreApproval({ monthlyIncome, monthlyPayment });

  const [lead] = await db
    .insert(leads)
    .values({
      name,
      phone,
      source: "site",
      type: "financiamento",
      vehicleId: vehicleIdRaw ? Number(vehicleIdRaw) : null,
      message: `Simulação: veículo R$ ${vehiclePrice}, entrada R$ ${downPayment}, ${installments}x`,
    })
    .returning({ id: leads.id });

  await db.insert(financingSimulations).values({
    leadId: lead?.id,
    vehicleId: vehicleIdRaw ? Number(vehicleIdRaw) : null,
    name,
    phone,
    cpf: str(formData, "cpf"),
    vehiclePrice: String(vehiclePrice),
    downPayment: String(downPayment),
    installments,
    monthlyIncome: monthlyIncome ? String(monthlyIncome) : null,
    monthlyPayment: String(monthlyPayment),
    status,
  });

  revalidatePath("/admin/financiamentos");
  revalidatePath("/admin/leads");

  return {
    ok: true,
    message:
      status === "pre_aprovado"
        ? "Boa notícia! Seu perfil está pré-aprovado."
        : status === "em_analise"
          ? "Recebemos sua simulação, nossa equipe vai analisar seu perfil."
          : "Simulação recebida. Fale com nossa equipe para condições especiais.",
    data: { monthlyPayment, status },
  };
}

export async function incrementVehicleView(vehicleId: number) {
  await db
    .update(vehicles)
    .set({ views: sql`${vehicles.views} + 1` })
    .where(eq(vehicles.id, vehicleId));
}
