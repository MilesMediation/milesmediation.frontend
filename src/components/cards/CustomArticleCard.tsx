import {FaArrowRight} from "react-icons/fa6";
import Link from "next/link";


export default function CustomArticleCard({title, description, url}: {title: string; description: string; url?: string}) {


    return(
        <>
            <div className={'group border-t-1 relative border-gray-300  cursor-pointer pt-5'}>
                <div className={'h-[2px] bg-teal-400 absolute top-[-1px] w-0 group-hover:w-full transition-all duration-500 ease-in-out'}></div>
                <p className={'text-xs'}>
                    01-01-2025
                </p>
                <h3 className={'font-title text-2xl font-semibold'}>
                    {title}
                </h3>
                <p className={'mt-2'}>
                    {description}
                </p>
                <div>
                    <Link href={url ? url : '/'} className={'flex items-center text-teal-500 relative overflow-hidden'}>
                        <span className={'relative left-[-75px] group-hover:left-[0px] transition-all duration-300 ease-in-out'}>View more</span>
                        <FaArrowRight className={'ml-2 relative left-[-80px] group-hover:left-[0px] transition-all duration-300 ease-in-out'} />
                    </Link>
                </div>
            </div>
        </>
    )
}