import Link from "next/link";

interface blogHeaderType{
    title: string
    date: string
    category?: string | null;
    author?: string;
    author_slug?: string | null;
    category_slug?: string | null;
}


export default function BlogHeader({ title='', date, category,category_slug, author_slug, author }: blogHeaderType) {

    return(
        <>
            <div className={`absolute -top-10 w-full flex items-center justify-center`}>
                <div className={`bg-white container shadow-lg border inline-block  border-gray-50 p-10 mx-auto text-center`}>
                    <h1 className={'font-title  main-text-color font-bold text-4xl pb-5'}>{title}</h1>
                    <hr  className={'w-1/3 mx-auto'}/>
                    <div className={'pt-5'}>
                        <p className={'text-sm'}>
                            {date}&nbsp;
                            {(author && author_slug) && (
                                <>
                                    | By <Link href={`/our-panel/neutral/${author_slug}`} target={'_blank'} className={'main-text-color underline font-medium'}>
                                            {author}
                                        </Link>&nbsp;
                                </>
                            )}
                            {(category && category_slug) && (
                                <>
                                    | <Link href={`/articles/${category_slug}`} target={'_blank'} className={'main-text-color underline font-medium'}>{category}</Link>&nbsp;
                                </>
                            )}
                            | <Link href="#" target={'_blank'} className='main-text-color underline font-medium'>Share</Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}