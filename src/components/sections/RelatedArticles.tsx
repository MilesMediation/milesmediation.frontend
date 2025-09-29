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
    articleList?: any[];
}



export default function RelatedArticles(
    {amount=3, customTitle='RELATED ARTICLES', bgMode='light', cardSize='lg', className='', articleList = []}: relatedArticleTypes) {

    const [relatedArticlesData, setRelatedArticlesData] = useState<relatedArticleTypes>({
        cardSize: 'lg',
        articleList: []
    })

    const testData : {name:string; url: string; size: 'sm'| 'md' | 'lg', image: string} = {
        name: 'The Current State of Non-Competes: How the Recent FTC Rule Affects Missouri Employment Attorneys',
        url: '/',
        size:'lg',
        image: ''
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

    useEffect(() => {
        console.log('Related Articles - articleList: ', articleList);
    }, [articleList]);
    
    if (!relatedArticlesData)return null;


    return(
        <>

            <section className={`${backgrounColorCustom} ${className} `}>
                <div className={'container mx-auto py-40'}>
                    <h2 className={'text-5xl main-text-color uppercase font-bold'}>
                        {customTitle}
                    </h2>
                    {(amount == 3 || amount == 2) &&(
                    <div className={'mt-10 flex flex-row flex-wrap'}>
                        {(articleList && articleList?.length) > 0 && (
                            <>
                                {articleList.map((article, index) => (
                                    <div key={index} className={`w-1/${amount} p-4`}>
                                        <CardComponent   name={article.name} url={article.url} size={relatedArticlesData.cardSize} />
                                    </div>
                                ))}
                            </>
                        )}
                        {articleList?.length == 0 && (
                            Array.from({ length: amount }).map((_, index) => (
                                <div key={index} className={`w-1/${amount} p-4`}>
                                    <CardComponent   name={testData.name} url={testData.url} size={relatedArticlesData.cardSize} />
                                </div>

                            ))
                        )}
                    </div>
                    )}

{amount == 5 && (
  <>
    <div className="mt-10 grid grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="w-1.2">
          <CardComponent
            name={testData.name}
            url={testData.url}
            size={testData.size}
          />
        </div>
      ))}
    </div>

    <div className="mt-4 grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="">
          <CardComponent
            name={testData.name}
            url={testData.url}
            size={testData.size}
          />
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