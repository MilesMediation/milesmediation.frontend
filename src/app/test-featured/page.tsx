"use client";

import { FeaturedSection } from "@/components/sections/FeaturedSection";

export default function TestFeaturedPage() {
    // Test data with mixed images and videos
    const testMediaArray = [
        { url: "/cardImgSample1.png", type: "image" as const, alt: "Sample image 1" },
        { url: "/demo/locations/locationSampleImg.png", type: "image" as const, alt: "Sample image 2" },
        { url: "/heroBanner.png", type: "image" as const, alt: "Hero banner" }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="py-20">
                <h1 className="text-4xl font-bold text-center mb-20 text-[var(--color-dark-green)]">
                    FeaturedSection Carousel Test
                </h1>
                
                {/* Test with array of media (carousel) */}
                <FeaturedSection
                    title="Test Carousel with Multiple Images (shadcn)"
                    description="This section demonstrates the new carousel functionality with multiple images using shadcn carousel. You can navigate using the arrow buttons."
                    featuredImage={testMediaArray}
                    alignImg="right"
                    mode="light"
                    bgColor="white"
                />

                {/* Test with single image (no carousel) */}
                <FeaturedSection
                    title="Single Image (No Carousel)"
                    description="This section shows a single image without carousel functionality."
                    featuredImage="/cardImgSample1.png"
                    alignImg="left"
                    mode="light"
                    bgColor="teal"
                />

                {/* Test with single video */}
                <FeaturedSection
                    title="Single Video (No Carousel)"
                    description="This section shows a single video without carousel functionality."
                    featuredImage={[{ url: "/public/videos/2818564-hd_1920_1080_24fps.mp4", type: "video", alt: "Single video" }]}
                    alignImg="right"
                    mode="dark"
                    bgColor="dark-green"
                />

                {/* Test with empty/null (fallback) */}
                <FeaturedSection
                    title="Fallback Image"
                    description="This section shows the fallback image when no media is provided."
                    featuredImage={'/'}
                    alignImg="left"
                    mode="light"
                    bgColor="white"
                />
            </div>
        </div>
    );
}
