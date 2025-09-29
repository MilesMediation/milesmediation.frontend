import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import Footer from "@/components/global/Footer";
import {customPageData} from "@/lib/api";
import MainArticleContentList from "@/app/blog/articles/components/mainArticleContentList";
import {Metadata} from "next";
import {defaulMetadataResponse} from "@/lib/utils";
import {SeoData, StrapiResponse} from "@/types/api";
import AsideCategoryList from "@/app/blog/articles/components/asideCategoryList";

// Type for the specific response we're expecting
interface PageBlogListData {
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

const articles_list_endpoint = '/plage-blog-list?populate[metadata][populate]=*&populate[page_header][populate]=*';


export async function generateMetadata(): Promise<Metadata> {
    try {
        const metadata_response = await customPageData<PageBlogListData>(articles_list_endpoint);

        console.log('Article List',metadata_response)

        return defaulMetadataResponse(metadata_response.data?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse(null);
    }
}


export default async function Page(){
    let ArticlesPageData: StrapiResponse<PageBlogListData> | null = null;

    try {
        // Fetch data on the server
        ArticlesPageData = await customPageData<PageBlogListData>(articles_list_endpoint);


    } catch (error) {
        console.error("❌ Failed to fetch home page data:", error);
        // Create fallback data structure
        ArticlesPageData = {
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

    if(!ArticlesPageData) return null;

    console.log('Articles List: ',ArticlesPageData);

    return(
        <>
            <MainNavigation/>
            <PageHeader title={ArticlesPageData.data?.page_header.title || 'Articles'}
                        description={ArticlesPageData.data?.page_header.description || ''}
                        backgroundImage={ArticlesPageData.data?.page_header?.backgroundImage?.url || ''}
            />
            <main className="container mx-auto py-10">
                <div className="grid grid-cols-10 gap-4">

                    <AsideCategoryList />
                    <MainArticleContentList />
                </div>
            </main>
            <Footer />
        </>
    )
}