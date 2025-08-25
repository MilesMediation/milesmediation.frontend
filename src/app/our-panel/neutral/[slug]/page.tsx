'use client'

import MainNavigation from "@/components/global/MainNavigation";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import ButtonMiles from "@/components/ui/custom/ButtonMiles";
import ArticlesNeutral from "@/app/our-panel/neutral/components/ArticlesNeutral";
import CalendarNeutral from "@/app/our-panel/neutral/components/CalendarNeutral";
import RatesSectionNeutral from "@/app/our-panel/neutral/components/RatesSectionNeutral";
import AccordionItem from "@/components/ui/AccordionItems";
import { useParams } from 'next/navigation';

// Updated imports for Azure API
import {AZURE_API_URL, AUTH_TOKEN, URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import useSWR from "swr";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";

import {ReactNode} from "react";

// Legacy Strapi neutrals data (commented for future reference)
// const neutrals = [
//     {name: 'Sally Ankins', image: '/neutrals/sally.png', url: '/offices/atlanta'},
//     {name: 'Leah Albert', image: '/neutrals/leah.png', url: '/offices/boston'},
//     {name: 'William Atkins', image: '/neutrals/william.png', url: '/offices/birmingham'},
//     {name: 'John Austin', image: '/neutrals/john.png', url: '/offices/chicago'},
//     {name: 'Ron Bankston', image: '/neutrals/ron.png', url: '/offices/chicago'},
//     {name: 'Marc Barré', image: '/neutrals/marc.png', url: '/offices/chicago'},
//     {name: 'Todd Bechtel', image: '/neutrals/todd.png', url: '/offices/chicago'},
//     {name: 'Audrey Berland', image: '/neutrals/audrey.png', url: '/offices/chicago'},
// ]

// Fetcher for Strapi API
const strapiFetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())

// Fetcher for Azure API with authentication
const azureFetcher = (url: string | URL | Request) =>
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/json',
        },
    }).then((r) => r.json())

type ListBlockProps = {
    children: ReactNode;
    format: 'unordered' | 'ordered';
};

type ListItemBlockProps = {
    children: ReactNode;
};

const customBlockRenderers = {
    list: ({ children, format }: ListBlockProps) => {
        const className =
            format === 'unordered'
                ? 'list-disc pl-6 text-gray-700'
                : 'list-decimal pl-6 text-blue-700';

        return <ul className={className}>{children}</ul>;
    },
    listItem: ({ children }: ListItemBlockProps) => {
        return <li className="mb-2">{children}</li>;
    },
};


