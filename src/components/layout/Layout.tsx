import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-900 bg-white">
      <ScrollToTop />
      <Header />
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
