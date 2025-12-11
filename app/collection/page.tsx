"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";

// Product Data (Prints/Series)
const PRODUCTS = [
    {
        id: "1",
        name: "Neon Nights",
        price: "$250",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60",
        description: "A limited edition print series capturing the vibrant neon pulse of late-night Tokyo. Printed on archival metallic paper.",
        tag: "STREET"
    },
    {
        id: "2",
        name: "Silent Dunes",
        price: "$300",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=60",
        description: "Minimalist composition of shifting sands and shadows. Captured in the Namib Desert. Fine art matte print.",
        tag: "LANDSCAPE"
    },
    {
        id: "3",
        name: "Concrete Void",
        price: "$200",
        image: "https://plus.unsplash.com/premium_photo-1727967194388-d838e1f37dec?w=600&auto=format&fit=crop&q=60",
        description: "Architectural study of brutalist structures in Eastern Europe. Focusing on geometry and raw texture.",
        tag: "CONCEPTUAL"
    },
    {
        id: "4",
        name: "Midnight Soul",
        price: "$450",
        image: "https://plus.unsplash.com/premium_photo-1727967194155-ed1b295c76ae?w=600&auto=format&fit=crop&q=60",
        description: "Intimate portrait series exploring the human condition in low light. Emotional, raw, and unfiltered.",
        tag: "PORTRAIT"
    },
    {
        id: "5",
        name: "Urban Decay",
        price: "$280",
        image: "https://plus.unsplash.com/premium_photo-1727967191702-785af4e14a6d?w=600&auto=format&fit=crop&q=60",
        description: "The beauty of forgotten places. Textures of rust, peeling paint, and reclamation by nature.",
        tag: "STREET"
    },
    {
        id: "6",
        name: "Solar Flare",
        price: "$320",
        image: "https://images.unsplash.com/photo-1499417267106-45cebb7187c9?w=1000&auto=format&fit=crop&q=60",
        description: "High-contrast study of natural light and lens flares. Abstract and energetic.",
        tag: "EDITORIAL"
    },
];

const FILTERS = ["ALL", "PORTRAIT", "LANDSCAPE", "EDITORIAL", "STREET", "CONCEPTUAL"];

export default function CollectionPage() {
    const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [showArchive, setShowArchive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { items, openCart } = useCart();

    const filteredProducts = activeFilter === "ALL"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.tag === activeFilter);

    // Chaos Grid Inserts
    const chaosInserts = [
        {
            index: 2,
            content: (
                <div className="w-full h-full min-h-[400px] flex items-center justify-center border border-accent/20 p-8">
                    <div className="text-center">
                        <p className="font-mono text-xs text-accent mb-4">[ CAPTURE_NOTE ]</p>
                        <p className="text-2xl font-bold uppercase max-w-sm mx-auto leading-tight">
                            "Light is not what we see. It is what allows us to see the truth."
                        </p>
                    </div>
                </div>
            )
        }
    ];

    const getInsert = (idx: number) => chaosInserts.find(i => i.index === idx)?.content;

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 md:px-12 selection:bg-accent selection:text-black">

            {/* Terminal Header */}
            <div className="mb-24 border-b border-border/40 pb-8 flex flex-col md:flex-row justify-between items-end gap-8 bg-background/80 backdrop-blur-sm md:sticky md:top-0 z-30 pt-8 mt-[-8rem]">
                <div>
                    <span className="font-mono text-xs text-accent mb-2 block animate-pulse">&gt; ARCHIVE_004_LOADED</span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                        Visual <span className="text-stroke-1 text-transparent stroke-current">Capture.</span>
                    </h1>
                </div>

                {/* Terminal Filter Bar */}
                <div className="font-mono text-xs md:text-sm uppercase flex flex-wrap gap-4 items-center">
                    <span className="text-muted mr-4 hidden md:inline">FILTER_MODE:</span>
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1 border transition-all duration-300 ${activeFilter === filter
                                ? 'border-accent bg-accent text-black'
                                : 'border-white/10 hover:border-white/50 text-muted hover:text-foreground'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chaotic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-8 max-w-[1800px] mx-auto min-h-[50vh]">
                {filteredProducts.map((product, index) => {
                    // Chaos Logic: Assign random spans/offsets based on index
                    const colSpan = index % 3 === 0 ? "md:col-span-6" : index % 3 === 1 ? "md:col-span-5" : "md:col-span-4 md:col-start-8";
                    const marginTop = index % 2 === 0 ? "mt-0" : "md:mt-32";

                    const insert = getInsert(index);

                    return (
                        <div key={product.id} className="contents">
                            {/* Render Insert if exists for this index (before the product) */}
                            {insert && (
                                <div className="md:col-span-4 md:col-start-2 flex items-center justify-center my-12 md:my-0">
                                    {insert}
                                </div>
                            )}

                            <div
                                className={`${colSpan} ${marginTop}`}
                            >
                                <ProductCard
                                    product={product}
                                    onClick={(p) => setSelectedProduct(p)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Categories Section */}
            <div className="mt-40 border-t border-white/10 pt-16">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                            Curated <span className="text-accent">Series</span>
                        </h2>
                        <p className="font-mono text-xs text-muted max-w-sm">
                            Explore the archive by category. Each print is a window into a captured moment of time and space.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                title: "Portrait",
                                filter: "PORTRAIT",
                                image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60"
                            },
                            {
                                title: "Street",
                                filter: "STREET",
                                image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=60"
                            },
                            {
                                title: "Landscape",
                                filter: "LANDSCAPE",
                                image: "https://plus.unsplash.com/premium_photo-1727967194388-d838e1f37dec?w=600&auto=format&fit=crop&q=60"
                            },
                            {
                                title: "Editorial",
                                filter: "EDITORIAL",
                                image: "https://plus.unsplash.com/premium_photo-1727967194155-ed1b295c76ae?w=600&auto=format&fit=crop&q=60"
                            }
                        ].map((category, index) => (
                            <button
                                key={category.title}
                                onClick={() => {
                                    setActiveFilter(category.filter);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="group relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 text-left"
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>

                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <span className="font-mono text-[10px] text-accent mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        00{index + 1}
                                    </span>
                                    <h3 className="text-2xl font-bold uppercase tracking-widest translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                                        {category.title}
                                    </h3>
                                    <div className="w-0 group-hover:w-full h-[1px] bg-accent transition-all duration-500 delay-100" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            <div className="mt-40">
                <Footer />
            </div>
        </main>
    );
}
