'use client'

import useSWR from "swr";
import {NEXT_URL_BACKOFFICE, URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import PracticeAreaCard from "@/components/cards/PracticeAreaCard";
import RelatedArticles from "@/components/sections/RelatedArticles";
import { StrapiResponse } from "@/types/api";

interface PostData {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    articleImage?: {
        url: string;
    };
    [key: string]: unknown;
}

interface PracticeAreaData {
    id: number;
    Name: string;
    description: string;
    slug: string;
    featuredImage?: {
        url: string;
    };
    posts: PostData[];
}

const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())


export default function MainContentPracticeAreaLanding() {

    const FETCH_URL_content = `/api/practice-areas?populate[posts][populate][0]=articleImage`;
    const FETCH_URL_videos = `/api/articles?filters[articles_category][slug][$eq]=videos&fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&fields[4]=short_description&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name`;


    const { data: dataContent, error: errorContent, isLoading: isLoadingContent } = useSWR<StrapiResponse<PracticeAreaData[]>>(`${NEXT_URL_BACKOFFICE}${FETCH_URL_content}`, fetcher)
    const { data: dataVideo, error: errorVideo, isLoading: isLoadingVideo } = useSWR<StrapiResponse<PostData[]>>(`${NEXT_URL_BACKOFFICE}${FETCH_URL_videos}`, fetcher)


    if (isLoadingContent || isLoadingVideo) return (
        <div>
            <div className={'h-[650px] p-60 text-center'}>
                <h1>Loading...</h1>
            </div>
        </div>
    )
    if (errorContent || errorVideo) return <div>Error: {(errorContent || errorVideo)?.message}</div>
    if(!dataContent) return null;

    const dataPage = dataContent.data
    

    // console.log('Check Data Practice Areas video',dataVideo.data)

    const all_post: PostData[] = dataContent.data.map((item: PracticeAreaData) => item.posts)
        .flat().sort((a: PostData, b: PostData) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // console.log('ALL_POST: ', all_post)

    return(
        <>

            <div className="container mx-auto pb-10 ">
                <h2 className={'font-bold text-5xl main-text-color mb-5 uppercase'}>
                    Our practice Areas
                </h2>
                <div className={'grid grid-flow-row-dense grid-cols-3 gap-4 '}>
                    {dataPage.map((item: PracticeAreaData, index: number) => {
                        return (
                            <div key={index} className={''}    >
                                <PracticeAreaCard
                                    key={index}
                                    title={item.Name}
                                    slug={item.slug}
                                    bgImage={item.featuredImage ? URL_BACKOFFICE_DOMAIN + item.featuredImage.url :''}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className={'mt-10'}>
                    <RelatedArticles
                        articleList={all_post}
                        cardSize={'lg'}  />
                </div>
                {isLoadingVideo &&(
                    <div>
                        Loading...
                    </div>
                )}
                {!isLoadingVideo && (
                    <div>
                        <RelatedArticles
                            customTitle={'Related Videos'}
                            cardSize={'lg'}
                            exampleMode={false}
                            articleList={(dataVideo && dataVideo?.data.length >0) ? dataVideo.data : []}
                        />
                    </div>
                )}

            </div>
        </>
    )
}