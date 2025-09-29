'use client'

import CardComponent from "@/components/flowbite/CardComponent";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import useSWR from "swr";
import type {StrapiResponse} from "@/types/api";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";

// Type for the specific response we're getting from this endpoint
interface ArticleListItem {
    id: number;
    title: string;
    slug: string;
    isAvailable?: boolean;
    CreatedDate?: string | null;
    short_description?: string;
    articleImage?: {
        url: string;
    };
    articles_category?: {
        slug: string;
        name: string;
    };
}

const articles_list_endpoint = '/api/articles?fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&&fields[4]=short_description&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name';

// Function to fetch data from the API
const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())


export default function MainArticleContentList() {


    const { data, error, isLoading } = useSWR<StrapiResponse<ArticleListItem[]>>(`${NEXT_URL_BACKOFFICE}${articles_list_endpoint}`, fetcher)


    if (isLoading) return (
        <div>
            <div className={'h-[650px] p-60 text-center'}>
                <h1>Loading...</h1>
            </div>
        </div>
    )

    // Show error message if API request failed
    if (error) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>

    // Return null if no data is available
    if(!data) return null;
    console.log('Articles List SWR: ',data);

    return(
        <>
            <div className="hidden col-span-8 md:block relative z-50">
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-8'}>
                    {data.data.map((item: ArticleListItem) => (
                        <div key={item.id} className={'h-full'}>
                            {/*<CardComponent />*/}
                            <CardComponent
                                title={item.title}
                                url={'/blog/articles/'+item.slug}
                                category={item.articles_category ? item.articles_category.name : ''}
                                description={item.short_description || ''}
                                imageUrl={item.articleImage ? NEXT_URL_BACKOFFICE+item.articleImage.url  : ''}
                            />
                        </div>

                    ))}
                </div>
                <Pagination className={'text-cyan-600 text-left mt-5'}>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>
        </>
    )
}