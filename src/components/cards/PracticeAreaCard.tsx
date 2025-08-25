import Link from "next/link";


/**
 * */
interface PracticeAreaCardProps {
    
    title: string;
    description?: string;
    bgImage?: string;
    slug?: string;
}

export default function PracticeAreaCard({ title, description,bgImage,slug }: PracticeAreaCardProps) {

    console.log('bgImage check', bgImage)
    return(
        <>
            <Link href={slug? '/practice-area/'+ slug : ''}>
                <div style={{backgroundImage: `url(${bgImage ? bgImage : '/demo/buildings_1.jpg'})`}}
                    className="w-[300px] flex-grow h-[300px]  flex flex-col justify-center items-center bg-cover bg-no-repeat relative">
                    
                        <div
                            className="absolute w-full h-full opacity-80 z-10 bg-[linear-gradient(180deg,_rgba(0,49,53,0.19)_0%,_rgba(10,33,38,0.75)_100%)]"
                        ></div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={'text-white w-20 h-20 brightness-[300%] contrast-100 z-20'} src="/globe.svg" alt=""/>
                        <p className="font-bold text-xl mt-5 text-white z-20">
                            {title ? title : 'Defaul title' }
                        </p>
                    
                </div>
           </Link>

        </>
    )
}