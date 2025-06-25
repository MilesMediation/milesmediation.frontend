'use client'

import Link from 'next/link'
import classNames from "classnames";
import {useEffect} from "react";

interface OfficeCardProps {
    image?: string
    name: string
    url: string
    onClick?: () => void
    size: 'sm' | 'md' | 'lg' | 'xl'
}

export default function CardComponent({ image='/cardImgSample1.png', name, url, onClick, size='md' }: OfficeCardProps) {

    const cardSize = {
        sm: 'h-[250px]',
        md: 'h-[350px]',
        lg: 'h-[550px]',
        xl: 'h-[650px]'
    }
    const cardContainer = classNames(
        'cursor-pointer',
        'relative',
        'transition-all',
        'duration-500',
        'rounded-sm',
        'overflow-hidden',

        'w-full',
        'opacity-100',
        `${cardSize[size]}`,{
            'shadow-lg': size !== 'sm',
            'border border-1-black': size == 'sm',
        }
    )

    useEffect(() => {

    }, []);

    return (
        <div onClick={onClick} className={`${cardContainer} `}>

            {size !== 'sm' && (
                <img
                    src={image}
                    alt={name}
                    className="object-cover rounded-sm h-full w-full"
                />
            )}


            <div className={`absolute  left-4 z-10 ${size !== 'sm'?'text-white bottom-4' : 'bottom-10'}`}>
                <h4 className="text-3xl font-title uppercase leading-none mb-1">{name}</h4>
                <Link href={url} className="text-sm underline font-body">
                    See more &gt;
                </Link>
            </div>

            {size !== 'sm' && (
                <div className="absolute inset-0 bg-black/40 rounded-xl" />
            )}
        </div>
    )
}
