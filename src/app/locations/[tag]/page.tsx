import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import {FeaturedCardsSection} from "@/components/sections/FeaturedCardsSection";
import RelatedArticles from "@/components/sections/RelatedArticles";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import {fetchLocationsByTag} from "@/lib/api";
import {Member, PageOurTeamData, SeoData, StrapiResponse} from "@/types/api";

export interface OfficeData {
    name: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    url: string;
    image: string;
}

const testDataOffice: OfficeData[] = [
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

// TODO: Rename the name of the type an adjust the parent type as well
// Extended Member interface that includes metadata
interface MemberWithMetadata extends Member {
    metadata?: SeoData;
    articlesDescription?: string;
    officesDescription?: string;
    offices: {
        id: number;
        name: string;
        slug: string;
        gallery: { url: string }[];
    }[] | undefined;
}

export default async function Page({params}: {params: Promise<{ tag: string }>}){

    /** Data retrieved from URL parameters */
    const tag_data = await params;

    /** Initialiation of General Variable */
    let LocationOfficesData: StrapiResponse<PageOurTeamData> | null = null

    /** Initialiation of simplified versions of requested data*/
    let pageData: MemberWithMetadata | null = null; // General Information page data
    let officesNormalized: OfficeData[] = []; // List of offices


    /** Fetching Data */
    try {
        // Fetch data on the server
        LocationOfficesData = await fetchLocationsByTag(tag_data.tag);

    } catch (error) {
        console.error("❌ Failed to fetch member data:", error);
        // Create fallback data structure
    }

    /** Data validation */
    if(LocationOfficesData && Array.isArray(LocationOfficesData.data) && LocationOfficesData.data.length > 0){
        pageData = LocationOfficesData.data[0];
    }


    if(!pageData) {
        return (
                <>
                Data not found
                </>
        )
    }
    


    /** Checking if this page location  have related offices and normalize the  data */
    if(pageData.offices && pageData.offices.length > 0){
        console.log('Offices data found:', pageData.offices);

        officesNormalized = pageData.offices.map((office):
        { id?: number; name: string; image: string; gallery?: { url:string }[]; url: string; size: 'lg' | 'md'| 'sm' } => {
            return {
                size: 'lg' as const,
                image: office.gallery && office.gallery.length > 0 ? office.gallery[0].url : '/cardImgSample1.png',
                url: `/locations/${tag_data.tag}/${office.slug}`,
                name: office.name
            };
        });
    } else {
        console.log('No offices data found, using test data.');
        officesNormalized = testDataOffice;
    }
    
    console.log('Page Location data:', pageData);
    console.log('Normalized offices data:', officesNormalized);

    return (
        <>
            <div>
                <MainNavigation/>
                <PageHeader
                    title={`${pageData.name} - Offices`}
                    description={'Our diverse legal expertise, consistently high-touch administrative support, ' +
                                'and dedication to our clients and neutrals can be summed up in the following words: ' +
                                'the Miles Mediation experience is "Miles Above the Rest."'}
                    classname={'h-[450px] md:h-[550px]'}
                />

                <main>

                    {/* TODO: Custom Text here*/}

                    <FeaturedCardsSection
                        title={''}
                        offices={officesNormalized}
                        description={pageData.officesDescription}

                    />
                    <div>
                        <RelatedArticles
                            cardSize={'lg'}
                            exampleMode={true}
                            descriptionText={pageData.articlesDescription}
                        />
                    </div>
                </main>
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