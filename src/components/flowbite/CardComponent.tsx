import classNames from "classnames";
import Link from "next/link";

interface CardComponentProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    readMoreUrl?: boolean;
    url: string;
}

export default function CardComponent({title,url, description, imageUrl, category, readMoreUrl}: CardComponentProps) {

    const cardContainer = classNames(
        'h-full',
        'max-w-sm',
        'bg-white',
        'border',
        'border-gray-200',
        'rounded-lg',
        'shadow-sm',
        'dark:bg-gray-800',
        'dark:border-gray-700',
        'flex',
        'flex-col',
        'relative',
        'overflow-hidden',
    )

    return (
        <>

        <Link href={url}>
            <div className={cardContainer}>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-[250px] w-full object-cover" src={imageUrl ? imageUrl : '/demo/buildings_1.jpg'} alt=""/>

                <div className="p-5 h-full flex-1 flex flex-col justify-between">
                    <div>
                        {category &&(
                        <div className={'absolute top-4 bg-cyan-600 text-white inline-block p-1 mb-2 uppercase  text-[11px] rounded-sm'}>
                            {category}
                        </div>
                        )}
                            <h5 className="mb-2 text-2xl font-title font-bold tracking-tight text-gray-900 dark:text-white">
                                {title}
                            </h5>

                        {description &&(
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 overflow-hidden">
                            {description}
                        </p>
                        )}
                    </div>
                    {readMoreUrl &&(
                    <span
                       className="inline-flex items-center py-2 text-sm font-medium text-center text-cyan-500 mt-auto">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </span>
                    )}
                </div>
            </div>
        </Link>
        </>
    )

}