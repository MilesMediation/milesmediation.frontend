
import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import MainContentEvents from "@/app/blog/events/components/mainContentEvents";
import AsideCategoryList from "@/app/blog/articles/components/asideCategoryList";
import {Metadata} from "next";
import {customPageData} from "@/lib/api";
import {defaulMetadataResponse} from "@/lib/utils";
import {SeoData, StrapiResponse} from "@/types/api";
import {URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";

// Type for the specific response we're expecting
interface PageEventListData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    locale: string | null;
    page_header: {
        id: number;
        title: string;
        description: string;
        backgroundImage?: {
            id: number;
            url: string;
            alternativeText?: string;
        };
    };
    metadata: SeoData;
    createdBy: unknown;
    updatedBy: unknown;
}

const articles_list_endpoint = '/page-event?populate[metadata][populate]=*&populate[page_header][populate]=*';


export async function generateMetadata(): Promise<Metadata> {
    try {
        const metadata_response = await customPageData<PageEventListData>(articles_list_endpoint);

        console.log('Article List',metadata_response)

        return defaulMetadataResponse(metadata_response.data?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse(null);
    }
}



export default async function Page(){

    let EventsPageData: StrapiResponse<PageEventListData> | null = null;

    try {
        // Fetch data on the server
        EventsPageData = await customPageData<PageEventListData>(articles_list_endpoint);

    } catch (error) {
        console.error("❌ Failed to fetch home page data:", error);
        // Create fallback data structure
        EventsPageData = {
            data: {
                id: 0,
                documentId: '',
                createdAt: '',
                updatedAt: '',
                publishedAt: null,
                locale: null,
                page_header: {
                    id: 0,
                    title: 'Articles',
                    description: 'Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is "Miles Above the Rest."'
                },
                metadata: {
                    id: 0,
                    metaTitle: 'Miles Mediation - Miles Above the Rest',
                    metaDescription: 'Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.',
                    keywords: 'mediation, arbitration, ADR, dispute resolution, legal services',
                    metaRobots: 'index, follow',
                    structuredData: {},
                    metaViewport: 'width=device-width, initial-scale=1',
                    canonicalURL: 'https://milesmediation.com'
                },
                createdBy: null,
                updatedBy: null
            }
        };
    }

    if(!EventsPageData) return null;




    return(
        <>
            <MainNavigation/>
            <PageHeader
                title={EventsPageData.data.page_header.title || 'Events'}
                description={EventsPageData.data.page_header.description || ''}
                backgroundImage={EventsPageData.data.page_header.backgroundImage ? EventsPageData.data.page_header.backgroundImage.url : ''}
                classname={'h-[450px] md:h-[550px]'}
            />
            <main className="container mx-auto py-10">
                <div className="grid grid-cols-10 gap-4">
                    <AsideCategoryList />
                    <MainContentEvents />
                </div>
            </main>

            <CallToAction />
            <Footer/>
        </>
    )
}