import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import Footer from "@/components/global/Footer";
import {customPageData} from "@/lib/api";
import MainArticleContentList from "@/app/blog/articles/components/mainArticleContentList";
import {Metadata} from "next";
import {defaulMetadataResponse} from "@/lib/utils";
import {type Member, SeoData, StrapiResponse} from "@/types/api";
import AsideCategoryList from "@/app/blog/articles/components/asideCategoryList";

// Type for the specific response we're expecting
interface PageBlogListData {
    additional_links?: { label: string; url: string; icon?: string }[] | undefined;
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    locale: string | null;
    name: string;
    description: string;
    featured_media?: {
        id: number;
        url: string;
        alternativeText?: string;
    };
    page_header?: {
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


/*
    interface ApiResponse {
    data: Member[];
    metadata?: Record<string, unknown>;
    errors?: Record<string, unknown>;
}*/





export async function generateMetadata({params}: {params: Promise<{ slug: string }>}): Promise<Metadata> {
    const slug_data = await params;
    const articles_list_endpoint =  `/articles-categories?filters[slug][$eq]=${slug_data.slug}&populate=metadata`;


    try {
        const metadata_response = await customPageData<PageBlogListData[]>(articles_list_endpoint);

        console.log('TEST1: Article List',metadata_response)
        return defaulMetadataResponse(metadata_response.data?.[0]?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse(null);
    }

}

// export default async function Page({params}: {params: Promise<{ slug: string }>}){
export default async function Page({params}: {params: Promise<{ slug: string }>}){
    const slug_data = await params;

    let ArticlesPageData: StrapiResponse<PageBlogListData[]> | null = null;

    try {
        // Fetch data on the server
        ArticlesPageData = await customPageData<PageBlogListData[]>(`/articles-categories?filters[slug][$eq]=${slug_data.slug}&populate=featured_media&populate=additional_links`);


    } catch (error) {
        console.error("❌ Failed to fetch home page data:", error);
        // Create fallback data structure
        ArticlesPageData = {
            data: [{
                id: 0,
                documentId: '',
                createdAt: '',
                updatedAt: '',
                publishedAt: null,
                locale: null,
                name: 'Articles',
                description: 'Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is "Miles Above the Rest."',
                featured_media: undefined,
                page_header: undefined,
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
            }]
        };
    }

    if(!ArticlesPageData || ArticlesPageData.data.length === 0) return null;

    const headerData = ArticlesPageData.data[0]

    console.log('Articles List prev: ',headerData);

    return(
        <>
            <MainNavigation/>
            <PageHeader
                title={headerData?.name || 'Default title'}
                description={headerData?.description || ''}
                backgroundImage={headerData?.featured_media?.url || ''}
                classname={'h-[450px] md:h-[550px]'}
            />
            <main className="container mx-auto py-10">
                <div className="grid grid-cols-10 gap-4">

                    <AsideCategoryList additionalLinks={headerData.additional_links}/>
                    <MainArticleContentList category={slug_data.slug} />
                </div>
            </main>
            <Footer />
        </>
    )
}