'use client'

import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import GallerySection from "@/components/sections/GallerySection";
import NeutralSection from "@/components/sections/NeutralSection";
import {useParams} from "next/navigation";
import useSWR from "swr";
import {URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";

export interface officesData {
    name: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    url: string;
    image: string;
}


const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())


export default function Page() {

    const params = useParams();

    const { slug } = params;

    const FETCH_URL = `/api/offices?filters[slug][$eq]=${slug}&populate[neutrals][populate]=avatar&populate=gallery`;

    const { data, error, isLoading } = useSWR(`${URL_BACKOFFICE_DOMAIN}${FETCH_URL}`, fetcher)


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if(!data && data.data.length >0) return null;


    const dataPage = data.data[0]


    console.log('Check Fecth', dataPage)

    return (
        <>
            <div>
                <MainNavigation/>
                <PageHeader title={dataPage.name} description={dataPage.Description}/>


                <main>
                    <div>
                        <GallerySection images={dataPage.gallery} description={dataPage.galleryDescription} />
                    </div>
                    <div>
                        <NeutralSection neutrals={dataPage.neutrals} />
                    </div>
                    <div>
                        <CallToAction />
                    </div>
                </main>
                <div>

                    <Footer />
                </div>
            </div>
        </>
    )
}