import { HeroData } from '@/types/api';
import { URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import AnimatedHeroText from './AnimatedHeroText';

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

export default function HeroSection({ heroData }: HeroSectionProps) {
    // Use data from Strapi or fallback to default values

    console.log('heroData', heroData)
    const title = heroData?.main_title || "MILES ABOVE THE REST";
    const arrayExample = ['Mediation', 'Arbitration', 'ADR On Demand', 'Above everything']
    const description = heroData?.description || "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is \"Miles Above the Rest.\"";

    // Get featured_banner URL - handle both array and object formats
    const bannerUrl = heroData?.featured_banner?.[0]?.url || 
                     (heroData?.featured_banner as any)?.url || 
                     null;

    // Determine if banner is video or image
    const isVideo = bannerUrl ? isVideoUrl(bannerUrl) : false;
    const isImage = bannerUrl ? isImageUrl(bannerUrl) : false;
    
    // Fallback to default video if no banner provided
    const defaultVideoUrl = "/videos/2818564-hd_1920_1080_24fps.mp4";

    return (
        <section id={'heroSection'} className="relative w-full h-screen overflow-hidden top-[-100px]">
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
                <img
                    src={URL_BACKOFFICE_DOMAIN + bannerUrl}
                    alt={title}
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
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
                <p className={'font-medium text-3xl'}>We are miles</p>
                <AnimatedHeroText items={arrayExample} />
                <p className="text-5xl upp sm:text-xl font-light max-w-3xl">
                    {description}
                </p>
            </div>
            {/* Sentinel at bottom to trigger nav behavior */}
            <div id="hero-bottom-sentinel" className="absolute bottom-0 left-0 w-full h-px" aria-hidden="true" />
        </section>
    )
}
