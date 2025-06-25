'use client'

import Image from 'next/image'
import Link from 'next/link'

interface NeutralProps {
    image: string
    name: string
    url: string
    onClick?: () => void
}

export default function NeutralCard({ image, name, url, onClick }: NeutralProps) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer relative transition-all duration-500 rounded-sm overflow-hidden shadow-lg 'w-[370px] h-[440px] opacity-100'}`}
        >
            <img
                src={image}
                alt={name}
                className="object-cover h-full rounded-sm"
            />

            <div className="absolute bg-black/50   bottom-0 left-0 p-5 w-full z-10 text-white">
                <h4 className="text-xl font-title uppercase leading-none mb-1">{name}</h4>
                <Link href={url} className="text-sm underline font-body text-teal-100">
                    View calendar & rates &gt;
                </Link>
            </div>


        </div>
    )
}
