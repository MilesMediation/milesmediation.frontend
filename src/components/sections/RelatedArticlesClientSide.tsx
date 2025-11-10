'use client'

import CardComponent from "@/components/cards/CardComponent";
import classNames from "classnames";
import {useMemo} from "react";
import useSWR from "swr";
import {URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import type {ArticlesType, RelatedArticleCard} from "@/types/api";

type ArticleCardSize = 'sm' | 'md' | 'lg' | 'xl';

interface RelatedArticleProps {
    amount?: 2 | 3 | 5;
    bgMode?: 'dark' | 'light';
    customTitle?: string;
    cardSize?: ArticleCardSize;
    className?: string;
    articleList?: RelatedArticleCard[];
    endpoint_slug?: string;
}

const fetcher = async (url: string | URL | Request): Promise<{ data?: ArticlesType[] }> => {
    const response = await fetch(url);
    return response.json();
};

const DEFAULT_CARD_SIZE: ArticleCardSize = 'lg';

const mapImage = (article: RelatedArticleCard | ArticlesType): string | undefined => {
    if ("image" in article) {
        return article.image;
    }
    if ("articleImage" in article && article.articleImage?.url) {
        return article.articleImage.url;
    }
    return undefined;
};

const mapSlug = (article: RelatedArticleCard | ArticlesType): string | undefined => {
    if ("url" in article) {
        const rawUrl = article.url;
        if (typeof rawUrl === "string" && rawUrl.startsWith("/")) {
            return rawUrl.replace("/blog/articles/", "");
        }
        return undefined;
    }

    return article.slug;
};

const mapTitle = (article: RelatedArticleCard | ArticlesType): string => {
    if ("name" in article) {
        return article.name;
    }
    return article.title;
};

const mapUrl = (article: RelatedArticleCard | ArticlesType): string => {
    if ("url" in article && typeof article.url === "string") {
        return article.url;
    }
    const slug = mapSlug(article);
    return slug ? `/blog/articles/${slug}` : "/";
};

const normalizeArticle = (article: RelatedArticleCard | ArticlesType): RelatedArticleCard => ({
    name: mapTitle(article),
    url: mapUrl(article),
    image: mapImage(article),
});

export default function RelatedArticlesClientSide(
    {
        amount = 3,
        customTitle = 'RELATED ARTICLES',
        bgMode = 'light',
        cardSize = DEFAULT_CARD_SIZE,
        className = '',
        articleList,
        endpoint_slug,
    }: RelatedArticleProps) {


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


    // endpoint_slug
    const FETCH_URL = endpoint_slug
        ? `/api/articles?filters[articles_category][slug][$eq]=${endpoint_slug}&fields[0]=title&fields[1]=slug&fields[2]=isAvailable&fields[3]=CreatedDate&fields[4]=short_description&populate[articleImage][fields][0]=url&populate[articles_category][fields][0]=slug&populate[articles_category][fields][1]=name`
        : null;


    const { data, error, isLoading } = useSWR(
        FETCH_URL ? `${URL_BACKOFFICE_DOMAIN}${FETCH_URL}` : null,
        fetcher
    );

    const normalizedItems = useMemo<RelatedArticleCard[]>(() => {
        if (Array.isArray(articleList) && articleList.length > 0) {
            return articleList.map(normalizeArticle);
        }
        if (Array.isArray(data?.data) && data.data.length > 0) {
            return data.data.map(normalizeArticle);
        }
        return [];
    }, [articleList, data]);

    console.log('data>>>>>>>', data)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <>

            <section className={`${backgrounColorCustom} ${className} `}>
                <div className={'container mx-auto py-10'}>
                    <h2 className={`text-5xl uppercase font-bold ${bgMode === 'dark' ? 'text-white' : 'main-text-color'} `}>
                        {customTitle}
                    </h2>
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
                                        {normalizedItems.length === 0 && Array.from({length: amount}).map((_, index) => (
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
                                            {normalizedItems.length === 0 && Array.from({length: 2}).map((_, index) => (
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