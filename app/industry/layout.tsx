import { PlatformShell } from "@/components/platform-shell";
export default function IndustryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PlatformShell environment="industry">{children}</PlatformShell>;
}
