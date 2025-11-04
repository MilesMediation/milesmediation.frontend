'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { NavigationMenuDemo } from "@/components/global/NavigationMenuDemo";

const topLinks = ['Shop', 'Pay Online', 'Log in']

const mainMenu = [
    { label: 'Home', href: '/' },
    {
        label: 'ADR Services +',
        href: '#',
        submenu: [
            { label: 'Mediation', href: '/adr/mediation' },
            { label: 'Arbitration', href: '/adr/arbitration' },
            { label: 'Neutral Evaluation', href: '/adr/evaluation' },
            { label: 'Case Management', href: '/adr/case-management' },
        ],
    },
    { label: 'Our Panel', href: '/panel' },
    { label: 'Practice Areas', href: '/practice-areas' },
    { label: 'Locations', href: '/locations' },
    { label: 'About Us', href: '/about' },
]

export default function MainNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [openSubmenu, setOpenSubmenu] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Simple scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsScrolled(scrollY > 36) // Show nav after 100px scroll
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="w-full relative h-[100px] mb-0 z-[1000] pt-4">
            {/* Top bar */}
            <div className="w-full bg-[var(--color-dark-green)] text-white text-sm hidden">
                <div className="mx-auto max-w-[1680px] px-[6rem] py-2 flex justify-end space-x-8">
                    {topLinks.map((item, idx) => (
                        <a key={idx} href="#" className="hover:underline underline-offset-4 transition-all">
                            {item}
                        </a>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <motion.div
                id="navigationBlock"
                className={`w-full  text-[#19233C]  transition-all duration-300 ${
                    isScrolled 
                        ? 'fixed top-0 inset-x-0 z-50' 
                        : 'sticky'
                }`}
                animate={{
                    y: isScrolled ? 0 : 0
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                }}
            >
                <div className="mx-auto max-w-[1680px] px-[6rem] py-1 flex justify-between items-center h-[5rem]">
                    <Link href="/">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/main-logo-white.svg" alt="Miles Mediation Logo" className="h-12" />
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:block relative z-50 bg-w h-[70px] ">
                        <div className={'flex justify-center h-full  bg-white rounded-4xl px-5 shadow-md'}>

                            <NavigationMenuDemo />
                        </div>
                    </div>

                    {/* Mobile menu icon */}
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
                        <FiMenu size={28} />
                    </button>
                </div>
            </motion.div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/35 z-40"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            key="drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: '25%' }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.24, ease: 'easeOut' }}
                            className="fixed top-0 right-0 h-full w-3/4 bg-[var(--color-dark-green)] text-white z-[60] shadow-lg"
                        >
                            <div className="absolute top-4 left-4 z-50">
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    aria-label="Close menu"
                                    className="text-white hover:text-[var(--color-hover-light-green)]"
                                >
                                    <FiX size={32} />
                                </button>
                            </div>

                            <div className="pt-20 px-6">
                                <ul className="flex flex-col space-y-4 text-lg font-medium">
                                    {mainMenu.map((item, idx) => {
                                        const hasSubmenu = !!item.submenu

                                        return (
                                            <li key={idx} className="w-full">
                                                <button
                                                    className="w-full flex justify-between items-center px-5 py-4 hover:bg-[var(--color-hover-light-green)] hover:text-[var(--color-dark-green)]"
                                                    onClick={() =>
                                                        hasSubmenu ? setOpenSubmenu(!openSubmenu) : setMobileMenuOpen(false)
                                                    }
                                                >
                                                    {item.label}
                                                    {hasSubmenu && <span className="text-xl">{openSubmenu ? '−' : '+'}</span>}
                                                </button>

                                                {hasSubmenu && openSubmenu && (
                                                    <ul className="ml-8 mt-1 space-y-3 text-base text-white">
                                                        {item.submenu.map((sub, subIdx) => (
                                                            <li key={subIdx}>
                                                                <Link
                                                                    href={sub.href}
                                                                    className="pl-2 block border-l border-white/30 hover:text-[var(--color-hover-light-green)]"
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}