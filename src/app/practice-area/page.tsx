'use client'

import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import PracticeAreaCard from "@/components/cards/PracticeAreaCard";
import RelatedArticles from "@/components/sections/RelatedArticles";
import Footer from "@/components/global/Footer";
import CallToAction from "@/components/global/CallToAction";

import { URL_BACKOFFICE_DOMAIN } from "@/lib/globalConstants";
import useSWR from "swr";

const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())

// Page with the List of Practice Areas
export default function Page() {


    




    const FETCH_URL = `/api/practice-areas?populate=*`;


    const { data, error, isLoading } = useSWR(`${URL_BACKOFFICE_DOMAIN}${FETCH_URL}`, fetcher)



    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if(!data) return null;

    const dataPage = data.data
    console.log('Check Data',dataPage)

    return (
        <>
            <MainNavigation/>
            <PageHeader title={'Practice Areas'}/>

            <main>
                <div className="container mx-auto py-10">

                    <p>
                        For more than two decades, Miles Mediation & Arbitration has been shaping the alternative dispute
                        resolution (ADR) industry with our comprehensive professional services model that combines the
                        expertise of our highly skilled, diverse panel of neutrals with an unparalleled level of client
                        support to guide and empower parties to fair, timely, and cost-effective resolution regardless of
                        case size, specialization, or complexity.
                        <br/>
                        Our experienced neutrals and exceptional administrative support team let you focus on getting cases
                        resolved. From the way you are greeted when you arrive at a Miles office to the comfortable,
                        welcoming environment to the high-tech offices and delicious meals and snacks, our focus is on
                        providing an environment that lets you focus on getting cases resolved.
                    </p>
                </div>
                <div className="container mx-auto pb-10 ">
                    <h2 className={'mb-5'}>
                        Our practice Areas
                    </h2>
                    <div className={'flex flex-row flex-wrap gap-4'}>
                        {dataPage.map((item:{Name:string, description:string, slug:string,featuredImage:{url:string}}, index:number) => {
                            return (
                                <div key={index}>
                                    <PracticeAreaCard 
                                        key={index} 
                                        title={item.Name} 
                                        description={item.description}
                                        slug={item.slug}
                                        bgImage={item.featuredImage ? URL_BACKOFFICE_DOMAIN + item.featuredImage.url :''}
                                     />
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <RelatedArticles cardSize={'lg'} />
                    </div>
                    <div>
                        <RelatedArticles customTitle={'Related Videos'} cardSize={'lg'} />
                    </div>
                </div>
                <CallToAction />
            </main>
            <Footer />
        </>
    )
}