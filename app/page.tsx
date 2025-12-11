"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import SelectedWorks from "@/components/SelectedWorks";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
// import Lenis from 'lenis'; // Assuming Lenis is handled in layout or SmoothScroll component, but double checking integration

export default function Home() {

  useEffect(() => {
    // Page load orchestration if needed
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-background text-foreground selection:bg-accent selection:text-black">
      <Hero />
      <Ticker />
      <Manifesto />
      <SelectedWorks />

      <Footer />
    </main>
  );
}
