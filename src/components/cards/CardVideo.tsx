'use client'

import Image from 'next/image'
import Link from 'next/link'

interface CardVideoProps {
    imagenBg: string
    titulo: string
    descripcion: string
    url: string
}

export default function CardVideo({ imagenBg, titulo, descripcion, url }: CardVideoProps) {
    return (
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
            <Image
                src={imagenBg}
                alt={titulo}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 rounded-xl" />

            <div className="absolute bottom-4 left-4 z-10 text-white">
                <h3 className="text-lg font-title uppercase">{titulo}</h3>
                <Link href={url} className="text-sm text-[var(--color-secondary-green)] underline">
                    {descripcion}
                </Link>
            </div>
        </div>
    )
}
