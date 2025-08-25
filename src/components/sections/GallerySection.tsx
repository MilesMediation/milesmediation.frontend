import {CarouselComponent} from "@/components/ui/custom/CarouselComponent";

interface galleryType{
    images: Array;
    description: string;
}

export default function GallerySection({description, images}: galleryType) {

    return(
        <>
            <div className={'container mx-auto py-40'}>
                <div className={'mb-10'}>
                    <h2 className={'font-bold font-title main-text-color uppercase mb-5'}>Gallery</h2>
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