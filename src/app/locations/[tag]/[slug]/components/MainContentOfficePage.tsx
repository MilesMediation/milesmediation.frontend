'use client'

import {useParams} from "next/navigation";
import useSWR from "swr";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";
import GallerySection from "@/components/sections/GallerySection";
import NeutralSection from "@/components/sections/NeutralSection";



/** SWR Function for requesting data in cliente side component */
const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())


export default function MainContentOfficePage() {

    const params = useParams();

    const {slug} = params;

    // console.log('Location tag:', tag);
    // console.log('Office slug:', slug);

    const FETCH_URL = `/api/offices?filters[slug][$eq]=${slug}&populate[neutrals][populate]=avatar&populate=gallery&populate[manager_avatar][populate]=*`;
    // const FETCH_URL_SERVER = `/api/offices?filters[slug][$eq]=${slug}&populate=featuredImage&populate=gallery`;

    const {
        data: dataPage,
        error: errorPage,
        isLoading: isLoadingPage
    } = useSWR(`${NEXT_URL_BACKOFFICE}${FETCH_URL}`, fetcher)


    if (isLoadingPage) return (
        <div>
            <div className={'h-[650px] p-60 text-center'}>
                <h1>Loading...</h1>
            </div>

        </div>
    )
    if (errorPage) return <div>Error: {errorPage.message}</div>
    if (!dataPage || dataPage.data.length === 0) return null;

    const pageData = dataPage.data[0]

    console.log('pageData', pageData)

    return(
        <>
            <div className={'container w-full mx-auto grid grid-cols-4 gap-4 mt-10'}>
                <div className={'col-span-3'}>
                    <div id={'officeGallery'}>
                        <GallerySection
                            title={'Our office!'}
                            images={pageData.gallery}
                            description={pageData.galleryDescription}
                        />
                    </div>
                </div>

                <div className="">
                    <div className={'min-h-[200px]'}>
                        <h2 className={'font-bold text-4xl main-text-color mb-5 uppercase  '}>
                            Contact info
                        </h2>
                        <p className={''}>
                            115 Perimeter Center Place Suite 1100 Atlanta, GA 30346 <br/>
                            <strong>P:</strong> (470) 893-1175 <br/>
                            <strong>E:</strong> support@milesadr.com <br/>
                        </p>
                    </div>
                    {pageData.manager_name && (
                    <div className={'h-[400px] rounded-md'}>
                        <img className={'w-full h-full object-cover rounded-lg'} src={NEXT_URL_BACKOFFICE+pageData.manager_avatar.url}/>
                        <p className={'mb-0 mt-2 font-bold'}>
                            {pageData.manager_name}, Office manager.
                        </p>
                        <p>
                            <a href={`mailto:${pageData.manager_mail}`}>{pageData.manager_mail}</a>
                        </p>
                    </div>
                    )}
                </div>
            </div>
            <div className={'mt-20'}>
                <NeutralSection
                    neutrals={pageData.neutrals}
                />
            </div>

        </>
    )
};