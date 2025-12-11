"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    mode?: "char" | "word";
    trigger?: "scroll" | "mount";
}

export default function TextReveal({ children, className = "", mode = "word", trigger = "scroll" }: TextRevealProps) {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elRef.current) return;

        const content = children;
        let html = "";

        if (mode === "word") {
            html = content.split(" ").map(word =>
                `<span class="inline-block overflow-hidden"><span class="reveal-text inline-block translate-y-full opacity-0">${word}</span></span>`
            ).join(" ");
        } else {
            html = content.split("").map(char =>
                char === " " ?
                    `<span>&nbsp;</span>` :
                    `<span class="inline-block overflow-hidden"><span class="reveal-text inline-block translate-y-full opacity-0">${char}</span></span>`
            ).join("");
        }

        elRef.current.innerHTML = html;

        const targets = elRef.current.querySelectorAll(".reveal-text");

        const anim = gsap.to(targets, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: "power4.out",
            paused: trigger === "scroll"
        });

        if (trigger === "scroll") {
            ScrollTrigger.create({
                trigger: elRef.current,
                start: "top 85%",
                onEnter: () => anim.play(),
            });
        } else {
            anim.play();
        }

        return () => {
            anim.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [children, mode, trigger]);

    return (
        <div ref={elRef} className={`${className} leading-tight overflow-hidden`} />
    );
}
