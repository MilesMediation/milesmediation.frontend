'use client'

import { useInView } from 'react-intersection-observer'
import AnimatedImageCard from '@/components/cards/AnimatedImageCard'


export default function MansonryGallery() {
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

    // Define different border colors for each column
    const columnBorderColors = [
        {
            
        }, // Blue
        {
            borderColor:'#10b981'}, // Green
        {
            borderColor:'#f59e0b'}, // Amber
        {
            borderColor:'#ef4444'}, // Red
        {
            borderColor:'#8b5cf6'}, // Purple
    ]

    const customClasses = [
        'border-2 border-blue-500 object-cover',
        'border-2 border-green-500',
        'border-2 border-amber-500',
        'border-2 border-red-500',
        'border-2 border-purple-500',
    ]

    

    return (
        <>
            <style jsx>{`
                .masonry-gallery .hover\:scale-105:hover {
                    transform: scale(1.05);
                }
                .masonry-gallery .hover\:brightness-110:hover {
                    filter: brightness(1.1);
                }
            `}</style>
            <section ref={ref} className="relative  w-full  py-[100px] masonry-gallery ">
                <div className=" flex gap-1 overflow-visible w-full justify-around">
                    {Object.values(images).map((col, colIdx) => (
                        <div
                            key={colIdx}
                            className=" flex-col gap-2 w-1/5  p-6 transition-all duration-300 justify-center"
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
                                    containerClassName="border-2"
                                    customClassName={`${customClasses[colIdx]} w-full rounded-lg hover:brightness-110 transition-all duration-300`}
                                    style={columnBorderColors[colIdx]}
                                />
                            ))}
                            
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
