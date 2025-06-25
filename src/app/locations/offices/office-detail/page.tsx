import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import GallerySection from "@/components/sections/GallerySection";
import NeutralSection from "@/components/sections/NeutralSection";

export interface officesData {
    name: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    url: string;
    image: string;
}





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



                <div>
                    <GallerySection />
                </div>
                <div>
                    <NeutralSection />
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