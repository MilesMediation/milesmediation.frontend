import React from 'react';

interface SkeletonCardProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function SkeletonCard({ size = 'lg' }: SkeletonCardProps) {
    const sizeClasses = {
        sm: 'h-48',
        md: 'h-56',
        lg: 'h-64',
        xl: 'h-72'
    };

    return (
        <div className={`${sizeClasses[size]} bg-gray-200 rounded-lg animate-pulse overflow-hidden`}>
            <div className="h-full flex flex-col">
                {/* Image skeleton */}
                <div className="flex-1 bg-gray-300"></div>
                
                {/* Content skeleton */}
                <div className="p-4 space-y-3">
                    {/* Title skeleton */}
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    
                    {/* Description skeleton */}
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    
                    {/* Button skeleton */}
                    <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    );
}

// Skeleton for FeaturedCardsSection
export function SkeletonFeaturedCardsSection() {
    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Title skeleton */}
                <div className="text-center mb-12">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
                </div>
                
                {/* Cards grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} size="lg" />
                    ))}
                </div>
            </div>
        </div>
    );
}

