import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import RelatedArticles from "@/components/sections/RelatedArticles";


export default async function Page({params}: {params: Promise<{ slug: string }>}){
    const slug_data = await params;

    return(
        <>
            <MainNavigation />
            <PageHeader
                title={ 'Blog & Events'}
                description={ ''}
                backgroundImage={''}
                classname={'h-[450px] md:h-[550px]'}
            />
            <main className="container mx-auto py-10">
                <h1>{slug_data.slug}</h1>
                
            </main>
            <RelatedArticles cardSize={'lg'} />
            <CallToAction />
            <Footer />
        </>
    )
}