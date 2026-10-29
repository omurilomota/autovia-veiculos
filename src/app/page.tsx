import { desc, ne } from "drizzle-orm";
import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { SiteHeader } from "@/components/site/header";
import { Hero, BrandMarquee } from "@/components/site/hero";
import { Inventory } from "@/components/site/inventory";
import {
  FinanceTradeBands,
  StepsStrip,
  StoreSection,
} from "@/components/site/sections";
import { SiteFooter, WhatsAppFloat } from "@/components/site/footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cars = await db
    .select()
    .from(vehicles)
    .where(ne(vehicles.status, "vendido"))
    .orderBy(desc(vehicles.featured), desc(vehicles.createdAt));

  const available = cars.filter((c) => c.status === "disponivel");
  const featured =
    available.find((c) => c.featured && c.coverImage) ?? available[0] ?? cars[0];

  return (
    <>
      <SiteHeader />
      <main>
        <Hero featured={featured} total={available.length} />
        <BrandMarquee />
        <Inventory cars={cars} />
        <FinanceTradeBands />
        <StepsStrip />
        <StoreSection />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
