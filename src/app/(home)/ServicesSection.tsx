"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ButtonType, ServicesSectionContent, ServicesSectionItem } from "@/types/api"
import { NEXT_URL_BACKOFFICE } from "@/lib/globalConstants"

const FALLBACK_TABS = [
    {
        label: "Mediation",
        content:
            "In mediation, parties engage a neutral to facilitate a negotiated resolution of either some or all issues in dispute. The two key elements of mediation are party control and confidentiality.",
        image: "/demo/mediation-prev.jpg",
    },
    {
        label: "Arbitration",
        content:
            "Arbitration involves a neutral arbitrator who renders a legally binding decision after hearing evidence and arguments. It is typically faster and more flexible than litigation.",
        image: "/demo/adr-thumb.jpg",
    },
    {
        label: "ADR On Demand",
        content:
            "ADR On Demand offers flexible, technology-driven options for resolving disputes, giving clients control over timing, format, and platform.",
        image: "/demo/arbitration-prev.jpg",
    },
]

const CROSSFADE_DURATION = 1.1
const PROGRESS_DURATION = 4
const AUTOPLAY_ENABLED = true

interface ServiceDataType {
    servicesData: ServicesSectionContent
}

interface ServiceTabItem {
    label: string
    content: string
    image: string
    button?: ButtonType
}

const toAbsoluteUrl = (url?: string) => {
    if (!url) return undefined
    return url.startsWith("http") ? url : `${NEXT_URL_BACKOFFICE}${url}`
}

const preloadImage = (url: string) =>
    new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = url
        if (img.complete) {
            resolve()
        } else {
            img.onload = () => resolve()
            img.onerror = reject
        }
    })

