import type { Metadata } from "next";
import { IndustryDashboard } from "@/components/industry-dashboard";
export const metadata: Metadata = { title: "Visão geral | Virteon Industry" };
export default function IndustryPage() {
  return <IndustryDashboard />;
}
