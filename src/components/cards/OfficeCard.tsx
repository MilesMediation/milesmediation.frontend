'use client'

import Link from 'next/link'

interface OfficeCardProps {
    image: string
    name: string
    url: string
    onClick?: () => void
}

export default function OfficeCard({image, name, url, onClick}: OfficeCardProps) {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer relative transition-all duration-500 rounded-sm overflow-hidden shadow-lg w-full max-w-[329px] h-[480px] group  transform-gpu mx-auto"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={image}
                alt={name}
                className="object-cover rounded-sm h-full w-full transition-transform duration-700 ease-out "
            />

            <div className="absolute bottom-4 left-4 z-10 text-white">
                <h3 className="text-xl font-title uppercase leading-none mb-1 group-hover:text-gray-200 transition-colors duration-300">
                    {name}
                </h3>
                <Link href={url}
                      className="text-sm underline font-body hover:text-gray-200 transition-colors duration-300 inline-flex items-center group/link">
                    See more
                    <span className="ml-1 group-hover/link:translate-x-1 transition-transform duration-300">&gt;</span>
                </Link>
            </div>

            <div
                className="absolute inset-0 bg-black/20 rounded-sm group-hover:bg-black/10 transition-all duration-500"/>

            {/* Subtle glow effect on hover */}
            <div
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/30 via-transparent to-transparent"/>
        </div>
    )
}
