import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bodyFont = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "../assets/fonts/manrope-400.ttf", weight: "400" },
    { path: "../assets/fonts/manrope-500.ttf", weight: "500" },
    { path: "../assets/fonts/manrope-600.ttf", weight: "600" },
    { path: "../assets/fonts/manrope-700.ttf", weight: "700" },
    { path: "../assets/fonts/manrope-800.ttf", weight: "800" },
  ],
});
const displayFont = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../assets/fonts/jakarta-500.ttf", weight: "500" },
    { path: "../assets/fonts/jakarta-600.ttf", weight: "600" },
    { path: "../assets/fonts/jakarta-700.ttf", weight: "700" },
    { path: "../assets/fonts/jakarta-800.ttf", weight: "800" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nativeinsightng.com"),
  title: { default: "Native Insight", template: "%s - Native Insight" },
  description: "Local solution. Pan-African perspective. Global participation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
