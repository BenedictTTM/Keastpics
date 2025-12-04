"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    description?: string;
}

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const { addToCart } = useCart();

    // Lock body scroll when modal is open
    useEffect(() => {
        if (product) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [product]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, size: selectedSize });
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {product && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
                >
                    <div className="relative w-full h-full flex flex-col md:flex-row">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-50 text-text hover:text-accent transition-colors"
                        >
                            <X size={32} strokeWidth={1} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                            <motion.div
                                layoutId={`product-${product.id}`}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Details Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-20 flex flex-col justify-center bg-surface"
                        >
                            <h2 className="font-serif text-6xl md:text-8xl text-text mb-4 leading-none">
                                {product.name}
                            </h2>
                            <p className="text-xl font-light text-muted mb-8">{product.price}</p>

                            <p className="text-sm md:text-base font-light text-text/80 mb-12 leading-relaxed max-w-md">
                                {product.description || "Italian cashmere blend. Hand-finished in Copenhagen. Oversized fit with dropped shoulders and raw hem details. A study in silence and texture."}
                            </p>

                            {/* Size Selector */}
                            <div className="flex gap-4 mb-12">
                                {["S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs transition-colors ${selectedSize === size
                                            ? "bg-accent border-accent text-black"
                                            : "hover:border-accent text-muted hover:text-text"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            {/* Add to Bag */}
                            <button
                                onClick={handleAddToCart}
                                className="group relative w-full max-w-xs py-4 border-t border-b border-border text-left overflow-hidden"
                            >
                                <span className="relative z-10 text-sm tracking-widest uppercase transition-colors group-hover:text-accent">
                                    Add to Bag
                                </span>
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
