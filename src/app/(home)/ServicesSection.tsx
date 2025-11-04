'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import {Button} from "@/components/ui/button";

const tabs = [
    {
        label: 'Mediation',
        content:
            'In mediation, parties engage a neutral to facilitate a negotiated resolution of either some or all issues in dispute. The two key elements of mediation are party control and confidentiality.',
        image: '/services/mediation.png',
    },
    {
        label: 'Arbitration',
        content:
            'Arbitration involves a neutral arbitrator who renders a legally binding decision after hearing evidence and arguments. It is typically faster and more flexible than litigation.',
        image: '/heroBanner.png',
    },
    {
        label: 'ADR On Demand',
        content:
            'ADR On Demand offers flexible, technology-driven options for resolving disputes, giving clients control over timing, format, and platform.',
        image: '/cardImgSample1.png',
    },
]

export default function ServicesSection() {
    const [activeTab, setActiveTab] = useState(0)
    const progressRefs = useRef<(HTMLDivElement | null)[]>([])
    const contentRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        // Reset all progress bars
        progressRefs.current.forEach((ref) => {
            if (ref) {
                gsap.set(ref, { width: '0%' })
            }
        })

        // Animate active tab's progress bar
        const activeRef = progressRefs.current[activeTab]
        if (activeRef) {
            const timeline = gsap.timeline({
                onComplete: () => {
                    // Auto-advance to next tab
                    setActiveTab((prev) => (prev + 1) % tabs.length)
                }
            })

            timeline.to(activeRef, {
                width: '100%',
                duration: 6,
                ease: 'linear'
            })
        }
    }, [activeTab])

    // Animate content change
    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0.5, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.65, 
                    ease: 'easeOut' 
                }
            )
        }
    }, [activeTab])

    return (
        <section id={'service-section'} className="w-full px-4 mb-0 md:px-12 py-16 md:py-[100px] xl:h-[950px]">
            <div className="w-full mx-auto grid grid-cols-1 gap-5 items-center container">
                {/* Text Column */}
                <div className="w-full">
                    <h2 className="font-title text-[32px] md:text-[40px] text-[var(--Dark-Green_1,#003135)] mb-6 ">
                        Our services
                    </h2>

                    {/* Tabs */}
                    <div className="flex gap-6 text-lg font-title mb-4">
                        {tabs.map((tab, index) => (
                            <div key={tab.label} className="relative w-full">
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
                                {/* Progress bar container - always rendered but only animated when active */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200">
                                    {activeTab === index && (
                                        <div
                                            ref={(el) => (progressRefs.current[index] = el)}
                                            className="h-full bg-[var(--color-secondary-green,#0FA4AF)]"
                                            style={{ width: '0%' }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>


                </div>

                {/* Image Column */}
                <div className="w-full border-blue-400">
                    <div ref={contentRef} key={tabs[activeTab].image}>
                        <div className={'relative '}>
                            <img
                                src={tabs[activeTab].image}
                                alt={tabs[activeTab].label}
                                className="w-full rounded-xl object-cover h-[450px]"
                            />
                            {/* Content */}
                            <div className={'border-t mx-5 border-white absolute bottom-0 py-5 grid grid-cols-12'}>
                                <p className="text-sm text-white text-[16px] leading-[24px] col-span-8">
                                    {tabs[activeTab].content}
                                </p>
                                <div className={'col-span-4 text-right'}>
                                    <Button className={'bg-transparent !text-white border-white'} variant={'outline'}>
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
