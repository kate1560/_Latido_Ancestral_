import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Latido Ancestral - Artesanías Colombianas",
  description: "Tienda virtual especializada en la venta de artesanías colombianas hechas a mano. Sombreros vueltiaos, mochilas wayuu, hamacas y más.",
  keywords: ["artesanías", "colombia", "sombrero vueltiao", "mochila wayuu", "hamaca", "artesanías colombianas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
