"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split text logic for word-by-word reveal
        const textContent = textRef.current.innerText;
        const words = textContent.split(" ");

        // Wrap words, adding special classes for "noise", "flesh", "armor" to mix fonts
        textRef.current.innerHTML = words
            .map((word) => {
                const isSpecial = ["flesh.", "noise", "armor", "self,"].includes(word);
                const fontClass = isSpecial ? "font-serif italic font-light" : "font-sans font-bold";
                return `<span class="word inline-block opacity-20 transition-all duration-300 hover:opacity-100 hover:text-accent ${fontClass}">${word}</span>`;
            })
            .join(" ");

        const wordElements = textRef.current.querySelectorAll(".word");

        gsap.to(wordElements, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 40%",
                scrub: 1,
            },
            opacity: 1,
            color: "#E8E9EB",
            stagger: 0.05,
        });
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-40 px-4 md:px-12 bg-background flex flex-col items-center min-h-[80vh] justify-center">

            <div className="max-w-[1400px] w-full relative z-10">
                <div className="mb-16 flex items-center gap-4">
                    <span className="h-[1px] w-24 bg-accent"></span>
                    <span className="text-xs font-mono uppercase text-muted tracking-widest">[ 001_MANIFESTO ]</span>
                </div>

                <p
                    ref={textRef}
                    className="text-4xl md:text-[5vw] leading-[1.1] tracking-tighter text-muted text-justify-justify break-words uppercase"
                >
                    We do not design for the gallery. We design for the flesh. Clothing that is not just worn, but inhabited. A raw dialogue between structure and self, noise and silence. Kæst is the armor for the modern obscure.
                </p>

                <div className="mt-32 flex justify-between items-end border-t border-white/10 pt-8">
                    <span className="font-mono text-xs text-muted">Thinking Process</span>
                    <Link href="/about" className="group flex items-center gap-2 text-sm uppercase tracking-widest text-text hover:text-accent transition-colors duration-300">
                        <span>Read Full Story</span>
                        <MoveUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Background enhancement */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
