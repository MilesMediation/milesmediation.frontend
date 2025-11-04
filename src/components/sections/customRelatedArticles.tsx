import CustomArticleCard from "@/components/cards/CustomArticleCard";
import {Button} from "@/components/ui/button";


interface CustomRelatedArticlesSection{
    title?: string;
    description?: string;
}

export default function CustomRelatedArticles({title, description}: CustomRelatedArticlesSection) {

    return(
        <>
            <section id={'#RelatedArticles'}>
                <div className={'container mx-auto'}>
                    {title && (
                        <div className={'flex justify-between'}>
                            <h1 className={'text-4xl main-text-color font-title font-bold'}>{title}</h1>
                            <Button variant={'outline'}>
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
                        <CustomArticleCard />
                        <CustomArticleCard />
                        <CustomArticleCard />
                    </div>
                </div>

            </section>
        </>
    )
}