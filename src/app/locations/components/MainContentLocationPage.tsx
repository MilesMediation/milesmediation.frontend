"use client";

/** Imports */
import {useEffect} from 'react';
import {FeaturedCardsSection} from "@/components/sections/FeaturedCardsSection";
import RelatedArticles from "@/components/sections/RelatedArticles";
import CallToAction from "@/components/global/CallToAction";

import { officesData } from "./types";
import { LocationData, OfficeData } from "@/types/api";
import { fetchPageLocationsWithOffices} from "@/lib/api";
import useSWR from 'swr';
import { SkeletonFeaturedCardsSection } from "./SkeletonCard";

/** SWR fetcher function */
const fetcher = async () => {
    return await fetchPageLocationsWithOffices();
};



/** Main Comnponent */
export default function MainContentLocationPage() {
    const { data: locationsResponse, error, isLoading } = useSWR('locations-with-offices', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 60000, // Cache for 1 minute
    });

    const locationsData = locationsResponse?.data || [];

    // Transform API data to match FeaturedCardsSection props
    const transformOfficeData = (office: OfficeData): officesData => ({
        name: office.name,
        size: 'lg' as const,
        url: `/locations/offices/${office.slug}`,
        image: office.featuredImage?.url || ''
    });

    // Transform locations data for rendering - now using the correct structure
    const transformedLocationsData = locationsData?.map((location: LocationData) => ({
        title: location.name, // Use location.name instead of office.location?.name
        slug: location.slug,
        offices: location.offices.map(transformOfficeData) // Map all offices in this location
    })) || [];

    // Log the fetched data to console (as requested)
    useEffect(() => {
        if (locationsResponse?.data) {
            console.log("📍 MainContent locations data fetched:", {
                locationsCount: locationsResponse.data.length,
                locations: locationsResponse.data.map(location => ({
                    id: location.id,
                    name: location.name,
                    slug: location.slug,
                    officesCount: location.offices.length,
                    offices: location.offices.map(office => ({
                        id: office.id,
                        name: office.name,
                        slug: office.slug,
                        hasImage: !!office.featuredImage?.url
                    }))
                }))
            });
        }
    }, [locationsResponse]);

    // Show skeleton while loading
    if (isLoading) {
        return (
            <>
                <SkeletonFeaturedCardsSection />
                <div>
                    <RelatedArticles cardSize={'sm'}/>
                </div>
                <div>
                    <CallToAction/>
                </div>
            </>
        );
    }

    // Show error state if needed
    if (error) {
        console.error("❌ MainContent: Failed to fetch locations:", error);
    }

    return (
        <>
            {console.log('Originak locations:', locationsData)}
            {console.log('transformed locations:', transformedLocationsData)}
            {/* Render FeaturedCardsSection for each location */}
            {transformedLocationsData.map((location, index) => (
                <div id={`officesSection_${location.title}`} key={index}>
                    <FeaturedCardsSection
                        title={`${location.title} - ${location.slug}`}
                        offices={location.offices}
                        seeMoreURL={location.slug ? `/locations/${location.slug}` : '/'}

                    />
                </div>
            ))}

            <div>
                <RelatedArticles cardSize={'sm'}/>
            </div>
            <div>
                <CallToAction/>
            </div>

        </>
    );
}
