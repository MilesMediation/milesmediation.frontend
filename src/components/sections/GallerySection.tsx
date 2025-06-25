import {CarouselComponent} from "@/components/ui/custom/CarouselComponent";


export default function GallerySection() {

    return(
        <>
            <div className={'container mx-auto py-40'}>
                <div className={'mb-10'}>
                    <h2 className={'font-bold font-title main-text-color uppercase mb-5'}>Gallery</h2>
                    <p className={'font-body'}>
                        Miles’ neutrals are experienced mediators and arbitrators with expertise in their fields. They are
                        experts in dispute resolution who are helping to shape the future of the ADR field with thought
                        leadership that includes articles, speaking engagements, and CLE classes and training. Learn more
                        about their background and experience here.
                    </p>
                </div>
                <div>
                    <CarouselComponent />
                </div>
            </div>
        </>
    )
}