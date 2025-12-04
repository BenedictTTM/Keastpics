"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <main className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Left Column - Fixed Text */}
            <div className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center p-12 md:p-24 border-r border-border/10">
                <div className="max-w-lg">
                    <h1 className="text-4xl md:text-6xl font-serif mb-12 text-text leading-tight">
                        We remove until nothing can be removed.
                    </h1>
                    <div className="space-y-8 text-lg font-light text-muted leading-relaxed">
                        <p>
                            KÆST is a study in silence. Born in Copenhagen, we explore the space between brutalism and softness.
                        </p>
                        <p>
                            We reject the noise of the season. We create uniforms for the modern ascetic. Garments that demand nothing, yet command everything.
                        </p>
                        <p>
                            Concrete. Cashmere. Void.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column - Scrolling Images */}
            <div ref={containerRef} className="w-full md:w-1/2 min-h-[200vh] bg-surface relative overflow-hidden">
                <div className="flex flex-col gap-0">
                    <div className="h-screen w-full relative grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                            alt="Fabric texture"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="h-screen w-full relative grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                            alt="Empty street"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="h-screen w-full relative grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
                            alt="Atelier hands"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
