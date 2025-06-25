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

const testDataOffice2: officesData[] = [
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
    },
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
    },
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
                <FeaturedSection
                    mode={'light'}
                    /*imgBg={'/demo/locations/locationSampleImg.png'}*/
                    bgColor={'white'}
                    alignImg={'right'}
                    title={'Resolution Services, Wherever You Are'}
                    description={'Miles Mediation and Arbitration is the fastest growing mediation and arbitration firm in\n' +
                        '                            the Southeast. Miles is headquartered in Atlanta with additional offices in Savannah,\n' +
                        '                            Charlotte, Nashville, Jacksonville, Tampa and Columbia, SC.\n' +
                        '\n' +
                        '                            Miles is shaping the future of resolution with a comprehensive professional services\n' +
                        '                            model that combines the expertise of its highly skilled and diverse panel of ADR\n' +
                        '                            professionals (neutrals) with an unparalleled level of client support in order to guide\n' +
                        '                            and empower parties to fair, timely and cost-effective resolution regardless of case\n' +
                        '                            size, specialization or complexity.'}
                />

                <FeaturedCardsSection cityName={'Georgia'} offices={testDataOffice}/>
                <FeaturedCardsSection cityName={'Texas'} offices={testDataOffice2}/>
                <FeaturedCardsSection cityName={'Alabama'} offices={testDataOffice2}/>
                <FeaturedCardsSection cityName={'Tennessee'} offices={testDataOffice2}/>
                <FeaturedCardsSection cityName={'Alabama'} offices={testDataOffice2}/>
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