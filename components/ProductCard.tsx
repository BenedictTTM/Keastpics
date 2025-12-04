"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    description?: string;
}

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layoutId={`product-${product.id}`}
            className="relative w-full cursor-pointer group"
            onClick={() => onClick(product)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <motion.div
                    className="w-full h-full"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                    />
                </motion.div>

                {/* Price - Top Right */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs font-light tracking-widest text-text">{product.price}</span>
                </div>

                {/* Name - Bottom Left */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="font-serif text-4xl md:text-5xl text-text leading-none">{product.name}</h3>
                </div>
            </div>
        </motion.div>
    );
}
