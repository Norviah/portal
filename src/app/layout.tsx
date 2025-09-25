import "./globals.css";

import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ToastProvider } from "@/components/ToastProvider";
import { ThemeProvider } from "next-themes";

import { font, siteConfig } from "@/lib/config";

import type { Metadata } from "next";

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <TailwindIndicator />
        <ToastProvider className={font.className} />
      </body>
    </html>
  );
}
