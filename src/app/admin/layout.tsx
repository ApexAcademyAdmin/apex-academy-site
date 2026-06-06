"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { loadDashboardContext, type DashboardContext } from "@/lib/dashboard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [ctx, setCtx] = useState<DashboardContext | null>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadDashboardContext().then((result) => {
      if (!result) {
        router.push("/signin");
        return;
      }
      if (result.realRole !== "admin") {
        router.push("/account");
        return;
      }
      setCtx(result);
      setLoaded(true);
    });
  }, [router]);

  if (!loaded || !ctx) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout
      user={{ email: ctx.user.email || "", display_name: ctx.displayName }}
      role={ctx.role}
      realRole={ctx.realRole}
      teamStatus={ctx.teamStatus}
    >
      {children}
    </DashboardLayout>
  );
}
