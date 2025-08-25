import Link from "next/link";


interface ArticlesNeutralType {
    title: string,
    date: string,
    urlTarget: string,
}

export default function ArticlesNeutral({title='Default tile', date='01/01/2025', urlTarget='https://www.google.com/'}: ArticlesNeutralType) {


    return(
        <>
            <div className={'py-10 border-b border-b-gray-200'}>

                <div>
                    <p className={'text-sm uppercase'}>
                        {date}
                    </p>
                </div>
                <Link href={urlTarget}>

                    <h3 className={'text-large font-medium'} style={{fontSize: '28px'}}>
                        {title}
                    </h3>
                </Link>
            </div>
        </>
    )
}