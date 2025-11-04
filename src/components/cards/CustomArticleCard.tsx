import {FaArrowRight} from "react-icons/fa6";
import Link from "next/link";


export default function CustomArticleCard({}){


    return(
        <>
            <div className={'border-t-1 border-gray-300 transition hover:border-t-2 hover:border-teal-400 cursor-pointer pt-5'}>
                <p className={'text-xs'}>
                    01-01-2025
                </p>
                <h3 className={'font-title text-2xl font-semibold'}>
                    The Current State of Non-Competes: How the Recent FTC Rule Affects Missouri Employment Attorneys
                </h3>
                <p className={'mt-2'}>
                    Miles Mediation & Arbitration is the fastest-growing alternative dispute resolution (ADR) provider in the Southeast, with seven office
                </p>
                <div>
                    <Link href={'/'} className={'flex items-center text-teal-500 underline'}>
                        View more <FaArrowRight className={'ml-2'} />
                    </Link>
                </div>
            </div>
        </>
    )
}