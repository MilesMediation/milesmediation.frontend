'use client'

import NeutralSection from "@/components/sections/NeutralSection";
import RelatedArticles from "@/components/sections/RelatedArticles";
import useSWR from "swr";
import {URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import {FaStar} from "react-icons/fa6";
import {Skeleton} from "@/components/ui/skeleton";
import { StrapiResponse } from "@/types/api";

interface AwardData {
    id: number;
    title: string;
    description: string;
    featured_image?: {
        url: string;
    };
}

interface NeutralData {
    id: number;
    name: string;
    slug: string;
    url: string;
    avatar: {
        url: string;
    };
    [key: string]: unknown;
}

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

interface PracticeAreaDetailData {
    id: number;
    Name: string;
    description: string;
    slug: string;
    neutrals?: NeutralData[];
    posts?: PostData[];
    awards?: AwardData[];
    [key: string]: unknown;
}

const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())

export default function MainContentOurTeam({ slug }: { slug: string }) {
    const FETCH_URL = `/api/practice-areas?filters[slug][$eq]=${slug}&populate[posts][populate][0]=articleImage&populate[neutrals][populate][0]=avatar&populate[awards][populate][0]=featured_image`;
    // const FETCH_URL = `/api/articles?fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name&sort=CreatedDate:desc&pagination[limit]=5`;

    const { data, error, isLoading } = useSWR<StrapiResponse<PracticeAreaDetailData[]>>(`${URL_BACKOFFICE_DOMAIN}${FETCH_URL}`, fetcher)



    // While loading state is true
    if (isLoading)
        return (
        <>
            <div className="container mx-auto py-10">

                <div className="space-y-3 pb-10">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[250px] bg-gray-200" />
                </div>
                <div>
                    <h2 className={'text-5xl uppercase font-bold main-text-color mb-5'}>
                        Our Neutrals for this practices Area
                    </h2>
                    <div className={' space-y-2 my-5'}>
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-[250px] bg-gray-200" />
                    </div>
                    <div className={'flex gap-4 mb-5'}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="mb-5 w-1/4 h-[440px] border border-gray-200 rounded-md p-4 flex flex-col justify-end">
                                {/*<Skeleton  className="h-[125px] w-full rounded-xl " />*/}
                                <div className="space-y-2 mt-5">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </>

    )
    if (error) return <div>Error: {error?.message}</div>
    if(!data || !data.data || data.data.length === 0) return null;

    const dataPage: PracticeAreaDetailData = data.data[0]
    console.log('Check Data',data.data[0])

    return(
        <main>
            <div className="container mx-auto py-10">
                <p>
                    {dataPage.description ? dataPage.description : 'Default description'}
                </p>


                <div id={'neutralSection'} className={'pt-10'}>
                    <NeutralSection
                        title={'Our Neutrals for this practices area'}
                        description={'Our neutrals that works within this practice area'}
                        neutrals={dataPage.neutrals && dataPage.neutrals.length > 0 ? dataPage.neutrals : [] }
                    />
                </div>
                {(dataPage.posts && dataPage.posts.length > 0) && (
                <div id={'relatedArticlleSection'}>
                    <RelatedArticles
                        customTitle={'Last Entries'}
                        amount={5}
                        cardSize={'lg'}
                        exampleMode={false}
                        articleList={dataPage.posts && dataPage.posts.length > 0 ? dataPage.posts : [] }
                    />
                </div>
                )}
                {/*<div>
                    <RelatedArticles
                        amount={3}
                        cardSize={'lg'}
                    />
                </div>*/}
                {(dataPage.awards && dataPage.awards.length > 0) &&(
                <div id={'awardsSection'} className={'pb-60'}>
                    {/* <h2 className={`text-5xl uppercase font-bold ${bgMode === 'dark' ? 'text-white' : 'main-text-color'} `}>*/}
                    <h2 className={'text-5xl text-center uppercase font-bold main-text-color py-10'}>
                        Awards &  Commendations
                    </h2>
                    <div className={'flex justify-around'}>
                        {(dataPage.awards && dataPage.awards.length > 0) && (
                            dataPage.awards.map((award: AwardData, index: number) => (

                                <div key={index} className={'text-center'}>
                                    <div className={'flex justify-center text-yellow-400'} >
                                        <FaStar className={''}  size={'100px'} />
                                    </div>
                                    <h3 className={'font-medium text-2xl'}>{award.title}</h3>
                                    <p>
                                        {award.description}
                                    </p>
                                </div>

                            ))
                        )}
                    </div>
                </div>
                )}

            </div>
        </main>
    )

}