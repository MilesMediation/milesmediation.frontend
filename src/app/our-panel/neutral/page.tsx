import MainNavigation from "@/components/global/MainNavigation";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
/*import NeutralCard from "@/components/cards/NeutralCard";*/
import ButtonMiles from "@/components/ui/custom/ButtonMiles";
import {AccordionMiles} from "@/components/global/AccordionMiles";
import ArticlesNeutral from "@/app/our-panel/neutral/components/ArticlesNeutral";
import CalendarNeutral from "@/app/our-panel/neutral/components/CalendarNeutral";
import RatesSectionNeutral from "@/app/our-panel/neutral/components/RatesSectionNeutral";
import AccordionItem from "@/components/ui/AccordionItems";


const neutrals = [
    {name: 'Sally Ankins', image: '/neutrals/sally.png', url: '/offices/atlanta'},
    {name: 'Leah Albert', image: '/neutrals/leah.png', url: '/offices/boston'},
    {name: 'William Atkins', image: '/neutrals/william.png', url: '/offices/birmingham'},
    {name: 'John Austin', image: '/neutrals/john.png', url: '/offices/chicago'},

    {name: 'Ron Bankston', image: '/neutrals/ron.png', url: '/offices/chicago'},
    {name: 'Marc Barré', image: '/neutrals/marc.png', url: '/offices/chicago'},
    {name: 'Todd Bechtel', image: '/neutrals/todd.png', url: '/offices/chicago'},
    {name: 'Audrey Berland', image: '/neutrals/audrey.png', url: '/offices/chicago'},
]


export default function Page() {
    return (
        <div className="bg-white text-gray-800 space-y-12">
            <MainNavigation/>

            <section
                className="w-full py-[100px]  bg-cover bg-center relative mb-0">
                {/* Overlay */}


                {/* Content */}
                <div className="container mx-auto">

                    <div className="py-10 grid grid-cols-4 gap-10">
                        <div className='col-span-2 '>
                            <h2 className="font-title text-3xl md:text-4xl uppercase font-bold mb-8">Gabrila
                                Camboni</h2>
                            <div className={'columns-2 gap-8 text-justify gap'}>

                                {/* Biography*/}
                                <p className="font-body">
                                    Miles’ neutrals are experienced
                                    mediators and arbitrators with expertise in their fields. They are experts in
                                    dispute
                                    resolution who are helping to shape the future of the ADR field with thought
                                    leadership
                                    that includes articles, speaking engagements, and CLE classes and training. Learn
                                    more
                                    about their background and experience here.
                                </p>
                                <p className="font-body">
                                    Miles’ neutrals are experienced
                                    mediators and arbitrators with expertise in their fields. They are experts in
                                    dispute
                                    resolution who are helping to shape the future of the ADR field with thought
                                    leadership
                                    that includes articles, speaking engagements, and CLE classes and training. Learn
                                    more
                                    about their background and experience here.
                                </p>
                                <p className="font-body">
                                    Miles’ neutrals are experienced
                                    mediators and arbitrators with expertise in their fields. They are experts in
                                    dispute
                                    resolution who are helping to shape the future of the ADR field with thought
                                    leadership
                                    that includes articles, speaking engagements, and CLE classes and training. Learn
                                    more
                                    about their background and experience here.
                                </p>
                                <p className="font-body">
                                    Miles’ neutrals are experienced
                                    mediators and arbitrators with expertise in their fields. They are experts in
                                    dispute
                                    resolution who are helping to shape the future of the ADR field with thought
                                    leadership
                                    that includes articles, speaking engagements, and CLE classes and training. Learn
                                    more
                                    about their background and experience here.
                                </p>
                            </div>
                            {/* Button sections */}
                            <div className={'mt-8 gap-4 flex justify-start '}>
                                <ButtonMiles >
                                    Book
                                </ButtonMiles>
                                <ButtonMiles variant='outlined'>Costs</ButtonMiles>
                                <ButtonMiles variant='outlined'> See more</ButtonMiles>

                            </div>
                            {/* Personal Quote */}
                            <div className='mt-10 py-10 border-y-1 border-[var(--color-dark-green)]/30'>
                                <h2 className={'text-3xl font-medium'}>
                                    It&#34;s exciting to help companies find that next gear of growth as they bring new
                                    medicines to market.”
                                </h2>
                            </div>

                            {/* Practice area */}
                            <div className={'mt-10'}>
                                <h3 className={'text-2xl font-bold'}>Practrice area</h3>
                                <ul className={'list-inside list-disc'}>
                                    <li>Construction law</li>
                                    <li>Employment law</li>
                                    <li>Personal Injury law</li>
                                </ul>
                            </div>

                            {/* Accordion section */}
                            <div className={'mt-10'}>

                                <AccordionMiles />

                            </div>

                            {/* Latest articles */}
                            <div className={'mt-10'}>
                                <h3 className={'text-2xl font-bold font-                                                                                                                                                                 '}>Latest articles</h3>
                                <div>
                                    <ArticlesNeutral />
                                    <ArticlesNeutral />
                                </div>
                            </div>


                            {/* End left grid Biography*/}
                        </div>


                        {/* Avatar section */}
                        <div className="col-span-2">
                            <div>
                                <img
                                    src={neutrals[1].image}
                                    alt={neutrals[1].name}
                                    className="w-full"

                                />
                            </div>

                        </div>
                    </div>

                    {/** Section to book a neutral*/}
                    <CalendarNeutral />

                    <RatesSectionNeutral />
                    <div>
                        <>
                            <div className="mx-auto">
                                <AccordionItem
                                    title="Mediation policy"
                                    headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                                    bodyClassName="text-gray-700 "
                                >
                                    Material Tailwind is a UI library that combines Tailwind CSS with Material Design components. It&#39;s
                                    customizable and built for React.
                                </AccordionItem>

                                <AccordionItem
                                    title="Arbitration"
                                    headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                                    bodyClassName="text-gray-700  px-4 py-2"
                                >
                                    Yes! You can pass your own classes to the header and body using the props `headerClassName` and
                                    `bodyClassName`.
                                </AccordionItem>

                                <AccordionItem
                                    title="Issuance of the final Arbitration order/award"
                                    headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                                    bodyClassName="text-gray-700 text-normal px-2 py-4"
                                >
                                    Yes! You can pass your own classes to the header and body using the props `headerClassName` and
                                    `bodyClassName`.
                                </AccordionItem>
                            </div>
                        </>
                    </div>
                </div>
            </section>


            <CallToAction/>
            <Footer/>

        </div>
    );
}
