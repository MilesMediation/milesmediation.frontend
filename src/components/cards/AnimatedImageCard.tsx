'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AnimatedImageCardProps {
    src: string
    alt: string
    customDelay?: number
    customDuration?: number
    customClassName?: string
    containerClassName?: string
    style?: React.CSSProperties
}

export default function AnimatedImageCard({
                                              src,
                                              alt,
                                              customDelay = 0,
                                              customDuration = 1,
                                              customClassName,
                                              containerClassName,
                                              style,
                                          }: AnimatedImageCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: customDelay, duration: customDuration, ease: 'easeOut' }}
            className={`overflow-hidden ${containerClassName}`}
            style={style}
        >
            <img
                src={src}
                alt={alt}
                
                className={`h-[300px] w-[250px] object-cover ${customClassName}`}
            />
        </motion.div>
    )
}
