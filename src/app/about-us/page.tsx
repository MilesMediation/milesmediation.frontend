
import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";

import {fetchAboutUsPageData} from "@/lib/api";
import {Metadata} from "next";

import MainContent from "@/app/about-us/components/MainContentAboutUs";


export async function generateMetadata(): Promise<Metadata> {
    try {
        const metadata_response = await fetchAboutUsPageData();

        if (metadata_response.data) {

            const seo = metadata_response.data.metadata;

            return {
                title: seo?.metaTitle || "Miles Mediation - Miles Above the Rest",
                description: seo?.metaDescription || "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.",
                keywords: seo?.keywords || "mediation, arbitration, ADR, dispute resolution, legal services",
                robots: seo?.metaRobots || "index, follow",
                viewport: seo?.metaViewport || "width=device-width, initial-scale=1",
                openGraph: {
                    title: seo?.metaTitle ||  "Miles Mediation",
                    description: seo?.metaDescription,
                    type: "website",
                    locale: "en_US",
                },
                twitter: {
                    card: "summary_large_image",
                    title: seo?.metaTitle || "Miles Mediation",
                    description: seo?.metaDescription,
                },
                alternates: {
                    canonical: seo?.canonicalURL || "https://milesmediation.com",
                },
            };
        }
    } catch (error) {
        console.error("Error generating metadata:", error);
    }

    // Fallback metadata
    return {
        title: "Miles Mediation - Miles Above the Rest",
        description: "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.",
        keywords: "mediation, arbitration, ADR, dispute resolution, legal services",
        robots: "index, follow",
        viewport: "width=device-width, initial-scale=1",
    };
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
            />
            <MainContent />
            <CallToAction/>
            <Footer/>
        </>
    )
}