'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

export function SpotlightText({
    children,
    className = '',
    spotlightSize = 50, // Smaller default size
    baseColorClass = "text-zinc-800",
    spotlightColorClass = "text-white"
}: {
    children: React.ReactNode,
    className?: string,
    spotlightSize?: number,
    baseColorClass?: string,
    spotlightColorClass?: string
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Less damping for quicker response, stiffer for tighter following
    const springX = useSpring(mouseX, { stiffness: 700, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 700, damping: 30 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Tighter gradient for more focus. Reduced from 80% to 50% for concentrated glow.
    const maskImage = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${springX}px ${springY}px, black 0%, transparent 50%)`;

    return (
        <div
            ref={ref}
            className={`relative inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            {/* Base text (dimmed) */}
            <div className={`${baseColorClass} transition-colors duration-500`}>
                {children}
            </div>

            {/* Spotlight text (bright) */}
            <motion.div
                className={`absolute inset-0 pointer-events-none ${spotlightColorClass}`}
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage,
                    opacity: isHovered ? 1 : 0,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
