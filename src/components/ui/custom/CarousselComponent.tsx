"use client";

import {useRef, useEffect, useState, useCallback} from "react";
import {gsap} from "gsap";

interface CarouselConfig {
    autoplay: {
        enabled: boolean;
        delay: number;
    };
    visibleCards: number;
    infiniteLoop: boolean;
    cardWidth: number;
    gap: number;
    animation: {
        duration: number;
        ease: string;
    };
}

interface CarouselComponentProps {
    items: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
    config: CarouselConfig;
    onControls?: (controls: { prev: () => void; next: () => void }) => void;
}

export default function CarouselComponent({ items, renderItem, config, onControls }: CarouselComponentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<gsap.core.Timeline | null>(null);
    const [canNavigate, setCanNavigate] = useState(true);

    // Duplicate items for infinite loop if enabled
    const carouselItems = config.infiniteLoop 
        ? [...items, ...items, ...items]
        : items;

    // Use original items count for calculations
    const uniqueItems = config.infiniteLoop ? items : carouselItems;

    // Calculate dimensions
    const cardWidth = config.cardWidth + config.gap;
    const totalCards = uniqueItems.length;
    const initialOffset = -(cardWidth * totalCards);

    useEffect(() => {
        if (!trackRef.current) return;

        // Set initial position to middle set if infinite loop is enabled
        if (config.infiniteLoop) {
            gsap.set(trackRef.current, { x: initialOffset });
        } else {
            gsap.set(trackRef.current, { x: 0 });
        }

        // Create autoplay animation if enabled
        if (config.autoplay.enabled) {
            const animate = () => {
                if (!trackRef.current) return;
                
                const timeline = gsap.timeline({
                    onComplete: () => {
                        if (config.infiniteLoop) {
                            // Seamlessly loop back
                            const currentX = gsap.getProperty(trackRef.current, "x") as number;
                            if (Math.abs(currentX) >= Math.abs(initialOffset) * 2) {
                                gsap.set(trackRef.current, { x: initialOffset });
                            }
                        }
                        // Continue autoplay
                        setTimeout(animate, config.autoplay.delay);
                    }
                });

                timeline.to(trackRef.current, {
                    x: `-=${cardWidth}`,
                    duration: config.animation.duration,
                    ease: config.animation.ease
                });
            };

            // Start autoplay
            const autoplayTimeout = setTimeout(animate, config.autoplay.delay);
            autoplayRef.current = autoplayRef.current;

            return () => {
                clearTimeout(autoplayTimeout);
            };
        }
    }, [cardWidth, initialOffset, config]);

    const moveSlide = useCallback((direction: 'prev' | 'next') => {
        if (!trackRef.current || !canNavigate) return;
        
        setCanNavigate(false);

        const moveBy = direction === 'next' ? -cardWidth : cardWidth;

        const timeline = gsap.to(trackRef.current, {
            x: `+=${moveBy}`,
            duration: config.animation.duration,
            ease: config.animation.ease,
            onComplete: () => {
                if (config.infiniteLoop) {
                    // Check if we need to loop back
                    const currentX = gsap.getProperty(trackRef.current, "x") as number;
                    if (direction === 'next' && Math.abs(currentX) >= Math.abs(initialOffset) * 2) {
                        gsap.set(trackRef.current, { x: initialOffset });
                    } else if (direction === 'prev' && currentX >= 0) {
                        gsap.set(trackRef.current, { x: -(cardWidth * totalCards * 2) });
                    }
                }
                setCanNavigate(true);
            }
        });

        return timeline;
    }, [canNavigate, cardWidth, initialOffset, totalCards, config]);

    const handlePrev = () => moveSlide('prev');
    const handleNext = () => moveSlide('next');

    // Expose controls to parent component
    useEffect(() => {
        if (onControls) {
            onControls({ prev: handlePrev, next: handleNext });
        }
    }, [onControls, handlePrev, handleNext]);

    return (
        <div 
            ref={containerRef} 
            className="office-carousel-container"
            style={{
                width: `calc(${config.cardWidth}px * ${config.visibleCards} + ${config.gap}px * ${config.visibleCards - 1})`
            }}
        >
            <div ref={trackRef} className="office-carousel-track">
                {carouselItems.map((item, index) => (
                    <div key={`carousel-item-${index}`} className="office-carousel-slide">
                        {renderItem(item, index)}
                    </div>
                ))}
            </div>
        </div>
    );
}

