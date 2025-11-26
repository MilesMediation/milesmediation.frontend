import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import {Metadata} from "next";
import {customPageData} from "@/lib/api";
import {defaulMetadataResponse} from "@/lib/utils";
import { SeoData, StrapiResponse, ArticlesType} from "@/types/api";

import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa6";


type contentSectionType = {
    id: string;
    description?: string;
    title?: string;
    is_available?: boolean;
    category?: {
        slug: string;
    };
    dark_mode?: boolean;
    show_image?: boolean;
    card_size?: 'sm' | 'md' | 'lg' | 'xl';
} | null

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
    sections:contentSectionType[]
}

const blog_page_endpoint = '/page-blog-and-event?populate[metadata][populate]=*&populate[page_header][populate]=*&populate[sections][populate]=*';

/** Medata section
 *  This section handles the metada data of the page on the server side
 * */
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

    /** This code block request the data for the page on the server side
     * */
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
                sections: [],
                createdBy: '',
                updatedBy: ''
            }
        };
    }

    if(!ArticlesPageData) return null;

    console.log('Articles Page data', ArticlesPageData.data.sections)
    const section_content : contentSectionType[] = ArticlesPageData.data?.sections.length > 0 ? ArticlesPageData.data.sections : [];
    
    // Temporary object to store posts by slug
    const postsBySlug: { [key: string]: ArticlesType[] } = {};
    
    if (section_content.length > 0 && section_content) {
        // First, get unique category slugs
        const uniqueSlugs = new Set<string>();
        section_content.forEach((item) => {
            if (item && item.category) {
                uniqueSlugs.add(item.category.slug);
            }
        });

        // Fetch articles for each category slug
        for (const categorySlug of uniqueSlugs) {
            try {
                const response = await customPageData<ArticlesType[]>(`/articles?filters[articles_category][slug][$eq]=${categorySlug}&sort=createdAt:desc&pagination[limit]=3&populate=*`);
                postsBySlug[categorySlug] = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                console.error(`❌ Error fetching articles for category ${categorySlug}:`, error);
                postsBySlug[categorySlug] = [];
            }
        }
    }

    // Create the final array with section data and corresponding posts
    const sectionArray = section_content
        .filter((item): item is NonNullable<contentSectionType> & { category: { slug: string } } => 
            item !== null && item.category !== undefined && item.category.slug !== undefined
        )
        .map((item) => ({
            title: item.title,
            category: {
                slug: item.category.slug
            },
            is_available: item.is_available,
            description: item.description,
            post_list: postsBySlug[item.category.slug] || [],
            dark_mode: item.dark_mode,
            show_image: item.show_image,
            card_size: item.card_size,

        }));




    console.log('Array :', sectionArray)
    console.log('Section content :', section_content)

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
            {/*<MainContentBlogLanding />*/}

            {sectionArray.map((item, index)=>{
                if (!item) return null;
                return(
                    <section key={ index } className={`py-30 ${item.dark_mode ? 'bg-teal-900 text-white' : 'bg-white'}`}>
                        {/** Section articles */}
                        <div className={'container mx-auto'}>
                            <div className={'flex  justify-between w-full mb-4'}>
                                <h2 className={`text-4xl font-medium ${item.dark_mode ? 'text-white' : 'main-text-color'} `}>{item.title}</h2>
                                <Link  href={`/blog/category/${item.category.slug}`} className={`inline-flex items-center rounded-md border px-2 py-0 text-xs transition-all duration-300 ease-in-out ${item.dark_mode ? 'text-white ' : 'text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-white '} `}>
                                    View more <FaArrowRight className={'ml-2'} />
                                </Link>
                            </div>
                            <p className={'mb-10'}>
                                {item.description}
                            </p>

                            {/** Content List */}
                            <div className={'mt-5 flex flex-row justify-between gap-4 relative'}>
                                {item.post_list.map((post, index)=>{
                                    return (
                                        <div key={index} className={'w-full max-w-1/3'}>
                                            <Link href={`/articles/${post.slug}`}>
                                                <div className={'flex flex-col justify-start group'}>
                                                    {item.show_image ? (
                                                    <div className={`h-[250px] rounded-md overflow-hidden`}>

                                                        <div
                                                            className="h-full w-full bg-center bg-no-repeat bg-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                                            style={{
                                                                backgroundImage: post.articleImage
                                                                    ? `url(${NEXT_URL_BACKOFFICE}${post.articleImage.url})`
                                                                    : 'url("/cardImgSample1.png")',
                                                            }}
                                                        >
                                                        </div>

                                                    </div>
                                                        ): (
                                                            <div className={'relative'}>
                                                                <hr className={'h-[3px] absolute top-0 border-0 bg-teal-400 z-10 w-0 group-hover:w-full transition-all duration-500 ease-in-out'}/>
                                                                <hr className={'absolute w-full top-0  '}/>
                                                            </div>
                                                    )}
                                                    <div className={'mt-5'}>

                                                        <h3 className={'text-xl font-medium line-clamp-2'}>
                                                            {post.title}
                                                        </h3>
                                                        <p className={'mt-2 line-clamp-2'}>
                                                            {post.short_description}
                                                        </p>
                                                        <div className={'mt-4'}>
                                                        <span className={`flex items-center ${item.dark_mode ? 'text-white' : 'text-teal-500'}  relative overflow-hidden`} >
                                                            <span className={'relative left-[-75px] group-hover:left-[0px] transition-all duration-300 ease-in-out'}>View more</span>
                                                            <FaArrowRight className={'ml-2 relative left-[-80px] group-hover:left-[0px] transition-all duration-300 ease-in-out'} />
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                    )
                                })}

                            </div>
                        </div>
                    </section>
                )
            })}



            <CallToAction />
            <Footer/>
        </>
    )
}