/* Neutral Detail Page */
export default function Page() {

    const params = useParams();
    const { slug } = params;

    // First: Load neutral data from Strapi
    const STRAPI_FETCH_URL = `/api/neutrals?filters[slug][$eq]=${slug}&populate=*`;
    const { data: strapiData, error: strapiError, isLoading: strapiLoading } = useSWR(
        `${URL_BACKOFFICE_DOMAIN}${STRAPI_FETCH_URL}`, 
        strapiFetcher
    );

    // Second: Load calendar data from Azure (only after Strapi data is loaded)
    const AZURE_FETCH_URL = `${AZURE_API_URL}/neutrals/list?neutral_id=${slug}`;
    const { data: azureData, error: azureError, isLoading: azureLoading } = useSWR(
        strapiData ? AZURE_FETCH_URL : null, // Only fetch Azure data if Strapi data is available
        azureFetcher
    );

    // Show loading state while Strapi data is loading
    if (strapiLoading) {
        return (
            <div className="bg-white text-gray-800">
                <MainNavigation />
                <div className="container mx-auto py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-dark-green)] mx-auto"></div>
                        <p className="mt-4 text-lg">Loading neutral information...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Show error state if Strapi data failed to load
    if (strapiError) {
        return (
            <div className="bg-white text-gray-800">
                <MainNavigation />
                <div className="container mx-auto py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Neutral</h1>
                        <p className="text-gray-600">{strapiError.message}</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Check if we have Strapi data
    if (!strapiData || !strapiData.data || strapiData.data.length === 0) {
        return (
            <div className="bg-white text-gray-800">
                <MainNavigation />
                <div className="container mx-auto py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-600 mb-4">Neutral Not Found</h1>
                        <p className="text-gray-500">No neutral found with slug: {slug}</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Get the neutral data from Strapi
    const dataNeutral = strapiData.data[0];
    console.log('Strapi Neutral Data:', dataNeutral);

    // Handle avatar URL from Strapi
    const avatarUrl = dataNeutral.avatar?.url
        ? `${URL_BACKOFFICE_DOMAIN}${dataNeutral.avatar.url}`
        : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";

    
    return (
        <div className="bg-white text-gray-800 space-y-12">
            <MainNavigation/>

            <section
                className="w-full py-[100px]  bg-cover bg-center relative mb-0">
                {/* Overlay */}


                {/* Content */}
                <div className="container mx-auto">

                    <div className="py-10 grid grid-cols-4 gap-10">
                        <div className='col-span-2 '>
                            <h2 className="font-title text-3xl md:text-4xl uppercase font-bold mb-8">
                                {dataNeutral.name || 'Neutral Name'}
                            </h2>
                            <div className={'columns-2 gap-8 text-justify gap'}>

                                {/* Biography*/}
                                {dataNeutral.bio ? (
                                    <BlocksRenderer
                                        content={dataNeutral.bio}
                                        // @ts-expect-error Just a type warning
                                        blocks={customBlockRenderers}
                                    />
                                ) : (
                                    <p className="font-body">
                                        Miles&apos; neutrals are experienced
                                        mediators and arbitrators with expertise in their fields. They are experts in
                                        dispute
                                        resolution who are helping to shape the future of the ADR field with thought
                                        leadership
                                        that includes articles, speaking engagements, and CLE classes and training. Learn
                                        more
                                        about their background and experience here.
                                    </p>
                                )}
                            </div>
                            {/* Button sections */}
                            <div className={'mt-8 gap-4 flex justify-start '}>
                                <ButtonMiles >
                                    Book
                                </ButtonMiles>
                                <ButtonMiles variant='outlined'>Costs</ButtonMiles>
                                <ButtonMiles variant='outlined'> See more</ButtonMiles>

                            </div>
                            {/* Personal Quote */}
                            {dataNeutral.shortQuote && (
                                <div className='mt-10 py-10 border-y-1 border-[var(--color-dark-green)]/30'>
                                    <h2 className={'text-3xl font-medium'}>
                                        {dataNeutral.shortQuote}
                                    </h2>
                                </div>
                            )}

                            {/* Practice area */}
                            {dataNeutral.practice_area && dataNeutral.practice_area.length > 0 &&(
                            <div className={'mt-10'}>
                                <h3 className={'text-2xl font-bold'}>Practice Areas</h3>
                                <ul className={'list-inside list-disc'}>
                                    {dataNeutral.practice_area.map((area: any, index: number) => (
                                        <li key={index}>{area.Name}</li>
                                    ))}
                                </ul>
                            </div>
                            )}

                            {/* Accordion section */}
                            <div className={'mt-10'}>

                                <div className="mx-auto">
                                    {dataNeutral.admittedToPractice &&(
                                    <AccordionItem
                                        title="Admitted to Practice"
                                        headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                                        bodyClassName="text-gray-700 "
                                    >
                                        <div>
                                            <BlocksRenderer
                                                content={dataNeutral.admittedToPractice}
                                                // @ts-expect-error Just a type warning
                                                blocks={customBlockRenderers}
                                            />
                                        </div>
                                    </AccordionItem>
                                    )}


                                    {dataNeutral.professionalToTradeAffiliations &&(
                                    <AccordionItem
                                        title="Professional to trade affiliations"
                                        headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                                        bodyClassName="text-gray-700  px-4 py-2"
                                    >
                                        <BlocksRenderer
                                            content={dataNeutral.professionalToTradeAffiliations}
                                            // @ts-expect-error Just a type warning
                                            blocks={customBlockRenderers}
                                        />

                                    </AccordionItem>
                                    )}


                                    {dataNeutral.honorsAndAwards &&(
                                    <AccordionItem
                                        title="Honors and Awards"
                                        headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                                        bodyClassName="text-gray-700 text-normal px-2 py-4"
                                    >
                                        <BlocksRenderer
                                            content={dataNeutral.honorsAndAwards}
                                            // @ts-expect-error Just a type warning
                                            blocks={customBlockRenderers}
                                        />
                                    </AccordionItem>
                                    )}
                                </div>

                            </div>

                            {/* Latest articles */}
                            <div className={'mt-10'}>
                                <h3 className={'text-2xl font-bold font-title'}>Latest articles</h3>
                                <div>
                                    {dataNeutral.articles && dataNeutral.articles.length > 0 ? (
                                        dataNeutral.articles.map((item: { title: string, slug:string, CreatedDate:string }, index: number) => (
                                            <div key={index}>
                                                <ArticlesNeutral title={item.title} urlTarget={item.slug} date={item.CreatedDate}  />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No articles available at this time.</p>
                                    )}
                                </div>
                            </div>


                            {/* End left grid Biography*/}
                        </div>


                        {/* Avatar section */}
                        {console.log('dataNeutral', avatarUrl)}
                        <div className="col-span-2">
                            <div className="sticky top-30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={avatarUrl}
                                    alt={dataNeutral.name || 'Neutral'}
                                    className="w-full"

                                />
                            </div>

                        </div>
                    </div>

                    {/** Section to book a neutral*/}
                    {azureLoading && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-dark-green)] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading calendar availability...</p>
                        </div>
                    )}
                    {azureError && (
                        <div className="text-center py-8">
                            <p className="text-red-600">Unable to load calendar data. Please try again later.</p>
                        </div>
                    )}
                    <CalendarNeutral
                        caseManager={dataNeutral.case_manager || undefined}
                        neutral_id={dataNeutral.neutral_id || dataNeutral.id || slug}
                        />

                    <RatesSectionNeutral />
                    <div>
                        <>
                            <div className="mx-auto">
                                {dataNeutral.mediationPolicy &&(
                                <AccordionItem
                                    title="Mediation policy"
                                    headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                                    bodyClassName="text-gray-700 "
                                >
                                    <BlocksRenderer
                                        content={dataNeutral.mediationPolicy}
                                        // @ts-expect-error Just a type warning
                                        blocks={customBlockRenderers}
                                    />
                                </AccordionItem>
                                )}

                                {dataNeutral.arbitrationPolicy &&(
                                <AccordionItem
                                    title="Arbitration policy"
                                    headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                                    bodyClassName="text-gray-700 "
                                >
                                    <BlocksRenderer
                                        content={dataNeutral.arbitrationPolicy}
                                        // @ts-expect-error Just a type warning
                                        blocks={customBlockRenderers}
                                    />
                                </AccordionItem>
                                )}
                            </div>
                        </>
                    </div>
                </div>
            </section>


            <CallToAction/>
            <Footer/>

        </div>
    );
}
