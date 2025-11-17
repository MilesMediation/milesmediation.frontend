"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import SimpleCard from "@/components/cards/SimpleCard";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {ListBlockProps, ListItemBlockProps} from "@/app/our-panel/neutral/[slug]/page";
import {ReactNode} from "react";
import useSWR from "swr";
import {NEXT_URL_BACKOFFICE, URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import {FeaturedSection} from "@/components/sections/FeaturedSection";


export type LinkBlockProps = {
    children: ReactNode;
    url: string;
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
    link: ({ children, url }: LinkBlockProps) => {
        return (
            <a 
                href={url} 
                className="font-semibold underline hover:no-underline transition-all duration-200"
                target={url.startsWith('http') ? '_blank' : '_self'}
                rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        );
    },
};

const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())


export default function MainContentAboutUs() {


    const FETCH_URL = `/api/page-about-us?populate[services_list][populate]=*&populate[mission_section][populate]=*&populate[featured_image_content][populate]=*`;


    const { data, error, isLoading } = useSWR(`${NEXT_URL_BACKOFFICE}${FETCH_URL}`, fetcher)

    console.log('data>>>>>>>', data)

    if (isLoading) return (
        <div>

            <div className={'h-[650px] p-60 text-center'}>
                <h1>Loading...</h1>
            </div>

        </div>
    )
    if (error) return <div>Error: {error.message}</div>
    if(!data) return null;

    return (
        <main>
            <div className="container mx-auto">
                <div className={'my-10'}>

                    {/* Text section */}
                    {data.data?.intro_text &&(
                        <div>
                            <BlocksRenderer
                                content={data.data?.intro_text}
                                // @ts-expect-error Just a type warning
                                blocks={customBlockRenderers}
                            />
                        </div>
                    )}


                    {/* Image section */}
                    <div className={'mt-20 grid grid-cols-2'}>
                        {data.data?.featured_image_content &&(
                            <div className={'h-[550px]'}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className={'w-full h-full object-cover object-center'}
                                    src={ NEXT_URL_BACKOFFICE + data.data?.featured_image_content.url} alt={'Meet the team - Miles Mediation'}/>
                            </div>
                        )}
                        <div className={'p-10 bg-cyan-800 text-white flex justify-center  flex-col'}>
                            <h2 className={'h2-title-section'}>
                                Meet the Team
                            </h2>
                            <p className={'text-sm mt-5'}>
                                Our team of neutrals is comprised of experienced attorneys, retired judges, and
                                professionals from diverse backgrounds who bring a wealth of knowledge and expertise to
                                every case. We are committed to providing exceptional service and helping our clients
                                achieve their goals through effective dispute resolution.
                            </p>
                            <Link href={'/about-us/our-team'} className={'mt-10'}>
                                <Button className={'hover:cursor-pointer'}>
                                    See More
                                </Button>
                            </Link>
                        </div>


                    </div>
                    {/* Services section */}
                    <div className={'mt-50'}>
                        <h2 className={'h2-title-section text-center main-text-color'}>
                            We provide the following services
                        </h2>

                        {data.data.services_list.length > 0 &&(
                            <div className={'grid grid-cols-5 mt-10 gap-5'}>

                                {data.data.services_list.map((item: {
                                    description: string;
                                    title: string;
                                    featured_image: { url: string } | null;
                                }, index: number) => (
                                    <div key={index}>

                                        <SimpleCard
                                            title={item.title}
                                            description={item.description}
                                            icon={item.featured_image ? NEXT_URL_BACKOFFICE + item.featured_image.url : ''}
                                        />
                                    </div>
                                ))}
                            </div>

                        )}


                        <p className={'text-sm mt-10 text-center'}>
                            Miles is the fastest-growing ADR provider with offices in Atlanta, Birmingham,
                            Charlotte, Columbia, Houston, Jacksonville, Nashville, Palm Beach, Tampa, Savannah, and
                            St. Louis.
                        </p>
                    </div>
                    {data.data.mission_section &&(
                        <div>
                            <FeaturedSection
                                mode="light"
                                bgColor="white"
                                alignImg="right"
                                title={data.data.mission_section.title || 'Mission Statement'}
                                description={data.data.mission_section.description || 'We are reimagining the sphere of alternative dispute resolution for clients who\n' +
                                    '                                        deserve\n' +
                                    '                                        better than the traditional legal process, and to guide and empower parties in\n' +
                                    '                                        conflict\n' +
                                    '                                        toward successful resolution.'}
                                featuredImage={data.data?.mission_section?.featured_media}

                            />
                        </div>

                    )}
                    {data.data.disclaimer_section &&(
                        <div className={'p-10 bg-[var(--color-dark-green)] mt-10 w-full text-white text-center'}>
                            <BlocksRenderer
                                content={data.data?.disclaimer_section}
                                // @ts-expect-error Just a type warning
                                blocks={customBlockRenderers}
                            />
                            {/*<p>
                                Whether you need to schedule a mediation, book an arbitration, are interested in
                                learning more about our Workplace Division, or simply have a question about our firm
                                and how we can help you, reach out to our support team
                                <br/>
                                <span
                                    className={'font-bold'}> 888.305.3553</span> or <a
                                href="mailto:support@milesadr.com"
                                className={'font-bold underline'}>support@milesadr.com</a>
                            </p>*/}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}