"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="h-[80vh] w-full bg-[#09090b] flex flex-col items-center justify-center relative overflow-hidden border-t border-white/10">

            {/* Massive Grid Background (optional subtle detail) */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            ></div>

            <div className="relative z-10 w-full max-w-[90vw] flex flex-col items-center">
                <div className="w-full flex justify-between items-end mb-8 border-b border-white/20 pb-4">
                    <span className="font-mono text-xs text-muted uppercase tracking-widest">[ Contact Protocol ]</span>
                    <span className="font-mono text-xs text-accent uppercase tracking-widest">Open for Collaboration</span>
                </div>

                <MagneticButton>
                    <h2 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-[#1A1D21] hover:text-[#E8E9EB] transition-colors duration-500 cursor-pointer flex items-center gap-4 group">
                        <span>Initiate</span>
                        <ArrowUpRight className="w-[10vw] h-[10vw] text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-8 translate-x-8 group-hover:translate-y-0 group-hover:translate-x-0" />
                    </h2>
                </MagneticButton>

                <div className="mt-24 w-full flex flex-col md:flex-row justify-between text-muted uppercase font-mono text-sm tracking-wider">
                    <div className="flex flex-col gap-2">
                        <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                        <a href="#" className="hover:text-accent transition-colors">Twitter / X</a>
                        <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                    </div>
                    <div className="mt-8 md:mt-0 flex flex-col gap-2 text-right">
                        <span>London, UK / Global</span>
                        <span>hello@kaest.ventures</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.1, y: middleY * 0.1 }); // Magnetic strength
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
