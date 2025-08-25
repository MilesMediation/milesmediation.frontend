'use client'

import CardComponent from "@/components/cards/CardComponent";
import classNames from "classnames";
import {useEffect, useState} from "react";

interface relatedArticleTypes {
    amount?: 2 | 3 | 5;
    bgMode?: 'dark' | 'light';
    customTitle?: string;
    cardSize: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}



export default function RelatedArticles(
    {amount=3, customTitle='RELATED ARTICLES', bgMode='light', cardSize='lg', className=''}: relatedArticleTypes) {

    const [relatedArticlesData, setRelatedArticlesData] = useState<relatedArticleTypes>({
        cardSize: 'lg',
    })

    const testData : {name:string; url: string; size: 'sm'| 'md' | 'lg'}= {
        name: 'The Current State of Non-Competes: How the Recent FTC Rule Affects Missouri Employment Attorneys',
        url: '/',
        size:'lg'
    }

    const backgrounColorCustom = classNames({
        'text-white': bgMode === 'dark',
        'bg-teal-800': bgMode === 'dark',
    })


    useEffect(() => {
        setRelatedArticlesData({
            cardSize: cardSize
        })
    }, [cardSize]);
    
    if (!relatedArticlesData)return null;
    return(
        <>

            <section className={`${backgrounColorCustom} ${className} `}>
                <div className={'container mx-auto py-40'}>
                    <h2 className={'text-center uppercase font-bold'}>
                        {customTitle}
                    </h2>
                    {(amount == 3 || amount == 2) &&(
                    <div className={'mt-10 flex flex-row flex-wrap'}>
                        {Array.from({ length: amount }).map((_, index) => (
                            <div key={index} className={`w-1/${amount} p-4`}>
                                <CardComponent   name={testData.name} url={testData.url} size={relatedArticlesData.cardSize} />
                            </div>

                        ))}
                    </div>
                    )}

                    {amount == 5 &&(
                        <>
                            <div className={'mt-10 flex flex-row flex-wrap'}>
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index} className={`w-1/2 p-4`}>
                                        <CardComponent   name={testData.name} url={testData.url} size={testData.size} />
                                    </div>

                                ))}
                            </div>
                            <div className={'mt-10 flex flex-row flex-wrap'}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className={`w-1/3 p-4`}>
                                        <CardComponent   name={testData.name} url={testData.url} size={testData.size} />
                                    </div>

                                ))}
                            </div>
                        </>

                    )}
                </div>
            </section>

        </>
    )
}