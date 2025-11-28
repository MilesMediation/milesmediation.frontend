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
import { Skeleton } from "@/components/ui/skeleton";
import {useState, useMemo, useEffect} from "react";

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

// Items per page constant
const ITEMS_PER_PAGE = 9;

// Function to fetch data from the API
const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())


export default function MainArticleContentList({category}: {category?: string}) {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to first page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [category]);

    // Build the endpoint with pagination parameters
    const articles_list_endpoint = useMemo(() => {
        const baseParams = category
            ? `filters[articles_category][slug][$eq]=${category}&fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&fields[4]=short_description&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name`
            : `fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&fields[4]=short_description&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name`;
        
        return `/api/articles?${baseParams}&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}`;
    }, [category, currentPage]);

    const { data, error, isLoading } = useSWR<StrapiResponse<ArticleListItem[]>>(`${NEXT_URL_BACKOFFICE}${articles_list_endpoint}`, fetcher)

    // Get pagination metadata
    const pagination = data?.meta?.pagination;
    const totalPages = pagination?.pageCount || 0;


    if (isLoading) return (
        <>
            <div className="hidden col-span-8 md:block relative z-50">
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-8'}>
                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} className={'h-full'}>
                            <div className="h-full flex flex-col rounded-lg border border-gray-200 overflow-hidden">
                                <Skeleton className="w-full h-40" />
                                <div className="p-4 space-y-3">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

    // Show error message if API request failed
    if (error) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>

    // Return null if no data is available
    if(data && data.data.length == 0) return (
        <>

                <div className={'col-span-8 p-5 text-center flex justify-center items-center'}>
                    <h1 className={'text-2xl font-medium'}>No articles found in this category.</h1>
                </div>

        </>
    );
    console.log('Articles List SWR: ',data);

    // Return early if no data is available
    if(!data || !data.data) return null;

    return(
        <>
            <div className="hidden col-span-8 md:block relative z-50">
                <div className={'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'}>
                    {data.data.map((item: ArticleListItem) => (
                        <div key={item.id} className={'h-full'}>
                            {/*<CardComponent />*/}
                            <CardComponent
                                title={item.title}
                                url={'/blog/articles/'+item.slug}
                                category={item.articles_category ? item.articles_category.name  : ''}
                                description={item.short_description || ''}
                                imageUrl={item.articleImage ? NEXT_URL_BACKOFFICE+item.articleImage.url  : ''}
                            />
                        </div>

                    ))}
                </div>
                {totalPages > 1 && (
                    <Pagination className={'text-cyan-600 text-left mt-5'}>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className={`${
                                        currentPage === 1 
                                            ? 'pointer-events-none opacity-50' 
                                            : 'cursor-pointer hover:bg-cyan-600 hover:text-white'
                                    } border-cyan-600 text-cyan-600 transition-all duration-200`}
                                />
                            </PaginationItem>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                // Show first page, last page, current page, and pages around current
                                if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(page)}
                                                isActive={currentPage === page}
                                                className={`${
                                                    currentPage === page
                                                        ? 'bg-cyan-600 text-white border-cyan-600'
                                                        : 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'
                                                } cursor-pointer transition-all duration-200`}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                } else if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                ) {
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationEllipsis className="text-cyan-600" />
                                        </PaginationItem>
                                    );
                                }
                                return null;
                            })}
                            
                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className={`${
                                        currentPage === totalPages 
                                            ? 'pointer-events-none opacity-50' 
                                            : 'cursor-pointer hover:bg-cyan-600 hover:text-white'
                                    } border-cyan-600 text-cyan-600 transition-all duration-200`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}

            </div>
        </>
    )
}