import HeroSection from "@/app/(home)/HeroSection";
import MainNavigation from "@/components/global/MainNavigation";
import IntroSection from "@/app/(home)/IntroSection";
import ServicesSection from "@/app/(home)/ServicesSection";
import OfficesSection from "@/app/(home)/OfficeSection";
/*import DashboardSection from "@/app/(home)/DashboardSection";
import OurVideos from "@/app/(home)/OurVideos";*/
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import {fetchHomePageData, type HomePageDataResult} from "@/lib/api";
import {Metadata} from "next";
import BentoSection from "@/app/(home)/bentoSecton";
import CustomRelatedArticles from "@/components/sections/customRelatedArticles";
import type {FeaturedSectionData, ServicesSectionContent} from "@/types/api";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
    try {
        const data = await fetchHomePageData();

        if (data.pageHome?.data) {
            const pageData = data.pageHome.data;
            const seo = pageData.seo;

            return {
                title: seo?.metaTitle || pageData.Hero?.main_title || "Miles Mediation - Miles Above the Rest",
                description: seo?.metaDescription || pageData.Hero?.description || "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.",
                keywords: seo?.keywords || "mediation, arbitration, ADR, dispute resolution, legal services",
                robots: seo?.metaRobots || "index, follow",
                viewport: seo?.metaViewport || "width=device-width, initial-scale=1",
                openGraph: {
                    title: seo?.metaTitle || pageData.Hero?.main_title || "Miles Mediation",
                    description: seo?.metaDescription || pageData.Hero?.description,
                    type: "website",
                    locale: "en_US",
                },
                twitter: {
                    card: "summary_large_image",
                    title: seo?.metaTitle || pageData.Hero?.main_title || "Miles Mediation",
                    description: seo?.metaDescription || pageData.Hero?.description,
                },
                alternates: {
                    canonical: seo?.canonicalURL || "https://milesmediation.com",
                },
            };
        }
    } catch (error) {
        console.error("Error generating metadata:", error);
    }

    // Fallback metadata
    return {
        title: "Miles Mediation - Miles Above the Rest",
        description: "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.",
        keywords: "mediation, arbitration, ADR, dispute resolution, legal services",
        robots: "index, follow",
        viewport: "width=device-width, initial-scale=1",
    };
}

export default async function Home() {
    let homeData: HomePageDataResult;

    try {
        // Fetch data on the server
        homeData = await fetchHomePageData();

    } catch (error) {
        console.error("❌ Failed to fetch home page data HOME DATA:", error);
        // Create fallback data structure
        homeData = {
            pageHome: null,
            articles: null,
            offices: null,
            services: null,
            featured: null,
            errors: {
                pageHome: error,
                articles: null,
                offices: null,
                services: null,
                featured: null,
            }
        };
    }

    console.log('CHECK HOME DATA: ',homeData);

    const servicesSection: ServicesSectionContent | undefined = homeData.services?.data?.services_section;
    const featuredSection: FeaturedSectionData | null = homeData.featured?.data?.featured_section ?? null;
    const emptyServicesSection: ServicesSectionContent = {
        title: "",
        is_available: false,
        services_list: []
    };

    return (
        <div className="bg-white text-gray-800 space-y-12 relative">
            <MainNavigation/>
            <HeroSection
                heroData={homeData.pageHome?.data?.Hero}
            />
            <IntroSection/>
            <ServicesSection servicesData={servicesSection ?? emptyServicesSection} />
            <OfficesSection
                officesData={homeData.offices?.data}
            />
            <BentoSection dataSection={featuredSection}/>
            <CustomRelatedArticles
                title={'Latest articles From the Miles'
                }
            />
            <CallToAction/>
            <Footer/>
        </div>
    );
}
