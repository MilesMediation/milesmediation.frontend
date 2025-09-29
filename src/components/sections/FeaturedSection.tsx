'use client'

import ButtonMiles from "@/components/ui/custom/ButtonMiles"
import classNames from "classnames"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface MediaItem {
    url: string;
    type?: 'image' | 'video';
    alt?: string;
}

interface FeaturedParam {
    imgBg?: string;
    featuredImage?: string | MediaItem[];
    mode?: "light" | "dark";
    bgColor?: "white" | "dark-green" | "teal" | null;
    title?: string;
    description?: string;
    alignImg?: "left" | "right";
    target_url?: string | null;
}

export function FeaturedSection({ featuredImage, target_url,imgBg = '', mode = 'light', bgColor, alignImg='left',title, description }: FeaturedParam) {
    const customBgIm = classNames({
        backgroundPosition: "center center",
        'bg-cover': true,
        'bg-no-repeat': true,

    })

    const bgColorParam = classNames({
        'bg-teal-100': bgColor === 'teal',
        'bg-[var(--color-dark-green)]': bgColor === 'dark-green',

    })

    const hasBg = Boolean(imgBg)
    console.log(hasBg)

    // Determine if we should show carousel
    const isArray = Array.isArray(featuredImage);
    const hasMultipleItems = isArray && featuredImage.length > 1;
    const fallbackImage = "/demo/locations/locationSampleImg.png";

    return (
        <div
            className={`py-40   ${hasBg && customBgIm} ${bgColorParam}`}
            style={hasBg ? { backgroundImage: `url(${imgBg})` } : {}}
        >
            <div className="container relative z-10 w-full mx-auto">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left grid */}
                    <div
                        className={`order-${
                            alignImg == "left" ? "2" : "1"
                        } flex flex-col justify-center`}
                    >
                        <h2
                            className={`font-title text-6xl font-bold mb-10 ${
                                mode === "dark" ? "text-white" : "text-[var(--color-dark-green)]"
                            }`}
                        >
                            {title && title}
                        </h2>
                        <p className={classNames("mb-8", mode === "dark" && "text-white/75")}>
                            {description && description}
                        </p>
                        {target_url &&(
                            <div>
                                <ButtonMiles>See more</ButtonMiles>
                            </div>
                        )}
                    </div>

                    {/* Right Grid */}

                    <div className={`order-${alignImg == "left" ? "1" : "2"} relative`}>
                        {hasMultipleItems ? (
                            // Carousel for multiple items using shadcn
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {featuredImage.map((item, index) => {

                                        return (
                                            <CarouselItem key={index}>
                                                {item.type === 'video' ? (
                                                    <video
                                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.url}`}
                                                        className="object-cover rounded-xl w-full"
                                                        controls
                                                        muted
                                                        loop
                                                    />
                                                ) : (
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.url}`}
                                                        alt={item.alt || `Media content ${index + 1}`}
                                                        className="object-cover rounded-xl w-full"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                    />
                                                )}
                                            </CarouselItem>
                                        )
                                    })}
                                </CarouselContent>
                                <CarouselPrevious className="left-4" />
                                <CarouselNext className="right-4" />
                            </Carousel>
                        ) : isArray && featuredImage.length === 1 ? (
                            // Single item from array
                            featuredImage[0].type === 'video' ? (
                                <video
                                    src={featuredImage[0].url}
                                    className="object-cover rounded-xl w-full"
                                    controls
                                    muted
                                    loop
                                />
                            ) : (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${featuredImage[0].url}`}
                                    alt={featuredImage[0].alt || "Media content"}
                                    className="object-cover rounded-xl w-full"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )
                        ) : (
                            // Single string or fallback
                            <img
                                src={typeof featuredImage === 'string' ? featuredImage : fallbackImage}
                                alt="Location Site"
                                className="object-cover rounded-xl w-full"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
