import PageHeader from "@/components/global/PageHeader";
import MainNavigation from "@/components/global/MainNavigation";
import BlogHeader from "@/app/blog/articles/[slug]/components/blogHeader";
import AuthorComponent from "@/app/blog/articles/[slug]/components/authorComponent";
import Footer from "@/components/global/Footer";
import RelatedArticles from "@/components/sections/RelatedArticles";
import {customPageData} from "@/lib/api";
import {ArticlesType} from "@/types/api";
import dayjs, {Dayjs} from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import ArticleContent from "@/app/blog/articles/[slug]/components/articleContent";

dayjs.extend(advancedFormat);


interface ApiResponse {
    data: {
        articleImage: { url: string}
        title: string;
        date: Dayjs | string;
    };
    metadata?: Record<string, unknown>;
    errors?: Record<string, unknown>;
}



export default async function Page({params}: {params: Promise<{ slug: string }>}){
    const slug_data = await params;
    let ArticleData: ApiResponse | null = null;



    try {
        // Fetch data on the server
        const response = await customPageData(`/articles?filters[slug][$eq]=${slug_data.slug}&populate=*`);
        ArticleData = response as ApiResponse;


    } catch (error) {
        console.error("❌ Failed to fetch Article data:", error);
        // Create fallback data structure
        ArticleData = {
            data: {
                articleImage: {url: ''},
                title: '',
                date: ''
            },
            metadata: {},
            errors: {
                page_header: error,
                metadata: undefined
            }
        };
    }

    let data: ArticlesType | null = null;
    if(ArticleData && Array.isArray(ArticleData.data) && ArticleData.data.length > 0){
        data = ArticleData.data[0];
    }


    if(!data) return null;

    console.log("Article Data", data);


    return (
        <>
            <MainNavigation/>
            <PageHeader
                title={''}
                classname={'h-[650px]'}
                backgroundImage={data.articleImage?.url || ''}
            />
            <main className={`relative`}>
                {/*// TODO: pasar el slug de la cateogoria al componente BlogHeader para que pueda linkear*/}
                <BlogHeader
                    title={data.title || 'Article Title'}
                    date={dayjs(data.createdAt).format('ddd, MMM Do, YYYY')}
                    category={data.articles_category.name || null}
                    author={data.neutral.name || 'Miles Mediation'}

                    category_slug={data.articles_category.slug || ''}
                    author_slug={data.neutral.slug || ''}


                />
                <div className={'container mx-auto pt-60'}>
                    <p className={'mb-5'}>
                        By {data.neutral.name || 'Miles Mediation'}
                    </p>
                    {data.Content && data.Content.length > 0 && (
                        <ArticleContent content={data.Content} />
                    )}

                </div>


                {data.neutral &&(
                    <div>
                        <AuthorComponent
                            avatar={data.neutral.avatar.url || ''}
                            name={data.neutral.name}
                            short_description={data.neutral.short_description}
                        />
                    </div>
                )}
                <RelatedArticles className={'bg-[#b0dbdf] mt-60'} cardSize={'md'}  />
            </main>
            
            <Footer />

        </>
    )
}