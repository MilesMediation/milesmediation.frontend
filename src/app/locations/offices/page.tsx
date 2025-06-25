import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import {FeaturedSection} from "@/components/sections/FeaturedSection";
import {FeaturedCardsSection} from "@/components/sections/FeaturedCardsSection";
import RelatedArticles from "@/components/sections/RelatedArticles";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";

export interface officesData {
    name: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    url: string;
    image: string;
}

const testDataOffice: officesData[] = [
    {
        size: 'lg',
        image: '/cardImgSample1.png',
        url: '/',
        name:'Office 1'
    },
    {
        size: 'lg',
        image: '/cardImgSample1.png',
        url: '/',
        name:'Office 1'
    }
]


export default function Page() {
    return (
        <>
            <div>
                <MainNavigation/>
                <PageHeader title={'Locations'}
                            description={'Our diverse legal expertise, consistently high-touch administrative support, ' +
                                'and dedication to our clients and neutrals can be summed up in the following words: ' +
                                'the Miles Mediation experience is “Miles Above the Rest.”'}
                />


                <FeaturedCardsSection cityName={'Georgia'} offices={testDataOffice}/>
 n
                <div>
                    <RelatedArticles />
                </div>
                <div>
                    <CallToAction />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}