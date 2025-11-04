import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import { FeaturedCardsSection } from "@/components/sections/FeaturedCardsSection";
import FeaturedNeutralSection from "@/components/sections/FeaturedNeutralSection";
import RelatedArticles from "@/components/sections/RelatedArticles";

interface officesData {
    name: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    url: string;
    image: string;
}

const mockData: officesData[] = [
    {
        name: "ADR on demand",
        size: "xl",
        url: "/our-panel/adr-on-demand",
        image: "",
    },
    {
        name: "Arbitration",
        size: "xl",
        url: "/our-panel/arbitration",
        image: "",
    },
];

export default function Page() {
    return (
        <>
            <MainNavigation />
            <PageHeader
                title="Mediation"
                classname={'h-[450px] md:h-[550px]'}
            />
            <main className="mb-10">
                <FeaturedNeutralSection
                    title_1st_line="Our"
                    title_2nd_line="Panel"
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam eligendi ab vel esse, minima numquam natus, iusto deserunt fuga eos velit fugiat maxime fugit quidem et illo saepe dolorum. Consectetur."
                    buttonLabel="See more neutrals"
                />
                <RelatedArticles cardSize="md" amount={5} />
                <FeaturedCardsSection title="Another services" offices={mockData} />
            </main>
            <CallToAction />
            <Footer />
        </>
    );
}
