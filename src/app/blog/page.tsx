import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import {Metadata} from "next";
import {customPageData} from "@/lib/api";
import {defaulMetadataResponse} from "@/lib/utils";
import {SeoData, StrapiResponse} from "@/types/api";
import MainContentBlogLanding from "@/app/blog/components/mainContentBlogLanding";

interface PageBlogLandingDataType{
    id: number;
    metadata: SeoData;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    page_header: {
        id: number;
        title: string;
        createdBy?: string;
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string | null;
        locale?: string | null;
        description: string;
        backgroundImage?: {
            id: number;
            url: string;
        };
    };
}

const blog_page_endpoint = '/page-blog-and-event?populate[metadata][populate]=*&populate[page_header][populate]=*';

export async function generateMetadata(): Promise<Metadata> {
    try {
        const metadata_response = await customPageData<PageBlogLandingDataType>(blog_page_endpoint);

        return defaulMetadataResponse(metadata_response.data?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse(null);
    }
}

export default async function Blog(){
    let ArticlesPageData: StrapiResponse<PageBlogLandingDataType> | null = null;

    try {
        // Fetch data on the server
        ArticlesPageData = await customPageData<PageBlogLandingDataType>(blog_page_endpoint);


    } catch (error) {
        console.error("❌ Failed to fetch home page data:", error);
        // Create fallback data structure
        ArticlesPageData = {
            data: {
                id: 0,
                page_header: {
                    id: 0,
                    title: 'Articles',
                    description: '',
                    backgroundImage: {id: 0, url: '' }
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
                createdBy: '',
                updatedBy: ''
            }
        };
    }

    if(!ArticlesPageData) return null;




    return(
        <>
            <MainNavigation/>
            <PageHeader
                title={ArticlesPageData.data.page_header.title || 'Blog & Events'}
                description={ ArticlesPageData.data.page_header.description ||''}
                backgroundImage={ ArticlesPageData.data.page_header.backgroundImage ? ArticlesPageData.data.page_header.backgroundImage.url  :''}
                classname={'h-[450px] md:h-[550px]'}
            />

            {/** This main content blog has client side rendering */}
            <MainContentBlogLanding />

            <CallToAction />
            <Footer/>
        </>
    )
}