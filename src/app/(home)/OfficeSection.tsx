'use client'

import { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import OfficeCard from '@/components/cards/OfficeCard'

const offices = [
    { name: 'Chicago', image: '/offices/atlanta.png', url: '/offices/chicago' },
    { name: 'Atlanta', image: '/offices/atlanta.png', url: '/offices/atlanta' },
    { name: 'Boston', image: '/offices/atlanta.png', url: '/offices/boston' },
    { name: 'Birmingham', image: '/offices/atlanta.png', url: '/offices/birmingham' },
    { name: 'New York', image: '/offices/atlanta.png', url: '/offices/new-york' },
    { name: 'Los Angeles', image: '/offices/atlanta.png', url: '/offices/los-angeles' },
]

export default function OfficesSection() {
    const sliderRef = useRef<Slider>(null)

    const prev = () => {
        sliderRef.current?.slickPrev()
    }

    const next = () => {
        sliderRef.current?.slickNext()
    }

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault()
            prev()
        } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            next()
        }
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        focusOnSelect: false,
        cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        autoplay: false,
        pauseOnHover: true,
        swipeToSlide: true,
        touchThreshold: 10,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }

    return (
        <section 
            id="officesSection" 
            className="w-full bg-[var(--Dark-Green_1,#003135)] mb-0 text-white px-4 md:px-12 py-[100px] flex flex-col md:flex-row gap-8 items-start overflow-hidden"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Left Info Panel */}
            <div className="w-full md:w-1/4 space-y-6 z-10">
                <h2 className="font-title text-[32px] md:text-[40px] uppercase">Our Offices</h2>
                <p className="font-body text-white text-[16px] leading-[24px]">
                    Meet our larger panel of neutrals and arbitrators
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={prev}
                        onKeyDown={(e) => e.key === 'Enter' && prev()}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003135]"
                        aria-label="Previous office"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        onKeyDown={(e) => e.key === 'Enter' && next()}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003135]"
                        aria-label="Next office"
                    >
                        →
                    </button>
                </div>
                <button className="mt-8 bg-white text-black rounded-md px-6 py-3 font-medium hover:bg-gray-100 transition-colors">
                    See all
                </button>
            </div>

            {/* Right Carousel */}
            <div className="w-full md:w-3/4 overflow-hidden">
                <div className="px-4">
                    <Slider ref={sliderRef} {...settings} className="office-carousel">
                        {offices.map((office) => (
                            <div key={office.name} className="px-3">
                                <OfficeCard
                                    {...office}
                                    onClick={() => {}}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}
