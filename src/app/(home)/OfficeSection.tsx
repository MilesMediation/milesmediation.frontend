"use client";

import {useState, useRef, useEffect, useMemo} from "react";
import { OfficeData } from "@/types/api";
import {gsap} from "gsap";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";

interface OfficesSectionProps {
  officesData?: OfficeData[];
}

// Carousel Configuration
const CAROUSEL_CONFIG = {
    autoplay: {
        enabled: false,
        delay: 5000, // milliseconds
    },
    visibleCards: 3, // Number of cards to show at once
    infiniteLoop: true, // Enable infinite scrolling
    cardWidth: 330, // pixels
    gap: 24, // pixels between cards
    animation: {
        duration: 0.6, // seconds
        ease: "power2.out" as const,
    },
};

// Fallback offices data
const fallbackOffices = [
    {name: "Chicago", image: "/heroBanner.png", url: "/offices/chicago", description: "Experience world-class mediation and arbitration services in the heart of Chicago."},
    {name: "Atlanta", image: "/cardImgSample1.png", url: "/offices/atlanta", description: "Our Atlanta office provides comprehensive ADR solutions for the Southeast region."},
    {name: "Boston", image: "/cardImgSample1.png", url: "/offices/boston", description: "Leading the Northeast in alternative dispute resolution excellence."},
    {name: "Birmingham", image: "/offices/atlanta.png", url: "/offices/birmingham", description: "Dedicated ADR services for the Central United States."},
    {name: "New York", image: "/cardImgSample1.png", url: "/offices/new-york", description: "Premier dispute resolution services in the nation's financial capital."},
    {name: "Los Angeles", image: "/offices/atlanta.png", url: "/offices/los-angeles", description: "Innovative ADR solutions for the West Coast market."},
];

