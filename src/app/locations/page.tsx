// src/app/locations/page.tsx  (SERVER)
import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { fetchPageLocation } from "@/lib/api";
import MainContent from "./components/MainContent";
import Footer from "@/components/global/Footer";

export default async function Page() {
    let pageLocationData: any = null;

    try {
        pageLocationData = await fetchPageLocation();
    } catch (error) {
        console.error("❌ Failed to fetch locations page data:", error);
        console.log("📍 Locations page data fetched:", {
            pageLocation: null,
            errors: {
                pageLocation: error instanceof Error ? error.message : "Unknown error",
            },
        });
    }


    const pageHeaderTitle =
        pageLocationData?.data?.pageHeader?.title || "Locations";
    const pageHeaderDescription =
        pageLocationData?.data?.pageHeader?.description ||
        'Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is "Miles Above the Rest."';
    const pageHeaderBackground =
        pageLocationData?.data?.pageHeader?.backgroundImage?.url || "/cardImgSample1.png";

    // Si traes JSON-LD desde el CMS, inyéctalo aquí con <script type="application/ld+json">...
    const structuredDataRaw = pageLocationData?.data?.seo?.structuredData;
    let structuredDataObj: Record<string, any> | null = null;
    if (structuredDataRaw) {
        try {
            structuredDataObj =
                typeof structuredDataRaw === "string"
                    ? JSON.parse(structuredDataRaw)
                    : structuredDataRaw;
        } catch (e) {
            console.warn("[Locations] structuredData JSON inválido:", e);
        }
    }

    return (
        <>
            {structuredDataObj ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataObj) }}
                />
            ) : null}

            <div>
                <MainNavigation />

                <PageHeader
                    title={pageHeaderTitle}
                    description={pageHeaderDescription}
                    backgroundImage={pageHeaderBackground}
                    classname={'h-[450px] md:h-[550px]'}
                />

                <FeaturedSection
                    mode="light"
                    bgColor="white"
                    alignImg="right"
                    title="Resolution Services, Wherever You Are"
                    description={
                        "Miles Mediation and Arbitration is the fastest growing mediation and arbitration firm in the Southeast. " +
                        "Miles is headquartered in Atlanta with additional offices in Savannah, Charlotte, Nashville, Jacksonville, Tampa and Columbia, SC. " +
                        "Miles is shaping the future of resolution with a comprehensive professional services model that combines the expertise of its highly skilled and diverse panel of ADR " +
                        "professionals (neutrals) with an unparalleled level of client support in order to guide and empower parties to fair, timely and cost-effective resolution regardless of case size, specialization or complexity."
                    }
                    featuredImage={pageLocationData?.data?.featured_block?.featured_media}

                />

                <MainContent />

                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
