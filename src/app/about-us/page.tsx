import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import ButtonMiles from "@/components/ui/custom/ButtonMiles";
import SimpleCard from "@/components/cards/SimpleCard";


export default function Page() {


    return (
        <>
            <MainNavigation/>
            <PageHeader title={'About Us'}/>
            <main>
                <div className="container mx-auto">
                    <div className={'my-10'}>

                        {/* Text section */}
                        <div>
                            <p>
                                For more than two decades, Miles Mediation & Arbitration has been shaping the
                                alternative
                                dispute resolution (ADR) industry with our comprehensive professional services model
                                that
                                combines the expertise of our highly skilled, diverse panel of neutrals with an
                                unparalleled
                                level of client support to guide and empower parties to fair, timely, and cost-effective
                                resolution regardless of case size, specialization, or complexity.
                            </p>
                            <p>
                                Our experienced neutrals and exceptional administrative support team let you focus on
                                getting
                                cases resolved. From the way you are greeted when you arrive at a Miles office to the
                                comfortable, welcoming environment to the high-tech offices and delicious meals and
                                snacks, our
                                focus is on providing an environment that lets you focus on getting cases resolved.
                            </p>
                        </div>

                        {/* Image section */}
                        <div className={'my-10'}>
                            <div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={'demo/aboutUsSample.png'} alt={'Meet the team - Miles Mediation'}/>
                            </div>
                            <div className={'text-center mt-10'}>
                                <ButtonMiles>
                                    Meet the team
                                </ButtonMiles>
                            </div>


                        </div>
                        {/* Services section */}
                        <div className={'my-10'}>
                            <h2 className={'h2-title-section text-center main-text-color'}>
                                We provide the following services
                            </h2>
                            <div className={'grid grid-cols-5 mt-10 gap-5'}>
                                <SimpleCard title={'Mediation'}
                                            icon={''}
                                            description={'We have more than 80 neutrals on our panel with different areas of expertise.'}/>
                                <SimpleCard title={'Mediation'}
                                            description={'We have more than 80 neutrals on our panel with different areas of expertise.'}/>
                                <SimpleCard title={'Mediation'}
                                            description={'We have more than 80 neutrals on our panel with different areas of expertise.'}/>
                                <SimpleCard title={'Mediation'}
                                            description={'We have more than 80 neutrals on our panel with different areas of expertise.'}/>
                                <SimpleCard title={'Mediation'}
                                            description={'We have more than 80 neutrals on our panel with different areas of expertise.'}/>
                            </div>
                            <p className={'text-sm mt-10'}>
                                Miles is the fastest-growing ADR provider with offices in Atlanta, Birmingham,
                                Charlotte, Columbia, Houston, Jacksonville, Nashville, Palm Beach, Tampa, Savannah, and
                                St. Louis.
                            </p>
                        </div>
                        <div className={'grid grid-cols-2 mt-60 gap-5'}>
                            <div className={'flex flex-col justify-center'}>
                                <div>

                                    <h2 className={'h2-title-section main-text-color mb-5'}>
                                        Mission Statement
                                    </h2>
                                    <p>
                                        We are reimagining the sphere of alternative dispute resolution for clients who
                                        deserve
                                        better than the traditional legal process, and to guide and empower parties in
                                        conflict
                                        toward successful resolution

                                    </p>
                                </div>
                            </div>
                            <div>
                                <video
                                    controls
                                    loop
                                    muted
                                    playsInline
                                    className=" w-full h-full object-cover z-0"
                                    poster="/heroBanner.png"
                                >
                                    <source src="/videos/2818564-hd_1920_1080_24fps.mp4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                        </div>
                        <div className={'p-10 bg-[var(--color-dark-green)] mt-10 w-full text-white text-center'}>
                            <p>
                                Whether you need to schedule a mediation, book an arbitration, are interested in
                                learning more about our Workplace Division, or simply have a question about our firm
                                and how we can help you, reach out to our support team
                                <br/>
                                <span
                                    className={'font-bold'}> 888.305.3553</span> or <a
                                href="mailto:support@milesadr.com"
                                className={'font-bold underline'}>support@milesadr.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <CallToAction/>
            <Footer/>
        </>
    )
}