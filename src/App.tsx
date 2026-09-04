import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ScrollTrigger } from "@/lib/motion";
import { TransitionProvider, ScrollManager } from "@/lib/transition";
import { Navbar } from "@/components/Navbar";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import {
  HomePage,
  AboutPage,
  SpecialtiesPage,
  VisitPage,
  ClinicPage,
  FaqPage,
  AppointmentsPage,
  NotFoundPage,
} from "@/pages";

export default function App() {
  useEffect(() => {
    // Mark JS-enabled so pre-reveal opacity only applies when GSAP will run.
    document.documentElement.classList.add("js");
    // The router owns scroll position; stop the browser fighting it on back/forward.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    // Refresh triggers once fonts/images settle to avoid mis-measured pins.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <HashRouter>
      <TransitionProvider>
        <ScrollManager />
        <Cursor />
        <Navbar />
        <main id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/specialties" element={<SpecialtiesPage />} />
            <Route path="/your-visit" element={<VisitPage />} />
            <Route path="/clinic" element={<ClinicPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </TransitionProvider>
    </HashRouter>
  );
}
