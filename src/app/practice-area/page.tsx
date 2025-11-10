'use server'

import {PageDataType, StrapiResponse} from "@/types/api";
import {customPageData} from "@/lib/api";
import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import {Metadata} from "next";
import {defaulMetadataResponse} from "@/lib/utils";
import MainContentPracticeAreaLanding from "@/app/practice-area/components/MainContentPracticeAreaLanding";
import CustomBlockDescription from "@/app/practice-area/components/CustomBlockDescription";


/** Constants for API endpoints */
const PRACTICEAREA_URL_METADATA = `/page-practice-area?populate[metadata][populate]=*`;
const PRACTICEAREA_URL_PAGE_HEADER = `/page-practice-area?populate[page_header][populate]=*`;

/** METADATA FUNCTION */
export async function generateMetadata(): Promise<Metadata> {
    try {
        const metadata_response = await customPageData<PageDataType>(PRACTICEAREA_URL_METADATA);

        return defaulMetadataResponse(metadata_response.data?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse({
            id: 0,
            metaTitle: 'Practice Areas - Miles Mediation & Arbitration',
            metaDescription: 'Explore our diverse range of practice areas at Miles Mediation & Arbitration, where expert neutrals facilitate effective dispute resolution across various legal fields.',
            keywords: 'Practice Areas, Mediation, Arbitration, Dispute Resolution, Legal Services',
            metaRobots: 'index, follow',
            structuredData: {},
            metaViewport: 'width=device-width, initial-scale=1',
            canonicalURL: 'https://www.milesmediation.com/practice-area',
        });
    }
}


export default async function Page() {

    let PageHeaderPracticeArea: StrapiResponse<PageDataType> | null = null;

    try {
        // Fetch data on the server
        PageHeaderPracticeArea = await customPageData<PageDataType>(PRACTICEAREA_URL_PAGE_HEADER);


    } catch (error) {
        console.error("❌ Failed to fetch home page data:", error);
        // Create fallback data structure
        /*PageHeaderPracticeArea = {
            data: {
                id: 0,
                page_header: {
                    id: 0,
                    title: 'Articles',
                    description: '',
                    backgroundImage: {id: 0, url: '' },

                },
                createdBy: '',
                updatedBy: ''
            }
        };*/
    }

    if(!PageHeaderPracticeArea) return null;

    console.log('Response Data: ', PageHeaderPracticeArea.data.long_description);

    return (
        <>
            <MainNavigation/>

            <PageHeader
                title={PageHeaderPracticeArea.data.page_header.title}
                description={PageHeaderPracticeArea.data.page_header.description}
                backgroundImage={PageHeaderPracticeArea.data.page_header.backgroundImage ? PageHeaderPracticeArea.data.page_header.backgroundImage.url : ''}
                classname={'h-[450px] md:h-[550px]'}
            />
            <main>
                {(PageHeaderPracticeArea.data.long_description && PageHeaderPracticeArea.data.long_description.length > 0) &&(
                <div className="container mx-auto py-10">
                    <CustomBlockDescription content={PageHeaderPracticeArea.data.long_description} />
                </div>
                )}
                {/* Main Content Client Side Rendering */}
                <MainContentPracticeAreaLanding />
            </main>
            <CallToAction />
            <Footer />
        </>
    )
}