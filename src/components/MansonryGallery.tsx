'use client'

import { useInView } from 'react-intersection-observer'
import AnimatedImageCard from '@/components/cards/AnimatedImageCard'

export default function MasonryGallery() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
        rootMargin: '-60px',
    })

    const images = {
        col1: ['/heroBanner.png'],
        col2: ['/heroBanner.png', '/heroBanner.png'],
        col3: ['/cardImgSample1.png'],
        col4: ['/heroBanner.png', '/heroBanner.png'],
        col5: ['/heroBanner.png'],
    }

    return (
        <section ref={ref} className="relative text- w-full overflow-x-hidden py-[100px] border border-black-1">
            <div className="max-w-[2000px] mx-auto flex gap-6 justify-center overflow-visible">
                {Object.values(images).map((col, colIdx) => (
                    <div
                        key={colIdx}
                        className="flex flex-col gap-6"
                        /*style={{
                            transform: colIdx === 0
                                ? 'translateX(-20%)'
                                : colIdx === 5
                                    ? 'translateX(20%)'
                                    : undefined,
                        }}*/
                    >
                        {col.map((src, idx) => (
                            <AnimatedImageCard
                                key={idx}
                                src={src}
                                alt={`image-${colIdx}-${idx}`}
                                customDelay={inView ? 0.1 * (colIdx + idx) : 0}
                                customDuration={1 + (idx * 0.1)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
