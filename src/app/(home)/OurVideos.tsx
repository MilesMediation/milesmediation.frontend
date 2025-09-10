'use client'

import CardVideo from '@/components/cards/CardVideo'
import Link from 'next/link'

const videos = [
    {
        titulo: 'Atlanta',
        descripcion: 'See more ›',
        imagenBg: '/cardImgSample1.png',
        url: '/videos/atlanta',
    },
    {
        titulo: 'Boston',
        descripcion: 'See more ›',
        imagenBg: '/cardImgSample1.png',
        url: '/videos/boston',
    },
    {
        titulo: 'Seattle',
        descripcion: 'See more ›',
        imagenBg: '/cardImgSample1.png',
        url: '/videos/seattle',
    },
    {
        titulo: 'Georgia',
        descripcion: 'See more ›',
        imagenBg: '/cardImgSample1.png',
        url: '/videos/georgia',
    },
]

export default function OurVideos() {
    return (
        <section className="w-full px-4 py-[100px] mb-0">
            <div className="container mx-auto">
                {/* Title */}
                <h2 className="font-title text-5xl  text-center text-[var(--Dark-Green_1,#003135)] mb-12 uppercase">
                    Our Videos
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {videos.map((video, index) => (
                        <CardVideo
                            key={index}
                            titulo={video.titulo}
                            descripcion={video.descripcion}
                            imagenBg={video.imagenBg}
                            url={video.url}
                        />
                    ))}
                </div>

                {/* See more ButtonMiles.tsx */}
                <div className="mt-12 text-center">
                    <Link
                        href="/videos"
                        className="inline-block w-auto px-6 py-3 text-sm font-medium rounded-full bg-[var(--Dark-Green_1,#003135)] text-white hover:opacity-90 transition"
                    >
                        See more
                    </Link>
                </div>
            </div>
        </section>
    )
}
