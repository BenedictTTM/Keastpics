"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const OPERATIVES = [
    {
        id: "OP_01",
        name: "Alexei K.",
        role: "Lead Design",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
    },
    {
        id: "OP_02",
        name: "Sara V.",
        role: "Architect",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
    },
    {
        id: "OP_03",
        name: "M. Jansen",
        role: "Engineering",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop"
    },
    {
        id: "OP_04",
        name: "Unit 734",
        role: "Logistics",
        image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1955&auto=format&fit=crop"
    }
];

export default function Operatives() {
    const [hoveredOp, setHoveredOp] = useState<number | null>(null);

    return (
        <section className="py-24 border-t border-white/10 relative">
            <div className="flex items-baseline justify-between mb-16">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                    Operatives
                </h2>
                <span className="font-mono text-xs text-accent">[ SECTOR_TEAM ]</span>
            </div>

            <div className="flex flex-col">
                {OPERATIVES.map((op, index) => (
                    <div
                        key={op.id}
                        className="relative group border-b border-white/10 py-8 cursor-crosshair flex justify-between items-center transition-colors hover:bg-white/5 px-4"
                        onMouseEnter={() => setHoveredOp(index)}
                        onMouseLeave={() => setHoveredOp(null)}
                    >
                        <div className="flex items-center gap-8">
                            <span className="font-mono text-xs text-muted opacity-50 group-hover:text-accent group-hover:opacity-100 transition-all">
                                {op.id}
                            </span>
                            <span className="text-2xl md:text-4xl font-bold uppercase tracking-tight">
                                {op.name}
                            </span>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-widest text-muted group-hover:text-white transition-colors">
                            {op.role}
                        </span>

                        {/* Hover Image Reveal - Floating */}
                        <motion.div
                            className="fixed z-50 pointer-events-none hidden md:block overflow-hidden"
                            style={{
                                top: "20%",
                                right: "20%",
                                width: "300px",
                                height: "400px"
                            }}
                            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            animate={{
                                opacity: hoveredOp === index ? 1 : 0,
                                scale: hoveredOp === index ? 1 : 0.9,
                                rotate: hoveredOp === index ? 0 : -5
                            }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                        >
                            <Image
                                src={op.image}
                                alt={op.name}
                                fill
                                className="object-cover grayscale contrast-125"
                            />
                            {/* Overlay data on image */}
                            <div className="absolute bottom-0 left-0 w-full p-2 bg-black/50 backdrop-blur-md">
                                <p className="font-mono text-[10px] text-accent">{op.id} // ACTIVE</p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
