'use client'

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface AnimatedHeroTextProps {
    items: string[];
}

export default function AnimatedHeroText({ items }: AnimatedHeroTextProps) {
    // Refs for animation
    const textRef1 = useRef<HTMLHeadingElement>(null);
    const textRef2 = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // GSAP animation setup
    useEffect(() => {
        if (!textRef1.current || !textRef2.current || !containerRef.current || items.length === 0) return;

        const text1 = textRef1.current;
        const text2 = textRef2.current;

        // Set initial positions - text1 visible, text2 below and hidden
        gsap.set(text1, { y: 0, opacity: 1 });
        gsap.set(text2, { y: 100, opacity: 0 });

        let index = 0;
        let animationTimeoutId: NodeJS.Timeout | null = null;
        
        const animate = () => {
            const nextIndex = (index + 1) % items.length;
            const isEven = index % 2 === 0;
            const currentText = isEven ? text1 : text2;
            const nextText = isEven ? text2 : text1;

            // Update text content
            currentText.textContent = items[index];
            nextText.textContent = items[nextIndex];

            // Ensure next text is positioned below
            gsap.set(nextText, { y: 100, opacity: 0 });

            // Animate: current slides up and fades out, next slides up and fades in
            const tl = gsap.timeline({
                onComplete: () => {
                    // After animation, nextText is now visible at y:0, currentText is hidden above
                    // Reset currentText position for next cycle (move it below)
                    gsap.set(currentText, { y: 100, opacity: 0 });

                    // Update index for next animation
                    index = nextIndex;
                    setCurrentIndex(nextIndex);

                    // Schedule next animation
                    animationTimeoutId = setTimeout(animate, 3000); // Wait 3 seconds before next change
                }
            });

            tl.to(currentText, {
                y: -100,
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut"
            })
            .to(nextText, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.inOut"
            }, 0); // Start at same time as current text animation
        };

        // Start animation after initial delay
        const initialTimeoutId = setTimeout(animate, 2000);

        return () => {
            if (initialTimeoutId) clearTimeout(initialTimeoutId);
            if (animationTimeoutId) clearTimeout(animationTimeoutId);
            gsap.killTweensOf([text1, text2]);
        };
    }, [items]);

    if (items.length === 0) return null;
    {console.log(currentIndex)}
    return (
        <div 
            ref={containerRef}
            className="relative overflow-hidden h-[4rem] sm:h-[5rem] md:h-[5rem] mt-1 w-full"
        >
            <h1
                ref={textRef1}
                className="absolute uppercase text-5xl sm:text-5xl md:text-6xl font-bold tracking-tight  p-1"
                style={{ fontFamily: 'var(--font-neue-plak)' }}
            >
                {items[0]}
            </h1>
            <h1
                ref={textRef2}
                className="absolute uppercase text-5xl sm:text-5xl md:text-6xl font-bold tracking-tight  p-1"
                style={{ fontFamily: 'var(--font-neue-plak)' }}
            >
                {items[1] || items[0]}
            </h1>
        </div>
    );
}

