"use server";

import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export type LoginState = { ok: boolean; message: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { ok: false, message: "Informe e-mail e senha." };
  }

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (!user) {
    return { ok: false, message: "Credenciais inválidas." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { ok: false, message: "Credenciais inválidas." };
  }

  await setSessionCookie({ userId: user.id, email: user.email, name: user.name });
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}
