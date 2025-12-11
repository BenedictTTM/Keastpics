"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        // Reveal animation
        const tl = gsap.timeline();

        tl.to(containerRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        });

        if (textRef.current) {
            // Split text animation effect (simulated with standard GSAP for now)
            tl.fromTo(
                textRef.current,
                { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 100 },
                {
                    clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                    y: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    delay: 0.2
                },
                "-=0.5"
            );
        }

        // Video parallax/scale trigger
        if (videoRef.current) {
            gsap.to(videoRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                scale: 1.2,
                y: 200,
            });
        }
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center opacity-0">
            {/* Raw/Organic Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                >
                    {/* Abstract organic texture / dark fluid */}
                    <source src="https://cdn.coverr.co/videos/coverr-abstract-black-shapes-4524/1080p.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            </div>

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 w-full px-4 md:px-12 flex flex-col items-center justify-center mix-blend-difference"
            >
                <h1
                    ref={textRef}
                    className="text-[18vw] leading-[0.8] font-black tracking-tighter text-[#E8E9EB] select-none text-center"
                >
                    KÆST
                </h1>
                <div className="mt-8 flex justify-between w-full max-w-4xl text-xs md:text-sm font-mono tracking-widest uppercase text-[#E8E9EB]/70">
                    <span>Est. 2024 • Visual Arts</span>
                    <span className="animate-pulse">● Live</span>
                    <span>Accra, GH</span>
                </div>
            </motion.div>
        </section>
    );
}
