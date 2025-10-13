import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";

import { fetchOurTeamPageData} from "@/lib/api";
import {Metadata} from "next";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import MainContentOurTeam from "@/app/about-us/our-team/components/MainContentOurTeam";
import {defaulMetadataResponse} from "@/lib/utils";


export async function generateMetadata(): Promise<Metadata> {
    try {
        const metadata_response = await fetchOurTeamPageData();

        return defaulMetadataResponse(metadata_response.data?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse(null);
    }
}


export default async function Page(){
    let OurTeamData;

    try {
        // Fetch data on the server
        OurTeamData = await fetchOurTeamPageData();

    } catch (error) {
        console.error("❌ Failed to fetch home page data:", error);
        // Create fallback data structure
        OurTeamData = {
            page_header: null,
            metadata: null,
            errors: {
                page_header: error,
                metadata: null
            }
        };
    }

    console.log('OurTeamData!!!', OurTeamData);
    return(
        <>
            <MainNavigation />
            <PageHeader
                title={OurTeamData.data?.page_header.title}
                description={OurTeamData.data?.page_header.description}
                backgroundImage={OurTeamData.data?.page_header?.backgroundImage?.url || ''}
                classname={'h-[450px] md:h-[550px]'}
            />
            <MainContentOurTeam />
            <CallToAction />
            <Footer />
        </>
    )
}