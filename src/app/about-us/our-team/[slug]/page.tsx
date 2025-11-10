
import MainNavigation from "@/components/global/MainNavigation";
/*import PageHeader from "@/components/global/PageHeader";*/
import Footer from "@/components/global/Footer";

import {customPageData} from "@/lib/api";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";
import {Member, SeoData, StrapiResponse} from "@/types/api";

import MemberBio from "./MemberBio";
import {Button} from "@/components/ui/button";
import {FaEnvelope, FaLinkedin, FaQuoteLeft, FaQuoteRight} from "react-icons/fa6";
import {FaInstagram} from "react-icons/fa6";
import ArticlesNeutral from "@/app/our-panel/neutral/components/ArticlesNeutral";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import CallToAction from "@/components/global/CallToAction";
import {Metadata} from "next";
import {defaulMetadataResponse} from "@/lib/utils";

dayjs.extend(advancedFormat);

// Extended Member interface that includes metadata
interface MemberWithMetadata extends Member {
    metadata?: SeoData;
}


export async function generateMetadata({params}: {params: Promise<{ slug: string }>}): Promise<Metadata> {
    const slug_data = await params;

    try {
        const metadata_response: StrapiResponse<MemberWithMetadata[]> = await customPageData(`/members?filters[slug][$eq]=${slug_data.slug}&populate[metadata][populate]=*`);

        return defaulMetadataResponse(metadata_response.data[0]?.metadata);

    } catch (error) {
        console.error("Error generating metadata:", error);
        return defaulMetadataResponse({
                id: 0,
                metaTitle:  "Miles Mediation - Miles Above the Rest",
                metaDescription: "Miles Above the Rest",
                keywords: "mediation, arbitration, ADR, dispute resolution, legal services",
                metaRobots: "index, follow",
                metaViewport: "width=device-width, initial-scale=1",
                canonicalURL:  "https://milesmediation.com",
                structuredData: {
                    context: "https://schema.org",
                }
            })
    }
}


export default async function Page({params}: {params: Promise<{ slug: string }>}){
    const slug_data = await params;
    let OurTeamData: StrapiResponse<MemberWithMetadata[]> | null = null;


    try {
        // Fetch data on the server
        const response = await customPageData<MemberWithMetadata[]>(`/members?filters[slug][$eq]=${slug_data.slug}&populate[avatar][populate]=*&populate[member_category][fields][0]=title&populate=posts`);
        OurTeamData = response;

    } catch (error) {
        console.error("❌ Failed to fetch member data:", error);
        // Create fallback data structure
        OurTeamData = {
            data: [],
            meta: undefined
        };
    }

    let memberData: MemberWithMetadata | null = null;
    if(OurTeamData && Array.isArray(OurTeamData.data) && OurTeamData.data.length > 0){
        memberData = OurTeamData.data[0];
    }


    if(!memberData) return null;
    console.log('Member Data:', memberData);

    return(
        <>
            <MainNavigation />


            <main className="container mx-auto mt-40 pb-20 min-h-[calc(100vh-160px)] relative">
                <div className={'grid grid-cols-8 gap-10'}>

                    <div className="col-span-4">
                        <h1 className={'text-5xl font-medium main-text-color mb-2'}>{memberData.name}</h1>
                        <p className={'mb-10 font-medium uppercase text-teal-700'}>{memberData.description}</p>


                        {memberData.bio &&(
                        <div>
                            <MemberBio bio={memberData.bio} />
                        </div>
                        )}


                        {memberData.quote &&(
                            <div className='mt-10 py-10 border-y-1 border-[var(--color-dark-green)]/30'>
                                <h2 className={'text-3xl font-medium flex justify-center'}>
                                    <FaQuoteLeft /> &nbsp; {memberData.quote} &nbsp; <FaQuoteRight />
                                </h2>
                            </div>
                        )}

                        {/* Member - Related Articles section*/}
                        {memberData.posts && memberData.posts.length > 0 && (
                            <>
                                <div className={'mt-20'}>
                                    <h3 className={'text-4xl font-bold font-title main-text-color'}>Latest articles</h3>
                                    <div>

                                        {memberData.posts.map((post, index) => (
                                            <div key={index}>
                                                {/* TODO: Hover animation for each neutral card list*/}
                                                <ArticlesNeutral
                                                    title={post.title}

                                                    date={dayjs(post.CreatedDate ? post.CreatedDate : post.createdAt).format('ddd, MMM Do, YYYY')}
                                                    urlTarget={`/blog/articles/${post.slug}`}

                                                />
                                            </div>
                                    ))}

                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                    <div className="col-span-4 relative">

                        {memberData.avatar?.url && (
                            <div className="sticky top-[140px]">
                                <img
                                    className={'w-full '}
                                    src={NEXT_URL_BACKOFFICE + memberData.avatar.url}
                                    alt={memberData.name || 'Member'}
                                />
                                <div className={'mt-10 gap-4 flex'}>
                                    <Button variant={'outlined'} className={''}>
                                        <FaLinkedin />
                                        Linkedin
                                    </Button>
                                    <Button variant={'outlined'} className={''}>
                                        <FaInstagram />
                                        instagram
                                    </Button>
                                    <Button variant={'outlined'} className={''}>
                                        <FaEnvelope />
                                        Email
                                    </Button>
                                </div>


                            </div>



                        )}
                    </div>
                </div>


            </main>
            <div>
                <CallToAction />
            </div>
            <Footer />
        </>
    )
}