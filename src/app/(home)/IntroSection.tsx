'use client'


import MasonryGallery from "@/components/MansonryGallery";
import {fetcher} from "@/lib/utils";
import useSWR from "swr";
import type {StrapiResponse} from "@/types/api";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";



const FETCH_URL = `${NEXT_URL_BACKOFFICE}/api/page-home?populate[0]=Intro_section&populate[1]=Intro_section.image_gallery&populate[2]=Intro_section.image_gallery.image_col`


class MansoryGalleryTypes {
    Intro_section: {
        image_gallery: [];
    } | undefined
    image_gallery: [] | undefined;
}

export default function IntroSection() {

    // console.log("IntroSection URL", FETCH_URL);

    const { data, error, isLoading } = useSWR<StrapiResponse<MansoryGalleryTypes>>(FETCH_URL, fetcher)



    if(error) {
        console.error(error);
        return null;
    }
    if(isLoading) return <p>Loading...</p>
    if(!data) return null

    const intro_data = data.data.Intro_section
    // console.log('Fetch Data: ', intro_data)

    return (
        <section className="w-full bg-white pt-[100px] text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-title text-[40px] leading-[60px] font-medium uppercase text-[var(--Dark-Green_1,#003135)] tracking-[-0.44px] mb-6">
                    MILES MEDIATION <br />
                    & ARBITRATION
                </h2>

                <p className="font-body  text-[16px] leading-[24px] text-black font-normal tracking-[-0.176px] mb-10">
                    Our diverse legal expertise, consistently high-touch administrative support,
                    and dedication to our clients and neutrals can be summed up in the following
                    words: the Miles Mediation experience is “Miles Above the Rest.”
                </p>

                <button className="text-white font-semibold font-body text-[16px] rounded-[8px] px-6 py-[10px] bg-[var(--Dark-Green_1,#003135)] hover:opacity-90 transition">
                    Schedule a mediation
                </button>
            </div>

            {/* Image animation block */}
            {intro_data &&(
            <MasonryGallery gallery_prop={intro_data.image_gallery} />
            )}
        </section>
    )
}
