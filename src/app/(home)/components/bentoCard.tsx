import Link from "next/link";

interface  BentoCardType{
    imageBG: string;
    title: string;
    description: string;
    height?:string | null;
    width?:string | null;
}

export default function BentoCard({imageBG,title,description, height, width} : BentoCardType){


    return(
        <>
            <div className={`relative w-full h-[300px] sm:h-full  aspect-square sm:aspect-auto rounded-xl overflow-hidden`}
            >
                <img
                    src={imageBG ? imageBG :`/bg-demo-city.png`}
                    alt={'title'}
                    className="object-cover rounded-xl h-full w-full"
                    style={{
                        width: width ? width : '100%',
                        height: height ? height : '100%',
                    }}

                />
                {/* Text Content */}
                <div className={`flex flex-col justify-center absolute left-0 bottom-0 p-5 justify-end`}>
                    <h2 className={`font-title text-[32px] text-white  md:text-[40px] mb-6`}>
                        {title}
                    </h2>
                    <p className={`font-body text-[16px] text-white leading-[24px] mb-6 `}>
                        {description}
                    </p>

                    <div>
                        <Link
                            href={'buttonUrl'}
                            className={`inline-block border border-white rounded-4xl text-white w-auto px-6 py-3 text-sm font-medium transition`}>
                            {'See more'}
                        </Link>
                    </div>
                </div>
            </div>


        </>
    )
}