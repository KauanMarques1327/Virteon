import { PlatformShell } from "@/components/platform-shell";
export default function EduLayout({ children }: { children: React.ReactNode }) {
  return <PlatformShell environment="edu">{children}</PlatformShell>;
}
