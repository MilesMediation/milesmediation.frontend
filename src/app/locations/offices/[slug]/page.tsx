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
    const FETCH_URL_SERVER = `/api/offices?filters[slug][$eq]=${slug}&populate=featuredImage&populate=gallery`;

    const { data: dataPage, error: errorPage, isLoading: isLoadingPage } = useSWR(`${URL_BACKOFFICE_DOMAIN}${FETCH_URL}`, fetcher)
    const { data: dataHeader, error: errorHeader, isLoading: isLoadingHeader } = useSWR(`${URL_BACKOFFICE_DOMAIN}${FETCH_URL_SERVER}`, fetcher)


    if (isLoadingPage || isLoadingHeader) return (
        <div>
            <MainNavigation></MainNavigation>
            <div className={'h-[650px] p-60 text-center'}>
                <h1>Loading...</h1>
            </div>
            <Footer></Footer>
        </div>
    )
    if (errorPage) return <div>Error: {errorPage.message}</div>
    if (errorHeader) return <div>Error: {errorHeader.message}</div>
    if(!dataPage || dataPage.data.length === 0) return null;
    if(!dataHeader || dataHeader.data.length === 0) return null;


    const pageData = dataPage.data[0]
    const headerData = dataHeader.data[0]



    return (
        <>
            <div>
                <MainNavigation/>
                <PageHeader
                    title={headerData.name}
                    description={headerData.Description}
                    backgroundImage={headerData.featuredImage ? `${headerData.featuredImage.url}` : ''}
                    classname={'h-[450px] md:h-[550px]'}
                />


                <main>
                    <div>
                        <GallerySection images={pageData.gallery} description={pageData.galleryDescription} />
                    </div>
                    <div>
                        <NeutralSection neutrals={pageData.neutrals} />
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