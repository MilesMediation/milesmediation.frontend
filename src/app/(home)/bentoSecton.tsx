import Image from "next/image";
import Link from "next/link";
import BentoCard from "@/app/(home)/components/bentoCard";


export default function BentoSection(){


    return(

        <>
            <section id={'bentoSection'} className={'py-60 mb-0'}>
                <div className="relative container z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 items-center">

                        <BentoCard
                            title={'Dashboard'}
                            description={'Miles\' neutrals are experienced mediators and arbitrators with expertise in their fields. They are experts in dispute resolution who are helping to shape the future of the ADR field with thought leadership that includes articles, speaking engagements, and CLE classes and training. Learn more about their background and experience here.'}
                            imageBG={'/bg-demo-city.png'}/>
                        <div className={'flex flex-col gap-5'}>
                            <BentoCard
                                title={'Our Panel'}
                                description={'Meet our larger panel of neutrals and arbitrators'}
                                height={'400px'}
                                imageBG={'/cardImgSample1.png'}/>
                            <BentoCard
                                title={'Our Videos'}
                                description={'Learn more about the latest trends and new from our neutrals'}
                                height={'400px'}
                                imageBG={'/heroBanner.png'}/>
                        </div>

                    {/* Image */}

                </div>
            </section>
        </>
    )

}