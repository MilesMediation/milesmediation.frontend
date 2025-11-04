import ButtonMiles from "@/components/ui/custom/ButtonMiles";
import CardComponent from "@/components/cards/CardComponent";
import Link from "next/link";

interface officesData{
    name: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    url: string;
    image: string;
}
interface featuredData {
    title?: string
    offices?: officesData[]
    seeMoreURL?: string
    description?: string;
}

export function FeaturedCardsSection({ offices, description='', seeMoreURL='', title = 'Default title' }: featuredData) {
    return (
        <div className="container mx-auto py-10">
            {/* Title Section */}
            <div className="flex flex-wrap justify-between items-center">
                <h3 className={'text-5xl main-text-color font-bold'}>{title}</h3>
                {seeMoreURL &&(
                    <>
                        <Link href={seeMoreURL} passHref>
                            <ButtonMiles  variant="contained">See all</ButtonMiles >
                        </Link>
                    </>
                )}

            </div>
            {description &&(
            <div>
                <p>{description}</p>
            </div>
            )}

            {/* Cards section */}
            <div className="mt-10 flex flex-row gap-4">
                {offices?.map((item, index) => (
                    <div className='w-full' key={index}>
                        <CardComponent
                            size={item.size}
                            image={item.image}
                            name={item.name}
                            url={item.url}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}