import {CarouselComponent} from "@/components/ui/custom/CarouselComponent";

interface galleryType{
    images: Array<{url: string}>;
    description: string;
    title?: string;
}

export default function GallerySection({description, images, title=''}: galleryType) {

    return(
        <>
            <div className={'container mx-auto'}>
                <div className={'mb-10'}>
                    <h2 className={'font-bold text-5xl font-title main-text-color uppercase mb-5'}>{title}</h2>
                    <p className={'font-body'}>
                        {description &&(
                            description
                        )}
                    </p>
                </div>
                <div>
                    <CarouselComponent  gallery={images}/>
                </div>
            </div>
        </>
    )
}