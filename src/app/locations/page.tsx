"use client";

import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import {FeaturedSection} from "@/components/sections/FeaturedSection";
import {FeaturedCardsSection} from "@/components/sections/FeaturedCardsSection";
import RelatedArticles from "@/components/sections/RelatedArticles";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import useSWR from 'swr';
import { apiGet } from '@/lib/apiClients';

export interface officesData {
    name: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    url: string;
    image: string;
}

// Define the office data interface based on the API response
interface OfficeData {
    id: number;
    documentId: string;
    name: string;
    available: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Description: string;
    telephone: string;
    email: string;
    featuredImage:{
        url: string;
    }
    galleryDescription: string;
    neutralsDescription: string;
    address: string;
    gallery?: {
        url: string;
        alternativeText?: string;
    };
}

// Define the location data interface based on the API response
interface LocationData {
    id: number;
    documentId: string;
    name: string;
    available: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Description: string;
    telephone: string;
    email: string;
    galleryDescription: string;
    neutralsDescription: string;
    address: string;
    offices: OfficeData[];
}

interface LocationsResponse {
    data: LocationData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// Fetcher function for SWR
const fetcher = (url: string) => apiGet<LocationsResponse>(url);


export default function Page() {
    // Use SWR to fetch locations data
    const { data, error, isLoading } = useSWR(
        'http://localhost:1337/api/locations?populate[offices][populate][featuredImage][populate]=*',
        fetcher
    );



    // Transform API data to match FeaturedCardsSection props
    const transformOfficeData = (office: OfficeData): officesData => ({
        name: office.name,
        size: 'lg' as const,
        url: `/locations/offices/${office.slug}`,
        image: office.featuredImage?.url || ''
    });

    // Transform locations data for rendering
    const locationsData = data?.data?.map(location => ({
        title: location.name,
        offices: location.offices?.map(transformOfficeData) || []
    })) || [];

    return (
        <>
            <div>
                <MainNavigation/>
                <PageHeader title={'Locations'}
                            description={'Our diverse legal expertise, consistently high-touch administrative support, ' +
                                'and dedication to our clients and neutrals can be summed up in the following words: ' +
                                'the Miles Mediation experience is "Miles Above the Rest."'}
                />

                {/* Loading State */}
                {isLoading && (
                    <div className="container mx-auto py-10">
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-lg text-gray-600">Loading locations...</span>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="container mx-auto py-10">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="text-red-600 mr-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-red-800">Error Loading Locations</h3>
                                    <p className="text-red-600 mt-1">
                                        {error.message || 'Failed to load locations data. Please try again later.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content - only show when data is loaded and no error */}
                {!isLoading && !error && (
                    <>
                        <FeaturedSection
                            mode={'light'}
                            /*imgBg={'/demo/locations/locationSampleImg.png'}*/
                            bgColor={'white'}
                            alignImg={'right'}
                            title={'Resolution Services, Wherever You Are'}
                            description={'Miles Mediation and Arbitration is the fastest growing mediation and arbitration firm in\n' +
                                '                            the Southeast. Miles is headquartered in Atlanta with additional offices in Savannah,\n' +
                                '                            Charlotte, Nashville, Jacksonville, Tampa and Columbia, SC.\n' +
                                '\n' +
                                '                            Miles is shaping the future of resolution with a comprehensive professional services\n' +
                                '                            model that combines the expertise of its highly skilled and diverse panel of ADR\n' +
                                '                            professionals (neutrals) with an unparalleled level of client support in order to guide\n' +
                                '                            and empower parties to fair, timely and cost-effective resolution regardless of case\n' +
                                '                            size, specialization or complexity.'}
                        />

                        {/* Render FeaturedCardsSection for each location */}
                        {locationsData.map((location, index) => (
                            <FeaturedCardsSection 
                                key={index}
                                title={location.title} 
                                offices={location.offices}
                            />
                        ))}

                        <div>
                            <RelatedArticles cardSize={'sm'} />
                        </div>
                        <div>
                            <CallToAction />
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}