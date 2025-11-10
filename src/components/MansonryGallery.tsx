'use client'

import { useInView } from 'react-intersection-observer'
import AnimatedImageCard from '@/components/cards/AnimatedImageCard'
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";


export default function MansonryGallery({gallery_prop} : {gallery_prop?:{id:number;image_name: string; image_col:{url:string;}[]}[]}) {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
        rootMargin: '-60px',
    })

    // Define images and sizes to create a more impressive masonry layout
    /*const columns = [
        ['/heroBanner.png', '/neutrals/ron.png'],
        ['/neutrals/sally.png', '/neutrals/leah.png'],
        ['/cardImgSample1.png'], // center large
        ['/neutrals/audrey.png', '/heroBanner.png'],
        ['/neutrals/john.png', '/neutrals/marc.png'],
    ]*/

    const columnOffsets = ['translate-y-10', 'translate-y-4', '-translate-y-6', 'translate-y-4', 'translate-y-10']

    const heightsForColumns: Record<number, string[]> = {
        0: ['h-[200px]', 'h-[200px]'],
        1: ['h-[280px]', 'h-[280px]'],
        2: ['h-[650px]'], // big center image
        3: ['h-[280px]', 'h-[280px]'],
        4: ['h-[200px]', 'h-[200px]'],
    }

    // console.log('gallery prop: ', gallery_prop)

    return (
        <>
            <style jsx>{`
                .masonry-gallery { padding-top: 120px; padding-bottom: 120px; }

                /* subtle horizontal overflow to give that cinematic feel */
                .masonry-wrapper { overflow-x: visible; overflow-y: visible; }

                /* card effect */
                .masonry-card {
                    border-radius: 18px;
                    box-shadow: 0 20px 40px rgba(2,6,23,0.12), 0 6px 12px rgba(2,6,23,0.06);
                    transition: transform 300ms ease, filter 300ms ease, box-shadow 300ms ease;
                    will-change: transform;
                    position: relative;
                }

                .masonry-card:hover {
                    transform: translateY(-10px) scale(1.03);
                    filter: brightness(1.05) saturate(1.05);
                    box-shadow: 0 28px 60px rgba(2,6,23,0.18);
                    z-index: 30;
                }

                /* overlay that appears on hover */
                .masonry-card .overlay {
                    position: absolute;
                    left: 0; right: 0; bottom: 0;
                    padding: 18px;
                    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%);
                    color: white;
                    opacity: 0;
                    transition: opacity 220ms ease;
                    border-bottom-left-radius: 18px;
                    border-bottom-right-radius: 18px;
                }

                .masonry-card:hover .overlay { opacity: 1; }

                /* make center column stand out */
                .center-column .masonry-card { border-radius: 22px; }

                /* responsive tweaks */
                @media (max-width: 1024px) {
                    .masonry-wrapper { padding-left: 20px; padding-right: 20px; }
                    .masonry-card { border-radius: 12px; }
                }

            `}</style>

            <section ref={ref} className="relative w-full masonry-gallery overflow-hidden">
                <div className="flex gap-6 relative justify-center masonry-wrapper w-[130%] left-[-15%]">
                    {gallery_prop && gallery_prop.map((col, colIdx) => (
                        <div
                            key={colIdx}
                            className={`flex flex-col gap-6 w-[18%] p-2 ${columnOffsets[colIdx] ?? ''} ${colIdx === 2 ? 'center-column' : ''}`}
                            style={{ alignItems: 'center' }}
                        >
                            {col.image_col.map((item, idx) => (
                                <div key={idx}>
                                    <AnimatedImageCard

                                        src={`${NEXT_URL_BACKOFFICE}${item.url}`}
                                        alt={`image-${colIdx}-${idx}`}
                                        customDelay={inView ? 0.08 * (colIdx + idx) : 0}
                                        customDuration={0.9 + idx * 0.08}
                                        containerClassName={`masonry-card w-full overflow-hidden ${heightsForColumns[colIdx]?.[idx] ?? 'h-[240px]'}`}
                                        customClassName={`object-cover`}
                                        style={{ borderRadius: 18 }}
                                    >
                                    </AnimatedImageCard>
                                </div>
                            ))}
                            {/*{col.map((src, idx) => (
                                <AnimatedImageCard
                                    key={idx}
                                    src={src}
                                    alt={`image-${colIdx}-${idx}`}
                                    customDelay={inView ? 0.08 * (colIdx + idx) : 0}
                                    customDuration={0.9 + idx * 0.08}
                                    containerClassName={`masonry-card w-full overflow-hidden ${heightsForColumns[colIdx]?.[idx] ?? 'h-[240px]'}`}
                                    customClassName={`object-cover`}
                                    style={{ borderRadius: 18 }}
                                >
                                </AnimatedImageCard>
                            ))}*/}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
