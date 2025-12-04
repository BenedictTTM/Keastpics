"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";

export default function Cart() {
    const { isOpen, closeCart, items, removeFromCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]"
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 z-[70] h-full w-full md:w-[500px] bg-surface border-l border-border p-8 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-2xl font-serif text-text">Cart ({items.length})</h2>
                            <button onClick={closeCart} className="text-text hover:text-accent transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-muted font-light">
                                    Your cart is empty.
                                </div>
                            ) : (
                                items.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex gap-4 group">
                                        <div className="relative w-24 h-32 bg-black/20">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="text-lg font-serif text-text">{item.name}</h3>
                                                <p className="text-sm text-muted">{item.price}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="self-start text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors flex items-center gap-2"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-8 pt-8 border-t border-border">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-sm uppercase tracking-widest text-muted">Total</span>
                                <span className="text-xl font-serif text-text">
                                    €{items.reduce((acc, item) => acc + parseInt(item.price.replace(/[^0-9]/g, "")), 0).toLocaleString()}
                                </span>
                            </div>
                            <button className="w-full py-4 bg-text text-black text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-colors duration-300">
                                Checkout
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
