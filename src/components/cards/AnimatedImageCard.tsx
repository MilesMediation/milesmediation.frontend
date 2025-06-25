'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AnimatedImageCardProps {
    src: string
    alt: string
    customDelay?: number
    customDuration?: number
}

export default function AnimatedImageCard({
                                              src,
                                              alt,
                                              customDelay = 0,
                                              customDuration = 1,
                                          }: AnimatedImageCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: customDelay, duration: customDuration, ease: 'easeOut' }}
            className="overflow-hidden rounded-xl shadow-lg"
        >
            <Image
                src={src}
                alt={alt}
                width={300}
                height={400}
                className="w-full h-auto object-cover"
            />
        </motion.div>
    )
}
