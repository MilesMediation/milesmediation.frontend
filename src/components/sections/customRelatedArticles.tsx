import CustomArticleCard from "@/components/cards/CustomArticleCard";
import {Button} from "@/components/ui/button";
import {customPageData} from "@/lib/api";
import {ArticlesType} from "@/types/api";


interface CustomRelatedArticlesSection{
    title?: string;
    description?: string;
}

export default async function CustomRelatedArticles({title, description}: CustomRelatedArticlesSection) {

    let ArticleData: { is_available: boolean; title: string; description?: string } | null | undefined = null;
    let ArticlesList = null;

    const request_url = '/page-home?populate[related_articles][populate]=*'
    const articles_url = '/articles?populate=*&sort=createdAt:desc&pagination[limit]=3'

    try{
        const response = await customPageData<{
            related_articles: { is_available: boolean; title:string; description?: string; } | null;
             }>(request_url)

        ArticleData = response.data?.related_articles;
        console.log('Responde data', response.data.related_articles)

    }catch (error) {
        console.log(error);
    }

    try{
        const response = await customPageData<ArticlesType[]>(articles_url)

        ArticlesList = response.data;
        console.log('Articles List data', response.data)

    }catch (error) {
        console.log(error);
    }



    if(!ArticleData)return  null


    if(!ArticleData.is_available)return  null



    return(
        <>
            <section id={'#RelatedArticles'} className={'my-20'}>
                <div className={'container mx-auto'}>
                    {title && (
                        <div className={'flex justify-between'}>
                            <h1 className={'text-4xl main-text-color font-title font-bold'}>{ArticleData.title ? ArticleData.title : ''}</h1>
                            <Button variant={'outlined'}>
                                See all
                            </Button>
                        </div>
                    )}

                    {description &&(
                    <p>
                        {description}
                    </p>
                    )}
                    <div className={'mt-10 grid grid-cols-3 gap-4'}>
                        {(ArticlesList && ArticlesList.length > 0) && ArticlesList.map((article, index) => (
                            <div key={index}>
                                <CustomArticleCard title={article.title} description={article.short_description} />
                            </div>

                        ))}


                    </div>
                </div>

            </section>
        </>
    )
}