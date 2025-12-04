"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovered(true);
        const handleMouseUp = () => setIsHovered(false);

        // Add hover listeners to interactive elements
        const handleLinkHover = () => setIsHovered(true);
        const handleLinkLeave = () => setIsHovered(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // Attach to all links and buttons
        const links = document.querySelectorAll("a, button, input, textarea, [role='button']");
        links.forEach((link) => {
            link.addEventListener("mouseenter", handleLinkHover);
            link.addEventListener("mouseleave", handleLinkLeave);
        });

        // Re-attach listeners when DOM changes (simple observer)
        const observer = new MutationObserver(() => {
            const newLinks = document.querySelectorAll("a, button, input, textarea, [role='button']");
            newLinks.forEach((link) => {
                link.removeEventListener("mouseenter", handleLinkHover);
                link.removeEventListener("mouseleave", handleLinkLeave);
                link.addEventListener("mouseenter", handleLinkHover);
                link.addEventListener("mouseleave", handleLinkLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        let timeout: NodeJS.Timeout;
        const hideCursor = () => {
            timeout = setTimeout(() => setIsVisible(false), 800);
        };
        window.addEventListener("mousemove", () => {
            clearTimeout(timeout);
            hideCursor();
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference",
                !isVisible && "opacity-0"
            )}
            style={{
                translateX: cursorX,
                translateY: cursorY,
                x: "-50%",
                y: "-50%",
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{
                scale: { duration: 0.2 },
                opacity: { duration: 0.2 },
            }}
        >
            {isHovered && (
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-md" />
            )}
        </motion.div>
    );
}