export default function OfficesSection({ officesData }: OfficesSectionProps) {
    const initialOffices = useMemo(() => officesData && officesData.length > 0 
        ? officesData.map(office => ({
            name: office.name,
            image: office.featuredImage?.url ? `${NEXT_URL_BACKOFFICE}${office.featuredImage.url}` : "/heroBanner.png",
            url: `/offices/${office.slug}`,
            description: office.Description,
            telephone: office.telephone,
            email: office.email,
            address: office.address
        }))
        : fallbackOffices, [officesData]);

    // Duplicate offices for infinite loop if enabled
    const offices = useMemo(() => 
        CAROUSEL_CONFIG.infiniteLoop 
            ? [...initialOffices, ...initialOffices, ...initialOffices]
            : initialOffices
    , [initialOffices]);

    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const heroCardRef = useRef<HTMLDivElement>(null);
    const heroCardPreviousRef = useRef<HTMLDivElement>(null);
    const [canNavigate, setCanNavigate] = useState(true);
    const [activeOfficeIndex, setActiveOfficeIndex] = useState(0);

    // Use configuration values
    const cardWidth = CAROUSEL_CONFIG.cardWidth + CAROUSEL_CONFIG.gap;
    const totalCards = initialOffices.length;
    const initialOffset = -(cardWidth * totalCards);

    useEffect(() => {
        if (!trackRef.current) return;

        // Set initial position to middle set if infinite loop is enabled
        if (CAROUSEL_CONFIG.infiniteLoop) {
            // Start at the beginning of the middle set (the offset position)
            gsap.set(trackRef.current, { x: 0 });
            // Calculate initial active index (starting at 0)
            setActiveOfficeIndex(0);
        } else {
            gsap.set(trackRef.current, { x: 0 });
            setActiveOfficeIndex(0);
        }

        // Create autoplay animation if enabled
        if (CAROUSEL_CONFIG.autoplay.enabled) {
            const animate = () => {
                if (!trackRef.current) return;
                
                const timeline = gsap.timeline({
                    onComplete: () => {
                        if (CAROUSEL_CONFIG.infiniteLoop) {
                            // Seamlessly loop back
                            const currentX = gsap.getProperty(trackRef.current, "x") as number;
                            if (Math.abs(currentX) >= Math.abs(initialOffset) * 2) {
                                gsap.set(trackRef.current, { x: initialOffset });
                            }
                        }
                        
                        // Calculate active index based on position
                        const currentX = gsap.getProperty(trackRef.current, "x") as number;
                        const newIndex = Math.abs(Math.round(currentX / cardWidth)) % totalCards;
                        setActiveOfficeIndex(newIndex);
                        
                        // Continue autoplay
                        setTimeout(animate, CAROUSEL_CONFIG.autoplay.delay);
                    }
                });

                timeline.to(trackRef.current, {
                    x: `-=${cardWidth}`,
                    duration: CAROUSEL_CONFIG.animation.duration,
                    ease: CAROUSEL_CONFIG.animation.ease
                });
            };

            // Start autoplay
            const autoplayTimeout = setTimeout(animate, CAROUSEL_CONFIG.autoplay.delay);

            return () => {
                clearTimeout(autoplayTimeout);
            };
        }
    }, [cardWidth, initialOffset, totalCards]);

    const moveSlide = (direction: 'prev' | 'next') => {
        if (!trackRef.current || !canNavigate) return;
        
        setCanNavigate(false);

        const moveBy = direction === 'next' ? -cardWidth : cardWidth;

        const timeline = gsap.to(trackRef.current, {
            x: `+=${moveBy}`,
            duration: CAROUSEL_CONFIG.animation.duration,
            ease: CAROUSEL_CONFIG.animation.ease,
            onComplete: () => {
                if (CAROUSEL_CONFIG.infiniteLoop) {
                    // Check if we need to loop back
                    const currentX = gsap.getProperty(trackRef.current, "x") as number;
                    if (direction === 'next' && Math.abs(currentX) >= Math.abs(initialOffset) * 2) {
                        gsap.set(trackRef.current, { x: initialOffset });
                    } else if (direction === 'prev' && currentX >= 0) {
                        gsap.set(trackRef.current, { x: -(cardWidth * totalCards * 2) });
                    }
                }
                
                // Calculate active index based on position
                // Since we start at x: 0, we need to calculate which card is currently visible
                const currentX = gsap.getProperty(trackRef.current, "x") as number;
                // For infinite loop, offset starts at 0, so we just need to track position
                const newIndex = Math.abs(Math.round(currentX / cardWidth)) % totalCards;
                
                setActiveOfficeIndex(newIndex);
                setCanNavigate(true);
            }
        });

        return timeline;
    };

    // Animate hero card when active index changes
    useEffect(() => {
        if (!heroCardRef.current || !heroCardPreviousRef.current) return;

        const titleElement = document.getElementById('heroCardTitleOffice');
        const descriptionElement = document.getElementById('heroCardDescriptionOffice');

        // Get current background before changing
        const currentBg = heroCardRef.current.style.backgroundImage;
        const currentOpacity = gsap.getProperty(heroCardRef.current, "opacity") as number;

        // If there's a current background, move it to the previous layer
        if (currentBg && currentOpacity > 0) {
            heroCardPreviousRef.current.style.backgroundImage = currentBg;
            gsap.set(heroCardPreviousRef.current, { opacity: 1 });
        } else {
            // First time, start with the current image visible
            gsap.set(heroCardRef.current, { opacity: 1 });
            return; // Don't animate on first mount
        }

        // Create timeline for smooth crossfade transition
        const tl = gsap.timeline();

        // Update the new background image
        if (heroCardRef.current) {
            heroCardRef.current.style.backgroundImage = `url('${initialOffices[activeOfficeIndex].image}')`;
        }

        // Fade out text
        tl.to([titleElement, descriptionElement], {
            opacity: 0,
            y: -10,
            duration: CAROUSEL_CONFIG.animation.duration * 0.5,
            ease: "power2.in"
        })
        // Crossfade: fade out previous, fade in current (simultaneously)
        .to(heroCardPreviousRef.current, {
            opacity: 0,
            duration: CAROUSEL_CONFIG.animation.duration,
            ease: "power2.out"
        }, 0.5)
        .to(heroCardRef.current, {
            opacity: 1,
            duration: CAROUSEL_CONFIG.animation.duration,
            ease: "power2.out"
        }, 0.5)
        // Fade in text
        .fromTo([titleElement, descriptionElement],
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: CAROUSEL_CONFIG.animation.duration,
                ease: "power2.out"
            },
            0.5 + CAROUSEL_CONFIG.animation.duration * 0.3
        );
    }, [activeOfficeIndex, initialOffices]);

    const handlePrev = () => moveSlide('prev');
    const handleNext = () => moveSlide('next');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            handlePrev();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            handleNext();
        }
    };

    return (
        <section
            id="officesSection"
            className="bg-[var(--Dark-Green_1,#003135)] mb-0 text-white px-4 md:px-12 py-[100px] flex flex-col
            md:flex-col gap-8 items-center overflow-hidden md:h-[950px] relative"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            style={{
                backgroundImage: `url('/bg-demo-city.png')`,
                backgroundSize: 'cover',
            }}
        >
            {/* Hero card overlay - will expand when first card is active */}
            {/* Previous hero card for smooth transition */}
            <div 
                ref={heroCardPreviousRef}
                className="absolute inset-0 z-40 pointer-events-none opacity-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 to-gray-950/90"></div>
            </div>
            {/* Current hero card */}
            <div 
                ref={heroCardRef}
                className="absolute inset-0 z-40 pointer-events-none opacity-0"
                style={{
                    backgroundImage: `url('${initialOffices[activeOfficeIndex].image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 to-gray-950/90"></div>
            </div>
            <div className={'z-100 container w-full  border-b border-white/50 pb-4'}>
                <h1 className={'text-5xl font-bold'}>Our Offices</h1>
            </div>

            <div className={'absolute container  w-full h-full top-0 left-0 z-20 bg-gradient-to-b from-teal-900/50 to-gray-950/95'}></div>
            


            <div className="container  flex relative z-100 mt-20">
                {/* Left Info Panel */}
                <div className="w-full md:w-1/2 space-y-6 z-10 md:pr-5">
                    <h3 id={'heroCardTitleOffice'} className="font-title text-[24px] md:text-[32px] uppercase font-bold">
                        {initialOffices[activeOfficeIndex].name}
                    </h3>
                    <p id={'heroCardDescriptionOffice'} className="font-body text-white text-[16px] leading-[24px]">
                        {initialOffices[activeOfficeIndex].description}
                    </p>

                    <button
                        className="mt-8 bg-white text-black rounded-md px-6 py-3 font-medium hover:bg-gray-100
                        transition-colors">
                        See all
                    </button>
                </div>

                {/* Right Carousel */}
                <div className="w-full md:w-1/2 overflow-hidden">
                    <div 
                        ref={containerRef} 
                        className="office-carousel-container"
                        style={{
                            width: `calc(${CAROUSEL_CONFIG.cardWidth}px * ${CAROUSEL_CONFIG.visibleCards} + ${CAROUSEL_CONFIG.gap}px * ${CAROUSEL_CONFIG.visibleCards - 1})`
                        }}
                    >
                        <div ref={trackRef} className="office-carousel-track">
                            {offices.map((office, index) => (
                                <div key={`${office.name}-${index}`} className="office-carousel-slide">
                                    <div className="cursor-pointer relative rounded-sm overflow-hidden shadow-lg w-[330px] h-[480px] office-card">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={office.image}
                                            alt={office.name}
                                            className="object-cover rounded-sm h-full w-full"
                                        />

                                        <div className="absolute bottom-4 left-4 z-10 text-white">
                                            <h3 className="text-xl font-title uppercase leading-none mb-1">
                                                {office.name}
                                            </h3>
                                            <a href={office.url}
                                                className="text-sm underline font-body inline-flex items-center group/link">
                                                See more
                                                <span className="ml-1 group-hover/link:translate-x-1 transition-transform duration-300">&gt;</span>
                                            </a>
                                        </div>

                                        <div className="absolute inset-0 bg-black/20 rounded-sm office-overlay"/>
                                        <div className="absolute inset-0 rounded-sm opacity-0 office-glow bg-gradient-to-t from-black/30 via-transparent to-transparent"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 mt-10 items-center">
                        <div id={'arrows'} className={'flex gap-4 '}>

                            <button
                                onClick={handlePrev}
                                onKeyDown={(e) => e.key === "Enter" && handlePrev()}
                                className="rounded-full border-1 w-14 h-14 border-white bg-transparent text-white flex items-center justify-center
                            text-lg hover:bg-gray-100/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white
                            focus:ring-offset-2 focus:ring-offset-[#003135]"
                                aria-label="Previous office"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={handleNext}
                                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                                className="rounded-full border-1 w-14 h-14 border-white bg-transparent text-white flex items-center justify-center
                            text-lg hover:bg-gray-100/50 transition-colors focus:outline-none focus:ring-2
                            focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003135]"
                                aria-label="Next office"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                        <div id="barSeparator" className={'w-full bg-white h-[1px]'}>

                        </div>
                        <div>
                            <span id={'CarouselIndex'} className={'text-5xl'}>{activeOfficeIndex + 1}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
