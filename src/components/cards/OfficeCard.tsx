'use client'

import Link from 'next/link'

interface OfficeCardProps {
    image: string
    name: string
    url: string
    focused?: boolean
    onClick?: () => void
}

export default function OfficeCard({ image, name, url, focused = false, onClick }: OfficeCardProps) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer relative transition-all duration-500 rounded-sm overflow-hidden shadow-lg ${
                focused ? 'w-[370px] h-[540px] opacity-100' : 'w-[329px] h-[480px] opacity-50'
            }`}
        >
            <img
                src={image}
                alt={name}
                className="object-cover rounded-sm h-full w-full"
            />

            <div className="absolute bottom-4 left-4 z-10 text-white">
                <h3 className="text-xl font-title uppercase leading-none mb-1">{name}</h3>
                <Link href={url} className="text-sm underline font-body">
                    See more &gt;
                </Link>
            </div>

            {!focused && <div className="absolute inset-0 bg-black/40 rounded-xl" />}
        </div>
    )
}
