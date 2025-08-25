'use client'

import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import NeutralSection from "@/components/sections/NeutralSection";
import RelatedArticles from "@/components/sections/RelatedArticles";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { URL_BACKOFFICE_DOMAIN } from "@/lib/globalConstants";


const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())


export default function Page() {

    const params = useParams();

    const { slug } = params;

    const FETCH_URL = `/api/practice-areas?filters[slug][$eq]=${slug}&populate=*`;


    const { data, error, isLoading } = useSWR(`${URL_BACKOFFICE_DOMAIN}${FETCH_URL}`, fetcher)



    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if(!data) return null;

    const dataPage = data.data[0]
    console.log('Check Data',data.data[0])

        

    return (
        <>
            <MainNavigation />
            <PageHeader 
                backgroundImage={dataPage.featuredImage ? `${URL_BACKOFFICE_DOMAIN}${dataPage.featuredImage.url}` : ''}
                title={dataPage.Name ? dataPage.Name : 'Default title'} />
            <main>
                <div className="container mx-auto p-10">
                    <p>
                        {dataPage.description ? dataPage.description : 'Default description'}
                    </p>
                    <div>

                        <div className={'pt-10'}>
                            <NeutralSection
                                amount={8}
                                title={'Our Neutrals for this practices area'}
                                description={'Is active across the entire value chain of life sciences investments,\n' +
                                    '                            from seed to later-stage, with a focus on healthcare and sustainability'}
                            />
                        </div>
                        <div>
                            <RelatedArticles customTitle={'Last Entries'} amount={5} cardSize={'lg'} />
                        </div>
                        <div>
                            <RelatedArticles amount={3} cardSize={'lg'} />
                        </div>
                        <div>
                            <h3 className={'text-center font-bold main-text-color pb-60'}>
                                Awards &  Commendations
                            </h3>
                        </div>
                    </div>
                </div>
                <div>
                    <CallToAction />
                </div>
            </main>
            <Footer />
        </>
    )

}