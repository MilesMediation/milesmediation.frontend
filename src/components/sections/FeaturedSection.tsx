'use client'

import ButtonMiles from "@/components/ui/custom/ButtonMiles"
import classNames from "classnames"

interface FeaturedParam {
    imgBg?: string
    mode?: 'light' | 'dark'
    bgColor?: 'white' | 'dark-green' | 'teal'| null
    title?: string
    description?: string
    alignImg?: 'left' | 'right'

}

export function FeaturedSection({ imgBg = '', mode = 'light', bgColor, alignImg='left',title, description }: FeaturedParam) {

    const customBgIm = classNames({
        backgroundPosition: "center center",
        'bg-cover': true,
        'bg-no-repeat': true,

    })

    const bgColorParam = classNames({
        'bg-teal-800': bgColor === 'teal',
        'bg-[var(--color-dark-green)]': bgColor === 'dark-green',

    })

    const hasBg = Boolean(imgBg)
    console.log(hasBg)

    return (
        <div className={`py-40   ${hasBg  && customBgIm } ${bgColorParam}`}
             style={hasBg ? { backgroundImage: `url(${imgBg})`,} : {}}
        >

            <div className="container relative z-10 w-full mx-auto">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left grid */}
                    <div className={`order-${alignImg == 'left' ? '2' : '1'} flex flex-col justify-center`}>
                        <h2 className={`font-title font-bold mb-10 ${mode === 'dark' ? 'text-white' : 'text-[var(--color-dark-green)]'}`}>
                            {title && title}
                        </h2>
                        <p className={classNames('mb-8', mode === 'dark' && 'text-white/75')}>
                            {description && description}
                        </p>
                        <div>
                            <ButtonMiles>
                                See more
                            </ButtonMiles>
                        </div>
                    </div>

                    {/* Right Grid */}
                    <div className={`order-${alignImg == 'left' ? '1' : '2'} `}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/demo/locations/locationSampleImg.png"
                            alt="Location Site"
                            className="object-cover rounded-xl"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
