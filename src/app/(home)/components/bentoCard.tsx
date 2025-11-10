import Link from "next/link";

interface  BentoCardType{
    imageBG: string;
    title: string;
    description: string;
    height?:string | null;
    width?:string | null;
    target_url?: string;
    classname?: string;
}

export default function BentoCard({imageBG,title,description, height, width, target_url='', classname=''} : BentoCardType){


    return(
        <>
            <div className={`relative w-full h-full rounded-xl overflow-hidden   ${classname}`}
            >
                {/*<img
                    src={imageBG ? imageBG :`/bg-demo-city.png`}
                    alt={'title'}
                    className="object-cover rounded-xl h-full w-full"
                    style={{
                        width: width ? width : '100%',
                        height: height ? height : '100%',
                    }}

                />*/}
                {/* Text Content */}
                <div className={`flex flex-col  justify-end h-full `} style={{
                    backgroundImage: `url(${imageBG ? imageBG :'bg-demo-city.png'})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: height? height : '100%',
                    width: width? width : '100%',
                }}>
                    <div className={'absolute w-full h-full  bg-linear-0 from-gray-950/75 to-gray-950/0 z-20'}></div>
                    <div className={'w-full p-5 z-30'}>
                        <h2 className={`font-title text-[32px] text-white  md:text-[40px] mb-6`}>
                            {title}
                        </h2>
                        <p className={`font-body text-[16px] text-white leading-[24px] mb-6 `}>
                            {description}
                        </p>

                        <div>
                            <Link
                                href={target_url}
                                className={`inline-block border border-white rounded-4xl text-white w-auto px-6 py-3 text-sm font-medium transition`}>
                                {'See more'}
                            </Link>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}