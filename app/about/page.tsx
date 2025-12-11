"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import TextReveal from "@/components/TextReveal";
import Operatives from "@/components/Operatives";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-black font-sans">

            {/* Header Section - Brutalist Data Monitor */}
            <div className="h-screen relative p-4 md:p-8 flex flex-col justify-between overflow-hidden border-b border-white/10">
                <div className="flex justify-between items-start font-mono text-[10px] text-accent uppercase tracking-widest">
                    <div className="flex gap-8">
                        <span>SYS.STATUS: ONLINE</span>
                        <span>LATENCY: 12MB</span>
                    </div>
                    <div>
                        <span>[ SECURE CONNECTION ]</span>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <div className="w-[80vw] h-[80vw] border-[0.5px] border-accent rounded-full animate-spin-slow" />
                    <div className="absolute w-[60vw] h-[60vw] border-[0.5px] border-accent rounded-full animate-reverse-spin" />
                </div>

                <div className="relative z-10 mix-blend-difference">
                    <TextReveal mode="word" trigger="mount" className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-justify-justify">
                        Bureau Of Flesh.
                    </TextReveal>
                    <div className="mt-8 flex justify-end">
                        <p className="max-w-md text-sm md:text-base font-mono text-muted text-right">
                            We exist in the spaces between. <br />
                            Digital brutaity meets organic decay. <br />
                            Est. 2024
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-end font-mono text-[10px] text-muted uppercase">
                    <span>SCROLL_TO_INITIATE</span>
                    <span>V.3.0.1</span>
                </div>
            </div>

            <div ref={containerRef} className="flex flex-col md:flex-row">

                {/* Content Column */}
                <div className="w-full p-4 md:p-12 space-y-32">

                    {/* Philosophy / Manifesto - Aggressive Type */}
                    <div className="py-24 max-w-[90vw] mx-auto">
                        <span className="font-mono text-xs text-accent mb-8 block">[ 001_PHILOSOPHY ]</span>
                        <TextReveal className="text-4xl md:text-7xl font-bold uppercase leading-[1.1] tracking-tight">
                            We do not design for the gallery. We design for the flesh. A raw dialogue between structure and self, noise and silence. Kæst is the armor for the modern obscure.
                        </TextReveal>
                    </div>

                    {/* Section 01 - Broken Grid Layout */}
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-7 relative group">
                            <div className="aspect-[4/5] relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1955&auto=format&fit=crop"
                                    alt="Origin"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100" />
                            </div>
                        </div>
                        <div className="md:col-span-5 md:pl-12">
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="font-mono text-accent text-sm">[01]</span>
                                <h2 className="text-5xl font-black uppercase tracking-tight">Origin</h2>
                            </div>
                            <p className="text-lg text-muted leading-relaxed">
                                Born from a collision of brutalist architecture and organic form. We replicate the chaos of the natural world through precision engineering.
                            </p>
                            <div className="mt-8 font-mono text-[10px] text-accent border border-accent/20 px-2 py-1 inline-block">
                                REF: BRUTAL_NATURE_01
                            </div>
                        </div>
                    </section>

                    {/* Section 02 - Inverted Layout */}
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-24 border-b border-white/10">
                        <div className="md:col-span-5 md:pr-12 md:text-right order-2 md:order-1">
                            <div className="flex items-baseline gap-4 mb-4 justify-end">
                                <h2 className="text-5xl font-black uppercase tracking-tight">Process</h2>
                                <span className="font-mono text-accent text-sm">[02]</span>
                            </div>
                            <p className="text-lg text-muted leading-relaxed">
                                Deconstruction is creation. We strip away functionality to find the aesthetic core, then rebuild it stronger. Every seam is a scar.
                            </p>
                        </div>
                        <div className="md:col-span-7 order-1 md:order-2 relative group">
                            <div className="aspect-video relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1887&auto=format&fit=crop"
                                    alt="Process"
                                    fill
                                    className="object-cover"
                                />
                                {/* Crosshair Overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute top-4 left-4 w-4 h-[1px] bg-white mix-blend-difference" />
                                    <div className="absolute top-4 left-4 h-4 w-[1px] bg-white mix-blend-difference" />
                                    <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-white mix-blend-difference" />
                                    <div className="absolute bottom-4 right-4 h-4 w-[1px] bg-white mix-blend-difference" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team Section */}
                    <Operatives />

                </div>
            </div>

            <Footer />
        </main>
    );
}
