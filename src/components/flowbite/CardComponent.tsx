import classNames from "classnames";

export default function CardComponent() {

    const cardContainer = classNames(
        'max-w-sm',
        'bg-white',
        'border',
        'border-gray-200',
        'rounded-lg',
        'shadow-sm',
        'dark:bg-gray-800',
        'dark:border-gray-700',
    )

    return (
        <>


            <div className={cardContainer}>
                <a href="#">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-[250px] w-full" src={'/demo/buildings_1.jpg'} alt=""/>
                </a>
                <div className="p-5">
                    <div className={'bg-cyan-600 text-white inline-block p-2 mb-2 uppercase font-medium text-xs rounded-sm'}>
                        Commercial law
                    </div>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-title font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                        technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a href="#"
                       className="inline-flex items-center py-2 text-sm font-medium text-center text-cyan-500">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>

        </>
    )

}