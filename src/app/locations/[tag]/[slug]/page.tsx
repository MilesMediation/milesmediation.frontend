
import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import MainContentOfficePage from "@/app/locations/[tag]/[slug]/components/MainContentOfficePage";
import {customPageData} from "@/lib/api";
import { OfficeData} from "@/types/api";

export default async function Page({params}: {params: Promise<{ slug: string; tag?:string }>}){

    const {slug}  = await params;

    let PageData: OfficeData | null = null;

    const FETCH_URL_SERVER = `/offices?filters[slug][$eq]=${slug}&populate[neutrals][populate]=avatar&populate=gallery&populate[featuredImage][populate]=*`;



    try{
        const response = await customPageData<OfficeData[]>(FETCH_URL_SERVER)

        PageData = (response?.data && Array.isArray(response.data) && response.data.length > 0) ? response.data[0] : null;
        console.log('Responde data', PageData)

    }catch (error) {
           console.log(error);
    }

    if(!PageData)return  null



    return (
        <>
            <div>
                <MainNavigation/>
                <PageHeader
                    title={PageData.name}
                    description={PageData.Description}
                    backgroundImage={PageData.featuredImage?.url || ''}
                    classname={'h-[450px] md:h-[550px]'}
                />


                <main>
                    <MainContentOfficePage />
                </main>
                <div>
                    <CallToAction />
                    <Footer />
                </div>
            </div>
        </>
    )
}