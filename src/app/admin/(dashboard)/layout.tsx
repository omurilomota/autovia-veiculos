import { requireSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased">
      <AdminSidebar userName={session.name || session.email} />
      <div className="flex-1 overflow-x-hidden">
        <main className="mx-auto max-w-5xl px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
