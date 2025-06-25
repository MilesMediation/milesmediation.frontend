'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OfficeCard from '@/components/cards/OfficeCard'

const offices = [
    { name: 'Atlanta', image: '/offices/atlanta.png', url: '/offices/atlanta' },
    { name: 'Boston', image: '/offices/atlanta.png', url: '/offices/boston' },
    { name: 'Birmingham', image: '/offices/atlanta.png', url: '/offices/birmingham' },
    { name: 'Chicago', image: '/offices/atlanta.png', url: '/offices/chicago' },
]

export default function OfficesSection() {
    const [index, setIndex] = useState(0)

    const prev = () => {
        setIndex((prev) => (prev - 1 + offices.length) % offices.length)
    }

    const next = () => {
        setIndex((prev) => (prev + 1) % offices.length)
    }

    const handleCardClick = (clickedIdx: number) => {
        setIndex(clickedIdx)
    }

    // Calculate visible items
    const getVisible = () => {
        const total = offices.length
        return [
            offices[(index + 0) % total],
            offices[(index + 1) % total],
            offices[(index + 2) % total],
        ]
    }

    const visible = getVisible()

    return (
        <section className="w-full bg-[var(--Dark-Green_1,#003135)] mb-0 text-white px-4 md:px-12 py-[100px] flex flex-col md:flex-row gap-8 items-start overflow-hidden">
            {/* Left Info Panel */}
            <div className="w-full md:w-1/4 space-y-6 z-10">
                <h2 className="font-title text-[32px] md:text-[40px] uppercase">Our Offices</h2>
                <p className="font-body text-white text-[16px] leading-[24px]">
                    Meet our larger panel of neutrals and arbitrators
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={prev}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-lg"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-lg"
                    >
                        →
                    </button>
                </div>
                <button className="mt-8 bg-white text-black rounded-md px-6 py-3 font-medium">
                    See all
                </button>
            </div>

            {/* Right Carousel */}
            <div className="w-full md:w-3/4 overflow-hidden">
                <div className="flex gap-6 transition-transform duration-700 ease-out">
                    {visible.map((office, i) => {
                        const actualIndex = (index + i) % offices.length
                        return (
                            <motion.div
                                key={office.name}
                                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -50 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                            >
                                <OfficeCard
                                    {...office}
                                    focused={i === 0}
                                    onClick={() => handleCardClick(actualIndex)}
                                />
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
