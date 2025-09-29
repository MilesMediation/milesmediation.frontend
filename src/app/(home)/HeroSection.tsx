import { HeroData } from '@/types/api';

interface HeroSectionProps {
  heroData?: HeroData;
}

export default function HeroSection({ heroData }: HeroSectionProps) {
    // Use data from Strapi or fallback to default values
    const title = heroData?.main_title || "MILES ABOVE THE REST";
    const description = heroData?.description || "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is \"Miles Above the Rest.\"";

    return (
        <section id={'heroSection'} className="relative w-full h-screen overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                poster="/heroBanner.png"
            >
                <source src="/videos/2818564-hd_1920_1080_24fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0, 49, 53, 0.19) 0%, rgba(0, 49, 53, 0.64) 100%)',
                }}
            />

            {/* Text content */}
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-6">
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6"
                    style={{ fontFamily: 'var(--font-roboto-slab)' }}
                >
                    {title}
                </h1>
                <p className="text-lg sm:text-xl font-light max-w-3xl">
                    {description}
                </p>
            </div>
            {/* Sentinel at bottom to trigger nav behavior */}
            <div id="hero-bottom-sentinel" className="absolute bottom-0 left-0 w-full h-px" aria-hidden="true" />
        </section>
    )
}