export default function ServicesSection({ servicesData }: ServiceDataType) {
    const [activeTab, setActiveTab] = useState(0)
    const progressRefs = useRef<(HTMLDivElement | null)[]>([])
    const contentRef = useRef<HTMLDivElement | null>(null)
    const slideRefs = useRef<HTMLDivElement[]>([])
    const currentIndexRef = useRef(0)
    const fadeTimelineRef = useRef<gsap.core.Timeline | null>(null)
    const progressTimelineRef = useRef<gsap.core.Timeline | null>(null)
    const imagesLoadedRef = useRef<boolean[]>([])

    const tabs = useMemo<ServiceTabItem[]>(() => {
        const list: ServicesSectionItem[] = servicesData?.services_list ?? []

        if (!list.length) {
            return FALLBACK_TABS
        }

        return list.map((service: ServicesSectionItem, index: number) => {
            const fallback = FALLBACK_TABS[index % FALLBACK_TABS.length]
            const imageUrl = toAbsoluteUrl(service.featured_image?.url ?? undefined) ?? fallback.image

            return {
                label: service.title || fallback.label,
                content: service.description ?? fallback.content,
                image: imageUrl,
                button: service.button?.[0],
            }
        })
    }, [servicesData])

    const totalTabs = tabs.length

    useEffect(() => {
        if (!totalTabs) return
        setActiveTab((prev) => (prev >= totalTabs ? 0 : prev))
        imagesLoadedRef.current = tabs.map(() => false)
        slideRefs.current = slideRefs.current.slice(0, totalTabs)
    }, [tabs, totalTabs])

    useEffect(() => {
        if (!contentRef.current) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0.5, y: 0 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            )
        })

        return () => ctx.revert()
    }, [activeTab])

    const runAutoplay = useCallback(() => {
        progressTimelineRef.current?.kill()

        progressRefs.current.forEach((ref, idx) => {
            if (!ref) return
            gsap.set(ref, {
                width: 0,
                backgroundColor: idx === activeTab ? "var(--color-secondary-green,#0FA4AF)" : "transparent",
            })
        })

        const bar = progressRefs.current[activeTab]
        if (!bar) {
            return () => undefined
        }

        gsap.set(bar, { width: 0, backgroundColor: "var(--color-secondary-green,#0FA4AF)" })

        if (!AUTOPLAY_ENABLED || totalTabs <= 1) {
            gsap.set(bar, { width: "100%" })
            return () => undefined
        }

        progressTimelineRef.current = gsap.timeline({
            onComplete: () => setActiveTab((prev) => (prev + 1) % totalTabs),
        })

        progressTimelineRef.current.to(bar, {
            width: "100%",
            duration: PROGRESS_DURATION,
            ease: "linear",
        })

        return () => {
            progressTimelineRef.current?.kill()
        }
    }, [activeTab, totalTabs])

    useEffect(() => runAutoplay(), [runAutoplay])

    const fadeToSlide = useCallback(
        async (targetIndex: number) => {
            if (targetIndex === currentIndexRef.current) return

            const slides = slideRefs.current
            const currentSlide = slides[currentIndexRef.current]
            const nextSlide = slides[targetIndex]
            if (!nextSlide) return

            if (!imagesLoadedRef.current[targetIndex]) {
                try {
                    await preloadImage(tabs[targetIndex].image)
                    imagesLoadedRef.current[targetIndex] = true
                } catch (error) {
                    console.error("Failed to preload image", error)
                }
            }

            fadeTimelineRef.current?.progress(1).kill()
            fadeTimelineRef.current = gsap.timeline({
                defaults: { duration: CROSSFADE_DURATION, ease: "power1.inOut" },
                onComplete: () => {
                    currentIndexRef.current = targetIndex
                    fadeTimelineRef.current = null
                },
            })

            if (currentSlide) {
                fadeTimelineRef.current.set(currentSlide, { zIndex: 2, autoAlpha: 1 })
                fadeTimelineRef.current.to(currentSlide, { autoAlpha: 0 }, 0)
            }

            fadeTimelineRef.current.set(nextSlide, { zIndex: 3, autoAlpha: 1 }, 0)
            fadeTimelineRef.current.add(() => {
                slides.forEach((slide, idx) => {
                    if (!slide) return
                    if (idx === targetIndex) {
                        gsap.set(slide, { autoAlpha: 1, zIndex: 3 })
                    } else {
                        gsap.set(slide, { autoAlpha: 0, zIndex: 1 })
                    }
                })
            })
        },
        [tabs]
    )

    useEffect(() => {
        const slides = slideRefs.current
        slides.forEach((slide, idx) => {
            if (!slide) return
            gsap.set(slide, {
                autoAlpha: idx === activeTab ? 1 : 0,
                zIndex: idx === activeTab ? 3 : 1,
            })
        })
        currentIndexRef.current = activeTab
        imagesLoadedRef.current[activeTab] = true
    }, [activeTab, totalTabs])

    useEffect(() => {
        if (!tabs.length) return
        fadeToSlide(activeTab)
    }, [activeTab, fadeToSlide, tabs.length])

    useEffect(() => {
        return () => {
            fadeTimelineRef.current?.kill()
            progressTimelineRef.current?.kill()
        }
    }, [])

    if (!servicesData.is_available || !tabs.length) return null

    const currentTab = tabs[activeTab] ?? tabs[0]
    const button = currentTab.button
    const buttonVariant =
        button?.variant === "outlined"
            ? "outlined"
            : button?.variant === "link"
            ? "link"
            : "contained"



    return (
        <section id="service-section" className="w-full px-4 mb-0 md:px-12 py-16 md:py-[100px] xl:h-[950px]">
            <div className="w-full mx-auto grid grid-cols-1 gap-5 items-center container">
                <div className="w-full">
                    <h2 className="font-title text-[32px] md:text-[40px] text-[var(--Dark-Green_1,#003135)] mb-6 ">
                        {servicesData.title ? servicesData.title : "Our Services"}
                    </h2>

                    <div className="flex gap-6 text-lg presenting font-title mb-4">
                        {tabs.map((tab, index) => (
                            <div key={`${tab.label}-${index}`} className="relative w-full">
                                <button
                                    onClick={() => setActiveTab(index)}
                                    className={`transition-all buttonTab duration-200 border-b-2 w-full text-left pb-2 ${
                                        activeTab === index
                                            ? "text-[var(--Dark-Green_1,#003135)] font-semibold border-transparent"
                                            : "text-gray-700 border-gray-200 hover:text-[var(--Dark-Green_1,#003135)]"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200">
                                    <div
                                        ref={(el) => {
                                            progressRefs.current[index] = el
                                        }}
                                        className="h-full"
                                        style={{ width: 0, backgroundColor: "transparent" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="cardImageService" className="w-full border-blue-400 relative ">
                    <div className="absolute inset-0 bg-black w-full h-full top-0 left-0 rounded-xl" />
                    <div ref={contentRef}>
                        <div className="relative rounded-xl overflow-hidden bg-black carouselGsapContainer">
                            <div className="absolute inset-0 w-full h-[600px]">
                                {tabs.map((tab, index) => (
                                    <div
                                        key={`${tab.label}-${index}-slide`}
                                        ref={(el) => {
                                            if (el) slideRefs.current[index] = el
                                        }}
                                        className="carouselSlideGsap absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-0"
                                        style={{ backgroundImage: `url('${tab.image}')` }}
                                        aria-label={tab.label}
                                    />
                                ))}
                            </div>
                            <div className="relative w-full h-[600px] rounded-xl bg-black/20 pointer-events-none"></div>
                            <div className="border-t mx-5 border-white absolute bottom-0 py-5 grid grid-cols-12 z-30">
                                <p className="text-sm text-white text-[16px] leading-[24px] col-span-8">
                                    {currentTab.content}
                                </p>
                                <div className="col-span-4 text-right">
                                    {button?.target_url ? (
                                        <Button
                                            className="bg-transparent !text-white border-white"
                                            variant={buttonVariant}
                                            asChild
                                        >
                                            <a
                                                href={button.target_url}
                                                target={button.icon === "external" ? "_blank" : undefined}
                                                rel={button.icon === "external" ? "noopener noreferrer" : undefined}
                                            >
                                                {button.label || "Learn More"}
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button className="bg-transparent !text-white border-white" variant={buttonVariant}>
                                            {button?.label || "Learn More"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
