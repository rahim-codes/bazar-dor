import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-bangla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "Daily market prices in Bangladesh",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={hindSiliguri.variable}>
      <body
        className="min-h-full flex flex-col font-bangla antialiased"
        suppressHydrationWarning={true}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
