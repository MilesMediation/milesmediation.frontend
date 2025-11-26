import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";

interface GalleryItem {
    url: string;
}

export function CarouselComponent({gallery}: {gallery: GalleryItem[]}) {

    // console.log('Gallery check', gallery)

    if (!gallery) return null

    return (
        <Carousel className="w-full">
            <CarouselContent >
                {gallery.map((item, index) => (
                    <CarouselItem key={index}  className="sm:basis-1 lg:basis-7xl">
                        <div className="">
                            <Card className={'py-0'}>
                                <CardContent className="flex h-[440px] rounded-xl overflow-hidden items-center justify-center p-0">
                                    {/*<span className="text-4xl font-semibold">{index + 1}</span>*/}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`${NEXT_URL_BACKOFFICE}${item.url}`} alt="" className={'w-full h-full object-cover'} />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className={'button-left'} />
            <CarouselNext  className={'button-right'}/>
        </Carousel>
    )
}
