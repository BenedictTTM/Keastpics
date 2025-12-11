"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";

// Dummy Data
const PRODUCTS = [
    {
        id: "1",
        name: "Serafina Gown",
        price: "€2,400",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
        description: "A floor-length silk gown in deep midnight blue. Featuring a structured bodice and fluid drape, inspired by the night sky over the Savannah.",
        tag: "EVENING"
    },
    {
        id: "2",
        name: "Zaria Knit Dress",
        price: "€890",
        image: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=1887&auto=format&fit=crop",
        description: "Hand-woven cotton blend with intricate patterns. A modern interpretation of traditional weaving techniques, offering comfort and heritage.",
        tag: "DAYWEAR"
    },
    {
        id: "3",
        name: "Kente Structure",
        price: "€1,100",
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1934&auto=format&fit=crop",
        description: "Bold architectural dress utilizing Kente-inspired geometric patterns. A statement piece that bridges the gap between art and fashion.",
        tag: "CONCEPTUAL"
    },
    {
        id: "4",
        name: "Obsidian Silk",
        price: "€1,650",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1587&auto=format&fit=crop",
        description: "Pure black silk slip dress with asymmetric detailing. Minimalist luxury defined by the quality of the fabric and the precision of the cut.",
        tag: "EVENING"
    },
    {
        id: "5",
        name: "Terra Blazer Dress",
        price: "€1,800",
        image: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=1887&auto=format&fit=crop",
        description: "Earthy tones in a structured blazer dress silhouette. Sharp tailoring meets organic warmth.",
        tag: "TAILORING"
    },
    {
        id: "6",
        name: "Solaris Maxi",
        price: "€1,450",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1946&auto=format&fit=crop",
        description: "Vibrant yellow maxi dress with voluminous sleeves. Capturing the energy of the sun and the joy of movement.",
        tag: "DAYWEAR"
    },
];

const FILTERS = ["ALL", "EVENING", "DAYWEAR", "TAILORING", "CONCEPTUAL"];

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
                        <p className="font-mono text-xs text-accent mb-4">[ SYSTEM_NOTE ]</p>
                        <p className="text-2xl font-bold uppercase max-w-sm mx-auto leading-tight">
                            "Structure is an illusion. We only see what we are programmed to recognize."
                        </p>
                    </div>
                </div>
            )
        },
        {
            index: 5,
            content: (
                <div className="w-full h-full min-h-[300px] bg-accent/5 flex flex-col justify-between p-4 mix-blend-difference">
                    <span className="font-mono text-[10px] uppercase">Raw_Material_Log.txt</span>
                    <div className="font-mono text-xs opacity-70 break-all">
                        0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z
                        <br />
                        &gt;&gt; DECRYPTING...
                        <br />
                        &gt;&gt; ERROR: ENCRYPTION_TOO_STRONG
                    </div>
                </div>
            )
        }
    ];

    const getInsert = (idx: number) => chaosInserts.find(i => i.index === idx)?.content;

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 md:px-12 selection:bg-accent selection:text-black">

            {/* Terminal Header */}
            <div className="mb-24 border-b border-border/40 pb-8 flex flex-col md:flex-row justify-between items-end gap-8 bg-background/80 backdrop-blur-sm sticky top-0 z-30 pt-8 mt-[-8rem]">
                <div>
                    <span className="font-mono text-xs text-accent mb-2 block animate-pulse">&gt; COLLECTION_003_INIT</span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                        Raw <span className="text-stroke-1 text-transparent stroke-current">Structure.</span>
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
                        <>
                            {/* Render Insert if exists for this index (before the product) */}
                            {insert && (
                                <div className="md:col-span-4 md:col-start-2 flex items-center justify-center my-12 md:my-0">
                                    {insert}
                                </div>
                            )}

                            <div
                                key={product.id}
                                className={`${colSpan} ${marginTop}`}
                            >
                                <ProductCard
                                    product={product}
                                    onClick={(p) => setSelectedProduct(p)}
                                />
                            </div>
                        </>
                    )
                })}
            </div>

            {/* Archive Section - Hidden until unlocked */}
            <div className="mt-40 border-t border-dashed border-white/20 pt-16">
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="font-mono text-xs text-muted mb-4 uppercase tracking-widest">[ RESTRICTED AREA ]</p>

                    {!showArchive ? (
                        <button
                            onClick={() => setShowArchive(true)}
                            className="group relative px-8 py-4 bg-white/5 border border-white/10 text-xl font-bold uppercase tracking-widest hover:bg-accent hover:text-black transition-all duration-500 overflow-hidden"
                        >
                            <span className="relative z-10">Access Archive</span>
                            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="w-full mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-white/5 border border-white/5 flex items-center justify-center group cursor-not-allowed">
                                    <span className="font-mono text-xs text-muted group-hover:text-red-500 transition-colors">
                                        [ FILE_CORRUPTED ]
                                        <br />
                                        ARCHIVE_00{i}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    )}
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
