"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]); // Parallax effect
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    // GSAP animations for entrance
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
    );

    tl.fromTo(
      ".hero-subtext",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=1"
    );

    // Video parallax
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        scale: 1.1,
      });
    }
  }, []);

  return (
    <main ref={containerRef} className="relative w-full min-h-[200vh] bg-background">
      {/* Hero Section */}
      <section className="relative h-[140vh] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Vignette/Overlay */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="https://cdn.coverr.co/videos/coverr-walking-in-a-dark-hallway-4364/1080p.mp4" type="video/mp4" />
            {/* Fallback/Placeholder video - dark, moody, cinematic */}
          </video>
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-20 flex flex-col items-center text-center mix-blend-difference"
        >
          <h1
            ref={textRef}
            className="text-[120px] md:text-[280px] font-extralight leading-none tracking-tighter text-text select-none"
          >
            KÆST
          </h1>
          <p className="hero-subtext mt-8 text-lg md:text-2xl font-light tracking-[0.2em] text-text/80 uppercase">
            Copenhagen · MMXXV
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-text/50 to-transparent" />
        </motion.div>
      </section>

      {/* Enter CTA - Pinned at bottom of first viewport effectively, or just below */}
      <div className="absolute top-[100vh] left-0 w-full flex justify-center py-20 z-30 pointer-events-none">
        <Link href="/collection" className="pointer-events-auto group flex flex-col items-center gap-4">
          <span className="h-[1px] w-12 bg-text group-hover:bg-accent transition-colors duration-300" />
          <span className="text-sm font-light tracking-widest uppercase text-text group-hover:text-accent transition-colors duration-300">
            Enter
          </span>
        </Link>
      </div>

      {/* Spacer for scroll */}
      <div className="h-screen w-full bg-background" />
    </main>
  );
}
