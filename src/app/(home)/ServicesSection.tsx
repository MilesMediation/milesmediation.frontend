'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

    return (
        <section className="w-full px-4 mb-0 md:px-12 py-16 md:py-[100px] xl:h-[950px]">
            <div className="w-full mx-auto flex flex-col md:flex-row gap-12 items-center container">
                {/* Text Column */}
                <div className="w-full md:w-1/2">
                    <h2 className="font-title text-[32px] md:text-[40px] text-[var(--Dark-Green_1,#003135)] mb-6 uppercase">
                        OUR SERVICES
                    </h2>

                    {/* Tabs */}
                    <div className="flex gap-6 text-lg font-title mb-4">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(index)}
                                className={`transition-all duration-200 border-b-2 ${
                                    activeTab === index
                                        ? "text-[var(--Dark-Green_1,#003135)] font-semibold border-[var(--color-secondary-green,#0FA4AF)]"
                                        : "text-gray-700 border-transparent hover:text-[var(--Dark-Green_1,#003135)]"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <p className="font-body text-black text-[16px] leading-[24px]">
                        {tabs[activeTab].content}
                    </p>
                </div>

                {/* Image Column */}
                <div className="w-full md:w-1/2 border-blue-400">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tabs[activeTab].image}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className=""
                        >
                            <img
                                src={tabs[activeTab].image}
                                alt={tabs[activeTab].label}
                                className="w-full rounded-xl object-fill h-[650px]"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
