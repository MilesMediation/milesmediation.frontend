'use client'

import { motion } from 'framer-motion'

interface AnimatedImageCardProps {
    src: string
    alt: string
    caption?: string
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
            whileHover={{ scale: 1.03, rotate: -0.8 }}
            className={`overflow-hidden ${containerClassName}`}
            style={style}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className={`object-cover w-full h-full ${customClassName}`}
            />



            <style jsx>{`
                .overlay {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%);
                    color: white;
                    opacity: 0;
                    transition: opacity 220ms ease;
                }
                .overlay-inner { padding: 8px 14px; backdrop-filter: blur(6px); border-radius: 8px; }
                .overlay-title { font-weight: 600; font-size: 14px; }
                :global(.masonry-card:hover) .overlay { opacity: 1; }
            `}</style>
        </motion.div>
    )
}
