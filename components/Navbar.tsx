"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function Navbar() {
    const { items, openCart } = useCart();

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 mix-blend-difference text-white"
        >
            <Link href="/" className="text-2xl font-light tracking-tighter hover:opacity-70 transition-opacity">
                KÆST
            </Link>

            <nav className="hidden md:flex gap-12 text-sm font-light tracking-widest uppercase">
                <Link href="/collection" className="hover:text-red-500 transition-colors duration-300">
                    Collection
                </Link>
                <Link href="/about" className="hover:text-red-500 transition-colors duration-300">
                    About
                </Link>
            </nav>

            <div className="flex items-center gap-8 text-sm font-light tracking-widest uppercase">
                <button
                    onClick={openCart}
                    className="hover:text-red-500 transition-colors duration-300 flex items-center gap-2"
                >
                    <span>Cart</span>
                    <span className="text-[10px] align-top">({items.length})</span>
                </button>
            </div>
        </motion.header>
    );
}
