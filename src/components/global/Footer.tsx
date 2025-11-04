'use client'

import Image from 'next/image'
import Link from 'next/link'

const footerData = [
    {
        title: 'Locations',
        links: [
            'Atlanta', 'Savannah', 'Charlotte', 'Nashville',
            'Jacksonville', 'Tampa', 'Columbia', 'St. Louis',
        ],
    },
    {
        title: 'Contact Us',
        links: [
            { label: 'Address:', value: '115 Perimeter Center Place\nSuite 1100\nAtlanta, GA 30346' },
            { label: 'Phone Number:', value: '888-305-3553' },
            { label: 'Support Email:', value: 'support@milesadr.com' },
        ],
        isRich: true,
    },
    {
        title: 'Practice Area',
        links: [
            'Education Overview', 'General Civil Mediation Training', 'Civil Litigation',
            'Ethics', 'Legal Malpractice', 'Mediation Strategy', 'Technology', 'Trial Practice',
        ],
    },
    {
        title: 'Education',
        links: [
            'Overview', 'General Civil Mediation', 'Civil Litigation',
            'Ethics', 'Legal Malpractice', 'Mediation Strategy', 'Technology', 'Trial PRactice',
        ],
    },
]

export default function Footer() {
    return (
        <footer className="bg-[var(--color-dark-green,#003135)] text-white w-full px-4 py-16">
            <div className="container  mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                {/* Logo */}
                <div className="flex flex-col items-start">
                    <Image
                        src="/main-logo-white.svg"
                        alt="Miles Mediation & Arbitration"
                        width={150}
                        height={60}
                        className="mb-4"
                    />
                </div>

                {/* Other Sections */}
                {footerData.map((section, idx) => (
                    <div key={idx}>
                        <h4 className="font-semibold text-base mb-2">{section.title}</h4>
                        <ul className="space-y-1 text-sm">
                            {section.isRich ? (
                                section.links.map((link: string | { label: string; value: string }, i: number) => {
                                    const label = typeof link === 'string' ? link : link.label;
                                    const href = typeof link === 'string' ? '#' : link.value;
                                    return (
                                        <li key={i}>
                                            <strong>{label}</strong><br/>
                                            {href.split('\n').map((line: string, j: number) => (
                                                <span key={j} className="block">{line}</span>
                                            ))}
                                        </li>)
                                })
                            ) : (
                                section.links.map((link: string | { label: string; value: string }, i: number) => {
                                    const label = typeof link === 'string' ? link : link.label;
                                    const href = typeof link === 'string' ? '#' : link.value;

                                    return (
                                        <li key={i}>
                                            <Link href={href} className="hover:underline">
                                                {label}
                                            </Link>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Divider + Copyright */}
            <div className="mt-12 border-t border-white/30 pt-6 text-center text-sm text-white">
                © 2025 <strong>Miles Mediation & Arbitration, LLC</strong>. All Rights Reserved.{' '}
                <Link href="#" className="underline font-semibold">Disclaimer</Link> |{' '}
                <Link href="#" className="underline font-semibold">Sitemap</Link>
            </div>
        </footer>
    )
}
