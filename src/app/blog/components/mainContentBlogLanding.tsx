'use client'

import RelatedArticles from "@/components/sections/RelatedArticles";
import useSWR from "swr";
import type {MembersResponse} from "@/types/api";
import {NEXT_URL_BACKOFFICE, URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";

// Function to fetch data from the API
const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())


// API endpoint to get members with their categories
const FETCH_URL = `/api/articles?fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name&sort=CreatedDate:desc&pagination[limit]=5`;




export default function MainContentBlogLanding() {
    // Fetch team members data from the API
    const { data, error, isLoading } = useSWR<MembersResponse>(`${NEXT_URL_BACKOFFICE}${FETCH_URL}`, fetcher)

    // Get the members data from the API response

    // Show loading state while data is being fetched
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

    console.log('BLOGG List SWR: ',data.data);

    return(
        <>
            <main>
                {/* Latest entries*/}
                <div>
                    <RelatedArticles
                        articleList={data.data}
                        customTitle={'Last Entries!'}
                        amount={5}
                        cardSize={'lg'} />
                </div>

                {/* Events*/}
                <div>
                    <RelatedArticles customTitle={'Events'} bgMode={'dark'} amount={2} cardSize={'lg'}  />
                </div>

                {/* Press releas*/}
                <div>
                    <RelatedArticles customTitle={'Events'} bgMode={'light'} amount={3} cardSize={'sm'}/>
                </div>

                {/* Employee spotlight */}
                <div>
                    {/*//todo: buid this section with neutral cards */}
                </div>

            </main>
        </>
    )
}