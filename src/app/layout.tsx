import type { Metadata } from "next";
import "./globals.css";
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";
import StoreHydration from "@/components/StoreHydration";
import NotificationToast from "@/components/NotificationToast";
import PromoPopup from "@/components/PromoPopup";
import { QuickViewProvider } from "@/contexts/QuickViewContext";
import QuickViewModal from "@/components/modals/QuickViewModal";
import { CartSidebarProvider } from "@/contexts/CartSidebarContext";
import CartSidebar from "@/components/cart/CartSidebar";

export const metadata: Metadata = {
  title: "Ancestral heartbeat - Artesanías Colombianas",
  description: "Tienda virtual especializada en la venta de artesanías colombianas hechas a mano. Sombreros vueltiaos, mochilas wayuu, hamacas y más.",
  keywords: ["artesanías", "colombia", "sombrero vueltiao", "mochila wayuu", "hamaca", "artesanías colombianas"],
  openGraph: {
    title: "Ancestral heartbeat - Artesanías Colombianas",
    description: "Descubre artesanías colombianas auténticas hechas a mano",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <CartSidebarProvider>
          <QuickViewProvider>
            <StoreHydration />
            <NewHeader />
            <main className="min-h-screen pt-[120px]">
              {children}
            </main>
            <Footer />
            
            {/* Global Components */}
            <NotificationToast />
            <PromoPopup delay={10000} />
            <QuickViewModal />
            <CartSidebar />
          </QuickViewProvider>
        </CartSidebarProvider>
      </body>
    </html>
  );
}
