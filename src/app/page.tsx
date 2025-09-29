import HeroSection from "@/app/(home)/HeroSection";
import MainNavigation from "@/components/global/MainNavigation";
import IntroSection from "@/app/(home)/IntroSection";
import ServicesSection from "@/app/(home)/ServicesSection";
import OfficesSection from "@/app/(home)/OfficeSection";
import DashboardSection from "@/app/(home)/DashboardSection";
import OurVideos from "@/app/(home)/OurVideos";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import {fetchHomePageData} from "@/lib/api";
import {Metadata} from "next";

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
    let homeData;

    try {
        // Fetch data on the server
        homeData = await fetchHomePageData();

    } catch (error) {
        console.error("❌ Failed to fetch home page data:", error);
        // Create fallback data structure
        homeData = {
            pageHome: null,
            articles: null,
            offices: null,
            errors: {
                pageHome: error,
                articles: null,
                offices: null
            }
        };
    }

    return (
        <div className="bg-white text-gray-800 space-y-12 relative">
            <MainNavigation/>
            <HeroSection
                heroData={homeData.pageHome?.data?.Hero}
            />
            <IntroSection/>
            <ServicesSection/>
            <OfficesSection
                officesData={homeData.offices?.data}
            />
            <DashboardSection
                title="Dashboard"
                description="Miles' neutrals are experienced mediators and arbitrators with expertise in their fields. They are experts in dispute resolution who are helping to shape the future of the ADR field with thought leadership that includes articles, speaking engagements, and CLE classes and training. Learn more about their background and experience here."
                image="/cardImgSample1.png"
                imagePosition="left"
                buttonLabel="Sign up"
                buttonUrl="/signup"
            />

            <DashboardSection
                title="Our Panel"
                description="Meet our larger panel of neutrals and arbitrators"
                image="/cardImgSample1.png"
                imagePosition="right"
                buttonLabel="Schedule a mediation"
                buttonUrl="/schedule"
                backgroundImage="/cardImgSample1.png"
                dark
            />
            <OurVideos/>
            <CallToAction/>
            <Footer/>
        </div>
    );
}
