"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  tag?: string;
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
      <div className="relative aspect-[3/4] overflow-hidden bg-surface border border-border/10 transition-colors duration-500 hover:border-accent/40">
        <motion.div
          className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </motion.div>

        {/* Raw Overlay */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-100 mix-blend-difference text-[#E8E9EB] pointer-events-none">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-black/50 backdrop-blur-sm px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              ID: {product.id.padStart(3, '0')}
            </span>
            <span className="font-mono text-[10px uppercase tracking-widest bg-accent/80 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.price}
            </span>
          </div>

          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="font-sans font-bold uppercase text-2xl md:text-3xl leading-none tracking-tighter">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Crosshair Corner Details */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      </div>
    </motion.div>
  );
}
