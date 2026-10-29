import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "av_session";

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is required");
  return secret;
}

export type SessionPayload = {
  userId: number;
  email: string;
  name: string;
};

export function signSession(payload: SessionPayload) {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifySession(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, getSecret()) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(payload: SessionPayload) {
  const store = await cookies();
  const token = signSession(payload);
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
