import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import RelatedArticles from "@/components/sections/RelatedArticles";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";


export default function Blog(){

    return(
        <>
            <MainNavigation/>
            <PageHeader title={'Blog & Events'}
                        description={'Our diverse legal expertise, consistently high-touch administrative support, ' +
                            'and dedication to our clients and neutrals can be summed up in the following words: ' +
                            'the Miles Mediation experience is “Miles Above the Rest.”'}
            />
            <main>
                {/* Latest entries*/}
                <div>
                    <RelatedArticles customTitle={'Last Entries'}  amount={5} cardSize={'lg'} />
                </div>

                {/* Events*/}
                <div>
                    <RelatedArticles customTitle={'Events'} bgMode={'dark'} amount={2} cardSize={'lg'}  />
                </div>

                {/* Press releas*/}
                <div>
                    <RelatedArticles customTitle={'Events'} bgMode={'light'} amount={3} cardSize={'sm'}/>
                </div>

                {/* Employee spotlight */}
                <div>
                    {/*//todo: buid this section with neutral cards */}
                </div>

                <div>
                    <CallToAction />
                </div>
                <div>
                    <Footer />
                </div>
            </main>
        </>
    )
}