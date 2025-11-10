'use client'

import RelatedArticles from "@/components/sections/RelatedArticles";
import useSWR from "swr";
import type {MembersResponse} from "@/types/api";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";

// Function to fetch data from the API
const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())

// API endpoint to get members with their categories
const FETCH_URL = `/api/articles?fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name&sort=CreatedDate:desc&pagination[limit]=5`;
const FETCH_URL_EVENTS = `/api/articles?filters[articles_category][slug][$eq]=events&fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&fields[4]=short_description&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name`;
const FETCH_URL_NEWS = `/api/articles?filters[articles_category][slug][$eq]=news&fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&fields[4]=short_description&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name`;

export default function MainContentBlogLanding() {
    // Fetch team members data from the API
    const { data: dataRelatedArticles, error, isLoading } = useSWR<MembersResponse>(`${NEXT_URL_BACKOFFICE}${FETCH_URL}`, fetcher)
    const { data: dataEvents, error: errorEvents, isLoading: isLoadingEvents } = useSWR<MembersResponse>(`${NEXT_URL_BACKOFFICE}${FETCH_URL_EVENTS}`, fetcher)
    const { data: dataNews, error: errorNews, isLoading: isLoadingNews } = useSWR<MembersResponse>(`${NEXT_URL_BACKOFFICE}${FETCH_URL_NEWS}`, fetcher)


    // Show loading state while data is being fetched
    if (isLoading || isLoadingNews || isLoadingEvents) return (
        <div>
            <div className={'h-[650px] p-60 text-center'}>
                <h1>Loading...</h1>
            </div>
        </div>
    )


    if (error) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div> // Show error message if API request failed
    if (errorEvents) return <div>Error: {errorEvents instanceof Error ? errorEvents.message : 'An error occurred'}</div> // Show error message if API request failed
    if (errorNews) return <div>Error: {errorNews instanceof Error ? errorNews.message : 'An error occurred'}</div> // Show error message if API request failed
    if(!dataRelatedArticles) return null; // Return null if no data is available



    return(
        <>
            <main>
                {/* Latest entries*/}
                <div>
                    <RelatedArticles
                        articleList={dataRelatedArticles.data}

                        customTitle={'Last Entries'}
                        amount={5}
                        cardSize={'lg'} />
                </div>

                {/* Events*/}
                {(dataEvents && dataEvents.data.length > 0) && (
                <div>
                    <RelatedArticles
                        articleList={dataEvents.data}
                        customTitle={'Events'}
                        bgMode={'dark'}
                        amount={2}
                        cardSize={'lg'}  />
                </div>
                )}
                {/* Press releas*/}
                {(dataNews && dataNews.data.length > 0) && (
                <div>

                    <RelatedArticles
                        articleList={dataNews.data}
                        customTitle={'News'}
                        bgMode={'light'}
                        amount={3}
                        cardSize={'sm'}/>
                </div>
                )}

                {/* Employee spotlight */}
                <div>
                    {/*//todo: buid this section with neutral cards */}
                </div>

            </main>
        </>
    )
}