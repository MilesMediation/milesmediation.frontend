'use client'

import Link from 'next/link'

interface CallToActionProps {
    backgroundImage?: string
    title?: string
    description?: string
    buttonLabel?: string
    buttonUrl?: string
}

export default function CallToAction({
                                         backgroundImage = "/cardImgSample1.png",
                                         title = 'CONTACT US',
                                         description = 'Miles’ neutrals are experienced mediators and arbitrators with expertise in their fields.',
                                         buttonLabel = 'See more',
                                         buttonUrl = '/contact',
                                     }: CallToActionProps) {
    return (
        <section
            className="w-full py-36 bg-cover bg-center relative mb-0"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={'container mx-auto py-10'}>

                {/* Overlay */}
                <div className="absolute inset-0 bg-[var(--Dark-Green_1,#003135)]/80 z-0" />

                {/* Content */}
                <div className="relative z-10 mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="font-title text-3xl md:text-4xl text-white uppercase mb-4">{title}</h2>
                        <p className="font-body text-white text-base md:text-lg max-w-xl">{description}</p>
                    </div>

                    <Link
                        href={buttonUrl}
                        className="inline-block w-auto px-6 py-3 text-sm font-medium rounded-full bg-white text-[var(--Dark-Green_1,#003135)] hover:opacity-90 transition"
                    >
                        {buttonLabel}
                    </Link>
                </div>
            </div>
        </section>
    )
}
