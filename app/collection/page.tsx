"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// Dummy Data
const PRODUCTS = [
    {
        id: "1",
        name: "Void Coat",
        price: "€2,400",
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1887&auto=format&fit=crop",
        description: "Full-length structured wool coat. Sharp shoulders, hidden placket. A silhouette that commands silence.",
    },
    {
        id: "2",
        name: "Ash Knit",
        price: "€890",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
        description: "Distressed cashmere blend. Asymmetric hem. The feeling of fog on skin.",
    },
    {
        id: "3",
        name: "Carbon Trouser",
        price: "€1,100",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1888&auto=format&fit=crop",
        description: "Wide-leg technical wool. Pleated front. Movement without restriction.",
    },
    {
        id: "4",
        name: "Obsidian Shirt",
        price: "€650",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        description: "Crisp poplin. Elongated cuffs. A uniform for the modern ascetic.",
    },
    {
        id: "5",
        name: "Silence Blazer",
        price: "€1,800",
        image: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=1887&auto=format&fit=crop",
        description: "Collarless construction. Raw edges. Tailoring reduced to its essence.",
    },
    {
        id: "6",
        name: "Dusk Dress",
        price: "€1,450",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
        description: "Silk drape. Open back. Fluidity captured in fabric.",
    },
];

export default function CollectionPage() {
    const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const { items, openCart } = useCart();

    // Parallax for odd/even columns could be added here, but for simplicity we'll stick to a clean masonry layout first.

    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-12">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 py-6 mix-blend-difference">
                <Link href="/" className="text-2xl font-light tracking-tighter text-text">KÆST</Link>
                <div className="flex gap-8 text-sm font-light tracking-widest uppercase text-text">
                    <span>Collection 01</span>
                    <button onClick={openCart} className="hover:text-accent transition-colors">
                        Cart ({items.length})
                    </button>
                </div>
            </header>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8 max-w-[1800px] mx-auto">
                {PRODUCTS.map((product, index) => (
                    <div
                        key={product.id}
                        className={`${index % 2 === 0 ? "md:mt-0" : "md:mt-32"}`} // Simple offset for masonry feel
                    >
                        <ProductCard
                            product={product}
                            onClick={(p) => setSelectedProduct(p)}
                        />
                    </div>
                ))}
            </div>

            {/* Modal */}
            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </main>
    );
}
