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

        {/* Raw Overlay - Tech Specs */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 pointer-events-none mix-blend-difference text-white">

          {/* Header Specs */}
          <div className="flex justify-between items-start text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col gap-1">
              <span>REF: {product.id.padStart(4, '0')}</span>
              <span>CAT: {product.tag || 'N/A'}</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span>{product.price}</span>
              <span>IN_STOCK</span>
            </div>
          </div>

          {/* Center Crosshair (Only visible on hover) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/50" />
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/50" />
          </div>

          {/* Footer Title */}
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <h3 className="font-sans font-black uppercase text-3xl md:text-4xl leading-[0.85] tracking-tighter">
              {product.name}
            </h3>
            <div className="h-[1px] w-0 group-hover:w-full bg-white mt-2 transition-all duration-700 delay-100" />
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
