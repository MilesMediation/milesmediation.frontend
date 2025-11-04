import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";

import MainContentOurTeam from "@/app/practice-area/[slug]/components/mainContentPracticeArea";
import {SeoData, StrapiResponse} from "@/types/api";
import {customPageData} from "@/lib/api";
import {Metadata} from "next";
import {defaulMetadataResponse} from "@/lib/utils";

interface PracticeAreaData {
    id: number;
    Name: string;
    description: string;
    slug: string;
    featuredImage?: { 
        id: number;
        url: string;
        alternativeText?: string;
    } | null;
    metadata?: SeoData;
}

// Metadata here
export async function generateMetadata({params}: {params: Promise<{ slug: string }>}): Promise<Metadata> {
    const slug_data = await params;
    try {
        const metadata_response = await customPageData<PracticeAreaData[]>(`/practice-areas?filters[slug][$eq]=${slug_data.slug}&populate[metadata][populate]=*`);
        return defaulMetadataResponse(metadata_response.data[0]?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse(null);
    }

}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug_data = await params;
    let PracticeAreaHeader: StrapiResponse<PracticeAreaData[]> | null = null;

    // Get Header data here using the slug param
    const URL_ENDPOINT = `/practice-areas?filters[slug][$eq]=${slug_data.slug}&populate=*`;

    try{
        PracticeAreaHeader = await customPageData<PracticeAreaData[]>(`${URL_ENDPOINT}`);

    } catch (error){
        console.error("❌ Failed to fetch Practice Area data:", error);
        // Create fallback data structure
        PracticeAreaHeader = {
            data: [],
            meta: undefined
        };
    }

    let data: PracticeAreaData | null = null;

    if(PracticeAreaHeader && Array.isArray(PracticeAreaHeader.data) && PracticeAreaHeader.data.length > 0){
        data = PracticeAreaHeader.data[0];
    }

    if(!data) return null;



    return (
        <>
            <MainNavigation />
            <PageHeader 
                backgroundImage={ data.featuredImage?.url || ''}
                title={ data.Name || 'Default title'}
                classname={'h-[450px] md:h-[550px]'}
            />
            <MainContentOurTeam slug={slug_data.slug} />
            <CallToAction />
            <Footer />
        </>
    )

}