import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./startup.css";
import { FeedbackProvider } from "@/components/ui";
import { StartupScreen } from "@/components/startup-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virteon | Aprender na prática. Evoluir sem riscos.",
  description:
    "Treinamento imersivo Web e VR. Conheça os ambientes Virteon Industry e EDU: mais segurança para quem opera, novas descobertas para quem aprende.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StartupScreen>
          <a href="#main-content" className="skip-link">
            Pular para o conteúdo
          </a>
          <FeedbackProvider>{children}</FeedbackProvider>
        </StartupScreen>
      </body>
    </html>
  );
}
