'use client'

import Link from 'next/link'
import { useState, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { NavigationMenuDemo } from "@/components/global/NavigationMenuDemo";
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { usePathname } from 'next/navigation'

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

interface navigationType{
    logo_mode?: 'dark' | 'light';
}

export default function MainNavigation({logo_mode='light'} : navigationType) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [openSubmenu, setOpenSubmenu] = useState(false)
    const menuHomeRef = useRef<HTMLDivElement | null>(null)
    const menuRef = useRef<HTMLDivElement | null>(null)
    const stickyShellRef = useRef<HTMLDivElement | null>(null)
    const stickyInnerRef = useRef<HTMLDivElement | null>(null)
    const pathname = usePathname()

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return

        const menu = menuRef.current
        const menuHome = menuHomeRef.current
        const stickyShell = stickyShellRef.current
        const stickyInner = stickyInnerRef.current

        if (!menu || !menuHome || !stickyShell || !stickyInner) return

        if (stickyInner.contains(menu)) {
            menuHome.appendChild(menu)
        }

        gsap.set(menuHome, { clearProps: 'width,height' })
        gsap.set(menu, { clearProps: 'all' })
        gsap.set(stickyShell, { opacity: 0, pointerEvents: 'none' })
        ScrollTrigger.refresh()
    }, [pathname])

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return

        gsap.registerPlugin(ScrollTrigger, Flip)

        const menu = menuRef.current
        const menuHome = menuHomeRef.current
        const stickyShell = stickyShellRef.current
        const stickyInner = stickyInnerRef.current

        if (!menu || !menuHome || !stickyShell || !stickyInner) return

        gsap.set(stickyShell, { opacity: 0, pointerEvents: 'none' })

        const mm = gsap.matchMedia()

        const ctx = gsap.context(() => {
            mm.add('(min-width: 768px)', () => {
                let isSticky = false

                const activateSticky = () => {
                    if (isSticky) return
                    isSticky = true

                    const { width, height } = menu.getBoundingClientRect()
                    gsap.set(menuHome, { width, height })

                    const state = Flip.getState(menu)
                    stickyInner.appendChild(menu)

                    gsap.to(stickyShell, {
                        opacity: 1,
                        pointerEvents: 'auto',
                        duration: 0.25,
                        ease: 'power2.out',
                    })

                    const animation = Flip.from(state, {
                        duration: 0.45,
                        ease: 'power3.out',
                        absolute: true,
                        nested: true,
                        fade: false,
                    })

                    animation.eventCallback('onComplete', () => {
                        gsap.set(menu, { clearProps: 'transform,opacity' })
                    })
                }

                const deactivateSticky = () => {
                    if (!isSticky) return
                    isSticky = false

                    const state = Flip.getState(menu)
                    menuHome.appendChild(menu)

                    gsap.to(stickyShell, {
                        opacity: 0,
                        pointerEvents: 'none',
                        duration: 0.25,
                        ease: 'power2.out',
                    })

                    const animation = Flip.from(state, {
                        duration: 0.4,
                        ease: 'power3.inOut',
                        absolute: true,
                        nested: true,
                        fade: false,
                    })

                    animation.eventCallback('onComplete', () => {
                        gsap.set(menuHome, { clearProps: 'width,height' })
                        gsap.set(menu, { clearProps: 'all' })
                    })
                }

                const evaluateSticky = () => {
                    const shouldStick = window.scrollY > 4
                    if (shouldStick) {
                        activateSticky()
                    } else {
                        deactivateSticky()
                    }
                }

                const trigger = ScrollTrigger.create({
                    trigger: menuHome,
                    start: 'top top',
                    end: 'max',
                    onUpdate: evaluateSticky,
                    onRefresh: evaluateSticky,
                })

                evaluateSticky()

                const handleResize = () => {
                    if (!isSticky) return
                    const { width, height } = menu.getBoundingClientRect()
                    gsap.set(menuHome, { width, height })
                }

                window.addEventListener('resize', handleResize)

                return () => {
                    window.removeEventListener('resize', handleResize)
                    trigger.kill()

                    if (isSticky) {
                        const state = Flip.getState(menu)
                        menuHome.appendChild(menu)
                        Flip.from(state, { duration: 0, absolute: true, nested: true })
                    }

                    gsap.set(menuHome, { clearProps: 'width,height' })
                    gsap.set(stickyShell, { opacity: 0, pointerEvents: 'none' })
                }
            })
        })

        return () => {
            ctx.revert()
            mm.revert()
        }
    }, [])

    return (
        <header className="w-full absolute inset-x-0 top-0 h-[100px] mb-0 z-[1000] pt-4">
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
            <div
                id="navigationBlock"
                className="w-full text-[#19233C] transition-all duration-300"
            >
                <div className="mx-auto max-w-[1680px] px-[6rem] py-1 flex justify-between items-center h-[5rem]">
                    <Link id={'mainLogoNav'} href="/">

                        {(logo_mode == 'light') ? (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/main-logo-white.svg" alt="Miles Mediation Logo" className="h-12" />
                            </>

                        ) : (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/main-logo-dark.svg" alt="Miles Mediation Logo" className="h-12" />
                            </>

                        )}

                    </Link>

                    {/* Desktop menu */}
                    <div ref={menuHomeRef} className="hidden md:block">
                        <div
                            id={'navigationBar'}
                            ref={menuRef}
                            className="relative z-50 bg-w h-[70px] "
                        >
                            <div className={'flex justify-center h-full  bg-white rounded-4xl px-5 shadow-md'}>

                                <NavigationMenuDemo />
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu icon */}
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
                        <FiMenu size={28} />
                    </button>
                </div>
            </div>

            <div
                ref={stickyShellRef}
                className="hidden md:block fixed top-0 left-0 right-0 z-[1200] pointer-events-none"
            >
                <div
                    ref={stickyInnerRef}
                    className="mx-auto max-w-[1680px] px-[6rem] py-1 flex justify-end items-center h-[5rem]"
                />
            </div>

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