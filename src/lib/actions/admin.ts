"use server";

import { db } from "@/db";
import { vehicleImages, vehicles } from "@/db/schema";
import { requireSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function num(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

export type FormState = { ok: boolean; message: string };

function parseImageUrls(raw: string) {
  return raw
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveVehicle(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireSession();

  const id = str(formData, "id");
  const brand = str(formData, "brand");
  const model = str(formData, "model");
  const version = str(formData, "version");
  const yearManufacture = num(formData, "yearManufacture");
  const yearModel = num(formData, "yearModel");
  const km = num(formData, "km");
  const price = num(formData, "price");
  const imagesRaw = str(formData, "images");

  if (!brand || !model || !yearManufacture || !yearModel || !price) {
    return { ok: false, message: "Preencha marca, modelo, ano e preço." };
  }

  const images = parseImageUrls(imagesRaw);
  const baseSlug = slugify(
    `${brand}-${model}-${version}-${yearModel}-${Date.now().toString().slice(-4)}`,
  );

  const values = {
    brand,
    model,
    version,
    yearManufacture,
    yearModel,
    km,
    price: String(price),
    fuel: (str(formData, "fuel") || "flex") as typeof vehicles.$inferInsert.fuel,
    transmission: (str(formData, "transmission") ||
      "manual") as typeof vehicles.$inferInsert.transmission,
    color: str(formData, "color"),
    doors: num(formData, "doors") || 4,
    description: str(formData, "description"),
    accessories: str(formData, "accessories"),
    status: (str(formData, "status") || "disponivel") as typeof vehicles.$inferInsert.status,
    featured: formData.get("featured") === "on",
    coverImage: images[0] ?? "",
    updatedAt: new Date(),
  };

  let vehicleId: number;

  if (id) {
    vehicleId = Number(id);
    await db.update(vehicles).set(values).where(eq(vehicles.id, vehicleId));
    if (images.length > 0) {
      await db.delete(vehicleImages).where(eq(vehicleImages.vehicleId, vehicleId));
    }
  } else {
    const [created] = await db
      .insert(vehicles)
      .values({ ...values, slug: baseSlug })
      .returning({ id: vehicles.id });
    vehicleId = created.id;
  }

  if (images.length > 0) {
    await db.insert(vehicleImages).values(
      images.map((url, index) => ({ vehicleId, url, position: index })),
    );
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteVehicle(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(vehicles).where(eq(vehicles.id, id));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateVehicleStatus(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  const status = str(formData, "status") as typeof vehicles.$inferInsert.status;
  if (!id || !status) return;
  await db
    .update(vehicles)
    .set({
      status,
      updatedAt: new Date(),
      soldAt: status === "vendido" ? new Date() : null,
    })
    .where(eq(vehicles.id, id));
  revalidatePath("/admin");
  revalidatePath("/");
}
