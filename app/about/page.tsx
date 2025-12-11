"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-black">

            {/* Header Section - Massive Typography */}
            <div className="h-screen flex flex-col justify-end p-4 md:p-12 pb-32 relative overflow-hidden">
                <h1 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter mix-blend-difference z-10">
                    <span className="block" data-scroll data-scroll-speed="0.2">Bureau</span>
                    <span className="block ml-[10vw] text-accent font-serif italic" data-scroll data-scroll-speed="0.5">Of</span>
                    <span className="block -mt-[2vw]" data-scroll data-scroll-speed="0.3">Flesh.</span>
                </h1>

                <div className="absolute top-12 right-12 text-right font-mono text-xs uppercase tracking-widest text-muted">
                    <p>[ EST. 2024 ]</p>
                    <p>[ SECTOR: APPAREL ]</p>
                    <p>[ ID: 994-22 ]</p>
                </div>
            </div>

            <div ref={containerRef} className="flex flex-col md:flex-row border-t border-border/40">
                {/* Sticky Side Navigation / Index */}
                <div className="hidden md:flex flex-col w-1/4 h-screen sticky top-0 border-r border-border/40 p-8 justify-between z-20 bg-background/50 backdrop-blur-sm">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted space-y-2">
                        <p className="text-accent">[ Index ]</p>
                        <p>01. Origin</p>
                        <p>02. Process</p>
                        <p>03. Materials</p>
                    </div>
                    <div className="font-mono text-[10px] text-muted opacity-50">
                        <p>SCROLL_Y: MONITORING</p>
                        <p>RENDER: TURBO</p>
                    </div>
                </div>

                {/* Content Column */}
                <div className="w-full md:w-3/4 p-8 md:p-24 space-y-40">

                    {/* Section 01 */}
                    <Section
                        id="01"
                        title="Origin"
                        text="At KÆST, we believe clothing is more than what you wear — it is who you are. Born from a collision of brutalist architecture and organic form, we stand at the crossroads of culture and entropy."
                        img="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1955&auto=format&fit=crop"
                        meta="RAW_IMG_244.JPG // 24MB"
                    />

                    {/* Section 02 */}
                    <Section
                        id="02"
                        title="Process"
                        text="Quality is the foundation. We strip away the unnecessary until only the essential remains. Every stitch is a decision; every seam is a statement of intent."
                        img="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1887&auto=format&fit=crop"
                        meta="PROCESS_SCAN_09.TIFF // 48MB"
                    />

                    {/* Section 03 */}
                    <Section
                        id="03"
                        title="Materials"
                        text="We source fabrics that age, that remember, that carry the weight of their own existence. Cotton that breathes, silk that flows like liquid metal."
                        img="https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=1888&auto=format&fit=crop"
                        meta="TEXTILE_MACRO_02.PNG // 12MB"
                    />

                </div>
            </div>

            <Footer />
        </main>
    );
}

function Section({ id, title, text, img, meta }: { id: string, title: string, text: string, img: string, meta: string }) {
    return (
        <div className="group relative">
            <div className="flex items-baseline gap-4 mb-8">
                <span className="font-mono text-accent text-sm">[{id}]</span>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight uppercase">{title}</h2>
            </div>

            <div className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image src={img} alt={title} fill className="object-cover" />

                {/* Raw Data Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20">
                    <div className="font-mono text-[10px] text-white bg-black/50 w-fit px-2 py-1 backdrop-blur-md">
                        {meta}
                    </div>
                    <div className="w-full flex justify-between items-end">
                        <span className="font-mono text-[10px] text-white">+ CROSSHAIR_ENABLED</span>
                        <div className="w-4 h-4 border border-white rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-accent rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Grid Lines Overlay */}
                <div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100" />
            </div>

            <p className="text-lg md:text-xl text-muted max-w-xl font-light leading-relaxed text-justify-justify">
                {text}
            </p>
        </div>
    )
}
