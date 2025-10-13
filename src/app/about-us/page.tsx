
import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";

import {fetchAboutUsPageData} from "@/lib/api";
import {Metadata} from "next";

import MainContent from "@/app/about-us/components/MainContentAboutUs";
import {defaulMetadataResponse} from "@/lib/utils";


export async function generateMetadata(): Promise<Metadata> {
    try {
        const metadata_response = await fetchAboutUsPageData();

        return defaulMetadataResponse(metadata_response.data?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse(null);
    }

}


export default async function Page() {

    let aboutUsData;

    try {
        // Fetch data on the server
        aboutUsData = await fetchAboutUsPageData();

    } catch (error) {
        console.error("❌ Failed to fetch home page data:", error);
        // Create fallback data structure
        aboutUsData = {
            page_header: null,
            metadata: null,
            errors: {
                page_header: error,
                metadata: null
            }
        };
    }



    return (
        <>
            <MainNavigation/>

            <PageHeader
                title={aboutUsData.data?.page_header?.title}
                description={aboutUsData.data?.page_header?.description}
                backgroundImage={aboutUsData.data?.page_header?.backgroundImage?.url || ''}
                classname={'h-[450px] md:h-[550px]'}
            />
            <MainContent />
            <CallToAction/>
            <Footer/>
        </>
    )
}