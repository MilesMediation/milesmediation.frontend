import ButtonMiles from "@/components/ui/custom/ButtonMiles";
import CardComponent from "@/components/cards/CardComponent";

interface officesData{
    name: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    url: string;
    image: string;
}
interface featuredData {
    cityName?: string
    offices?: officesData[]
}

export function FeaturedCardsSection({ offices, cityName = 'Default title' }: featuredData) {
    return (
        <div className="container mx-auto py-10">
            {/* Title Section */}
            <div className="flex flex-wrap justify-between items-center">
                <h3 className={'font-bold'}>{cityName}</h3>
                <ButtonMiles variant="contained">See all</ButtonMiles>
            </div>

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