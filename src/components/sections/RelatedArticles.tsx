'use client'

import CardComponent from "@/components/cards/CardComponent";
import classNames from "classnames";
import {useMemo} from "react";

// Base article interface that covers common article structures
interface BaseArticle {
    id?: number;
    title?: string;
    name?: string;
    slug?: string;
    url?: string;
    articleImage?: {
        url?: string;
        data?: {
            attributes?: {
                url?: string;
            };
        };
    };
    image?: {
        url?: string;
    };
    attributes?: {
        title?: string;
        name?: string;
        slug?: string;
        articleImage?: {
            data?: {
                attributes?: {
                    url?: string;
                };
            };
        };
    };
}

interface RelatedArticleTypes {
    amount?: 2 | 3 | 5;
    bgMode?: 'dark' | 'light';
    customTitle?: string;
    cardSize: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    articleList?: BaseArticle[];
    exampleMode?: boolean;
    descriptionText?: string;
}


export default function RelatedArticles(
    {
        amount = 3,
        customTitle = 'RELATED ARTICLES',
        bgMode = 'light',
        cardSize = 'lg',
        className = '',
        articleList,
        exampleMode = false,
        descriptionText= ''
    }: RelatedArticleTypes) {


    const testData: { name: string; url: string; size: 'sm' | 'md' | 'lg', image: string } = {
        name: 'The Current State of Non-Competes: How the Recent FTC Rule Affects Missouri Employment Attorneys',
        url: '/',
        size: 'lg',
        image: ''
    }

    const backgrounColorCustom = classNames({
        'text-white': bgMode === 'dark',
        'bg-teal-800': bgMode === 'dark',
    })

    // Normalize incoming data to the shape CardComponent expects
    const normalizedItems = useMemo(() => {
        if (!Array.isArray(articleList)) return [] as { name: string; url: string; image?: string }[];

        const mapImage = (a: BaseArticle): string | undefined => {
            // Common cases for Strapi responses (direct or attributes-based)
            if (a?.articleImage?.url) return a.articleImage.url;
            if (a?.articleImage?.data?.attributes?.url) return a.articleImage.data.attributes.url;
            if (a?.image?.url) return a.image.url;
            if (a?.attributes?.articleImage?.data?.attributes?.url) return a.attributes.articleImage.data.attributes.url;
            return undefined;
        }

        const mapSlug = (a: BaseArticle): string | undefined => {
            return a?.slug || a?.attributes?.slug;
        }

        const mapTitle = (a: BaseArticle): string => {
            return a?.title || a?.name || a?.attributes?.title || a?.attributes?.name || '';
        }

        const mapUrl = (a: BaseArticle): string => {
            if (typeof a?.url === 'string') return a.url;
            const slug = mapSlug(a);
            return slug ? `/blog/articles/${slug}` : '/';
        }

        return articleList.map((a: BaseArticle) => ({
            name: mapTitle(a),
            url: mapUrl(a),
            image: mapImage(a)
        }));
    }, [articleList]);

    return (
        <>

            <section className={`${backgrounColorCustom} ${className} `}>
                <div className={'container mx-auto py-10'}>
                    {(normalizedItems.length > 0 || exampleMode) && (
                    <h2 className={`text-5xl uppercase font-bold ${bgMode === 'dark' ? 'text-white' : 'main-text-color'} `}>
                        {customTitle}
                    </h2>
                    )}
                    {descriptionText && (
                        <p className={'mt-5'}>{descriptionText}</p>
                    )}
                    {(amount == 3 || amount == 2) && (
                        <div className={'mt-10 flex gap-4'}>
                            {(() => {
                                const itemsToRender = normalizedItems.slice(0, amount);
                                return (
                                    <>
                                        {itemsToRender.map((item, index) => (
                                            <div key={`${item.url}-${index}`} className={`w-1/${amount} `}>
                                                <CardComponent name={item.name} url={item.url} image={item.image} size={cardSize}/>
                                            </div>
                                        ))}
                                        {(normalizedItems.length === 0 && exampleMode) && Array.from({length: amount}).map((_, index) => (
                                            <div key={`ph-${index}`} className={`w-1/${amount} `}>
                                                <CardComponent name={testData.name} url={testData.url} size={cardSize}/>
                                            </div>
                                        ))}
                                    </>
                                );
                            })()}
                        </div>
                    )}

                    {amount == 5 && (
                        <>
                            <div className="mt-10 grid grid-cols-2 gap-4">
                                {(() => {
                                    const topItems = normalizedItems.slice(0, 2);
                                    return (
                                        <>
                                            {topItems.map((item, index) => (
                                                <div key={`top-${item.url}-${index}`} className="w-1.2">
                                                    <CardComponent name={item.name} url={item.url} image={item.image} size={cardSize} />
                                                </div>
                                            ))}
                                            {(normalizedItems.length === 0 && exampleMode) && Array.from({length: 2}).map((_, index) => (
                                                <div key={`top-ph-${index}`} className="w-1.2">
                                                    <CardComponent name={testData.name} url={testData.url} size={cardSize} />
                                                </div>
                                            ))}
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {(() => {
                                    const bottomItems = normalizedItems.slice(2, 5);
                                    return (
                                        <>
                                            {bottomItems.map((item, index) => (
                                                <div key={`bottom-${item.url}-${index}`} className="">
                                                    <CardComponent name={item.name} url={item.url} image={item.image} size={cardSize} />
                                                </div>
                                            ))}
                                            {normalizedItems.length === 0 && Array.from({length: 3}).map((_, index) => (
                                                <div key={`bottom-ph-${index}`} className="">
                                                    <CardComponent name={testData.name} url={testData.url} size={cardSize} />
                                                </div>
                                            ))}
                                        </>
                                    );
                                })()}
                            </div>
                        </>
                    )}
                </div>
            </section>

        </>
    )
}