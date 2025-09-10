import NeutralCard from "../cards/NeutralCard";
import { Button } from "../ui/button";
import Link from "next/link";

// Default image for neutrals without profile images
const DEFAULT_NEUTRAL_IMAGE = "https://media.istockphoto.com/id/1949501832/photo/handsome-hispanic-senior-business-man-with-crossed-arms-smiling-at-camera-indian-or-latin.jpg?s=612x612&w=0&k=20&c=LtlsYrQxUyX7oRmYS37PnZeaV2JmoPX9hWYPOfojCgw=";

interface Props {
    title_1st_line: string;
    title_2nd_line: string;
    description?: string;
    buttonLabel?: string;
}

export default function FeaturedNeutralSection(
    {
        title_1st_line='Default',
        title_2nd_line='Title',
        description,
        buttonLabel,
    }: Props) {


  return (
    <>
        <section id="NeutralFeauterdSection">
            <div className="flex flex-col items-center justify-center container mx-auto h-[760px]">
                <div className={'grid grid-cols-4 gap-10 w-full'}>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-6xl font-bold text-[#003135]">
                            <span className="text-[#0FA4AF]">{title_1st_line}</span><br />
                            {title_2nd_line}
                        </h2>
                        <p className="mt-5">
                            {description}
                        </p>
                        <div className="mt-10">
                            <Link href={'/our-panel'}>
                                <Button className="">
                                    {buttonLabel ? buttonLabel : 'See more'}
                                </Button>
                            </Link>
                        </div>
                        
                         

                    </div>
                    <div className="col-span-3 w-full flex flex-row gap-4">
                        <NeutralCard
                            image={DEFAULT_NEUTRAL_IMAGE}
                            name={'Defautl NeutralName'}
                            url={`/our-panel/neutral/6229`}
                            subTitle={''}
                            buttonLabel="View profile"
                        />
                        <NeutralCard
                            image={DEFAULT_NEUTRAL_IMAGE}
                            name={'Defautl NeutralName'}
                            url={`/our-panel/neutral/6229`}
                            subTitle={''}
                            buttonLabel="View profile"
                        />
                        <NeutralCard
                            image={DEFAULT_NEUTRAL_IMAGE}
                            name={'Defautl NeutralName'}
                            url={`/our-panel/neutral/6229`}
                            subTitle={''}
                            buttonLabel="View profile"
                        />
                    </div>
                    
                    
                </div>
                

            </div>
        </section>
    
    </>
    
  );
}