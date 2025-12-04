"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: string;
    image: string;
    size?: string;
    description?: string;
}

interface CartContextType {
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const addToCart = (item: CartItem) => {
        setItems([...items, item]);
        setIsOpen(true);
    };
    const removeFromCart = (id: string) => setItems(items.filter((i) => i.id !== id));

    return (
        <CartContext.Provider value={{ isOpen, openCart, closeCart, items, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
