import { HeroData } from '@/types/api';
import { URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import AnimatedHeroText from './AnimatedHeroText';
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface HeroSectionProps {
  heroData?: HeroData;
}

// Helper function to get video MIME type from URL
function getVideoMimeType(url: string): string {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('.mp4')) return 'video/mp4';
    if (lowerUrl.includes('.webm')) return 'video/webm';
    if (lowerUrl.includes('.ogg')) return 'video/ogg';
    if (lowerUrl.includes('.mov')) return 'video/quicktime';
    if (lowerUrl.includes('.avi')) return 'video/x-msvideo';
    if (lowerUrl.includes('.wmv')) return 'video/x-ms-wmv';
    if (lowerUrl.includes('.flv')) return 'video/x-flv';
    if (lowerUrl.includes('.mkv')) return 'video/x-matroska';
    // Default fallback
    return 'video/mp4';
}

// Helper function to check if URL is a video
function isVideoUrl(url: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext)) || 
           lowerUrl.includes('video/') || 
           /video/.test(lowerUrl);
}

// Helper function to check if URL is an image
function isImageUrl(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext)) ||
        lowerUrl.includes('image/') ||
        /image/.test(lowerUrl);
}

type FeaturedBannerData = HeroData['featured_banner'] | { url?: string } | null | undefined;

function getFeaturedBannerUrl(featuredBanner: FeaturedBannerData): string | null {
    if (!featuredBanner) {
        return null;
    }

    if (Array.isArray(featuredBanner)) {
        return featuredBanner[0]?.url ?? null;
    }

    return featuredBanner.url ?? null;
}

export default function HeroSection({ heroData }: HeroSectionProps) {
    const title = heroData?.main_title ?? "MILES ABOVE THE REST";
    const arrayExample: string[] =
        heroData?.array_text?.length && heroData.array_text.length > 0
            ? heroData.array_text
            : ["Mediation", "Arbitration", "ADR On Demand", "Above everything"];
    const description =
        heroData?.description ??
        'Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is "Miles Above the Rest."';

    const bannerUrl = getFeaturedBannerUrl(heroData?.featured_banner);

    // Determine if banner is video or image
    const isVideo = bannerUrl ? isVideoUrl(bannerUrl) : false;
    const isImage = bannerUrl ? isImageUrl(bannerUrl) : false;
    
    // Fallback to default video if no banner provided
    const defaultVideoUrl = "/videos/2818564-hd_1920_1080_24fps.mp4";

    return (
        <section id={'heroSection'} className="relative w-full h-screen overflow-hidden">
            <div className={'absolute top-0 left-0 w-full h-full bg-gray-950/35 backdrop-blur-[3px] z-20'}></div>
            {/* Background Media - Video or Image */}
            {isVideo && bannerUrl ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    poster="/heroBanner.png"
                >
                    <source src={URL_BACKOFFICE_DOMAIN + bannerUrl} type={getVideoMimeType(bannerUrl)} />
                    Your browser does not support the video tag.
                </video>
            ) : isImage && bannerUrl ? (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={URL_BACKOFFICE_DOMAIN + bannerUrl}
                        alt={title}
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                </>

            ) : (
                // Default fallback video
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    poster="/heroBanner.png"
                >
                    <source src={defaultVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0, 16, 18, 0) 0%, rgba(0, 16, 18, 0.60) 100%)',
                }}
            />

            {/* Text content */}
            <div className="container mx-auto relative z-20 flex flex-col justify-center items-start h-full text-white px-6">
                <p className={'font-medium text-4xl'}>{title}</p>
                <AnimatedHeroText items={arrayExample} />
                <p className="text-5xl upp sm:text-xl font-light max-w-3xl">
                    {description}
                </p>
                {(heroData?.buttons && heroData.buttons?.length > 0 )  && (
                <div className={'mt-5 flex gap-5'}>
                    {heroData.buttons.map((button, index) => (
                        <Link key={index} href={button.target_url ? button.target_url : '/'}>
                            <Button
                                variant={button.variant ? button.variant : 'default'}
                                className={'transition-all duration-350 ease-in-out'}>
                                {button.label}
                            </Button>
                        </Link>

                    ))}
                    {/*<Button variant={'outline'} className={'bg-transparent border border-white !text-white hover:!text-teal-900  transition-all duration-350 ease-in-out'}>
                        See more
                    </Button>*/}
                </div>
                ) }
            </div>
            {/* Sentinel at bottom to trigger nav behavior */}
            <div id="hero-bottom-sentinel" className="absolute bottom-0 left-0 w-full h-px" aria-hidden="true" />
        </section>
    )
}
