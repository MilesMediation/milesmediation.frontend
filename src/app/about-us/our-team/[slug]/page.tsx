
import MainNavigation from "@/components/global/MainNavigation";
/*import PageHeader from "@/components/global/PageHeader";*/
import Footer from "@/components/global/Footer";

import {customPageData} from "@/lib/api";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import type { Member } from "@/types/api";


interface ApiResponse {
    data: Member[];
    metadata?: Record<string, unknown>;
    errors?: Record<string, unknown>;
}

export default async function Page({params}: {params: Promise<{ slug: string }>}){
    const slug_data = await params;
    let OurTeamData: ApiResponse | null = null;



    try {
        // Fetch data on the server
        const response = await customPageData(`/members?filters[slug][$eq]=${slug_data.slug}&populate[avatar][populate]=*&populate[member_category][fields][0]=title`);
        OurTeamData = response as ApiResponse;

    } catch (error) {
        console.error("❌ Failed to fetch member data:", error);
        // Create fallback data structure
        OurTeamData = {
            data: [],
            metadata: {},
            errors: {
                page_header: error,
                metadata: undefined
            }
        };
    }

    let memberData: Member | null = null;
    if(OurTeamData && Array.isArray(OurTeamData.data) && OurTeamData.data.length > 0){
        memberData = OurTeamData.data[0];
    }


    if(!memberData) return null;

    // /api/members?filters[slug][$eq]={{slug-member}}&populate[avatar][populate]=*&populate[member_category][fields][0]=title
    return(
        <>
            <MainNavigation />
            {/*<PageHeader
                classname={'h-[300px]'}
            />*/}

            <main className="container mx-auto mt-10 pb-40 min-h-[calc(100vh-160px)] relative">
                <div className={'grid grid-cols-8 gap-10'}>
                    <div className="col-span-3 relative">
                        {memberData.avatar?.url && (
                            <img
                                className={'w-full sticky top-[140px]'}
                                src={NEXT_URL_BACKOFFICE + memberData.avatar.url} 
                                alt={memberData.name || 'Member'}
                            />
                        )}
                    </div>
                    <div className="col-span-5">
                        <h1 className={'text-5xl font-medium main-text-color mb-5'}>{memberData.name}</h1>
                        {memberData.bio && memberData.bio.length > 0 && (
                            <BlocksRenderer 
                                // @ts-expect-error BlocksRenderer expects specific block format from Strapi
                                content={memberData.bio}
                            />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}