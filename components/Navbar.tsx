"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { items, openCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 mix-blend-difference text-white"
            >
                <Link href="/" className="text-2xl font-light tracking-tighter hover:opacity-70 transition-opacity z-50">
                    KÆST
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-12 text-sm font-light tracking-widest uppercase">
                    <Link href="/collection" className="hover:text-red-500 transition-colors duration-300">
                        Portfolio
                    </Link>
                    <Link href="/about" className="hover:text-red-500 transition-colors duration-300">
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-8 text-sm font-light tracking-widest uppercase z-50">
                    <button
                        onClick={openCart}
                        className="hover:text-red-500 transition-colors duration-300 flex items-center gap-2"
                    >
                        <span>Cart</span>
                        <span className="text-[10px] align-top">({items.length})</span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden hover:text-red-500 transition-colors duration-300 uppercase"
                    >
                        {isMenuOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-12">
                            <Link
                                href="/collection"
                                onClick={toggleMenu}
                                className="text-5xl font-black uppercase tracking-tighter text-white hover:text-accent transition-colors"
                            >
                                Portfolio
                            </Link>
                            <Link
                                href="/about"
                                onClick={toggleMenu}
                                className="text-5xl font-black uppercase tracking-tighter text-white hover:text-accent transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/"
                                onClick={toggleMenu}
                                className="text-lg font-mono tracking-widest text-muted hover:text-white transition-colors mt-8"
                            >
                                [ HOME ]
                            </Link>
                        </nav>

                        {/* Decor */}
                        <div className="absolute bottom-8 left-0 w-full text-center">
                            <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em]">
                                System.Nav.v2
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
