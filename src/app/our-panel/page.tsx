import MainNavigation from "@/components/global/MainNavigation";

import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import PageHeader from "@/components/global/PageHeader";
import NeutralCard from "@/components/cards/NeutralCard";

const neutrals = [
    { name: 'Sally Ankins', image: '/neutrals/sally.png', url: '/offices/atlanta' },
    { name: 'Leah Albert', image: '/neutrals/leah.png', url: '/offices/boston' },
    { name: 'William Atkins', image: '/neutrals/william.png', url: '/offices/birmingham' },
    { name: 'John Austin', image: '/neutrals/john.png', url: '/offices/chicago' },

    { name: 'Ron Bankston', image: '/neutrals/ron.png', url: '/offices/chicago' },
    { name: 'Marc Barré', image: '/neutrals/marc.png', url: '/offices/chicago' },
    { name: 'Todd Bechtel', image: '/neutrals/todd.png', url: '/offices/chicago' },
    { name: 'Audrey Berland', image: '/neutrals/audrey.png', url: '/offices/chicago' },
]


export default function Page() {
    return (
        <div className="bg-white text-gray-800 space-y-12">
            <MainNavigation/>
            <PageHeader/>
            <section
                className="w-full py-[100px] px-4 bg-cover bg-center relative mb-0">
                {/* Overlay */}


                {/* Content */}
                <div className="container mx-auto">

                    <div className="relative z-10 mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="font-title text-3xl md:text-4xl uppercase font-bold mb-4">Neutrals</h2>
                            <p className="font-body">
                                Miles’ neutrals are experienced
                                mediators and arbitrators with expertise in their fields. They are experts in dispute
                                resolution who are helping to shape the future of the ADR field with thought leadership
                                that includes articles, speaking engagements, and CLE classes and training. Learn more
                                about their background and experience here.
                            </p>
                        </div>

                    </div>
                    <div className={`py-10 grid grid-cols-4 gap-10`}>
                        <NeutralCard image={neutrals[0].image} name={neutrals[0].name} url={neutrals[0].url}  />
                        <NeutralCard image={neutrals[1].image} name={neutrals[1].name} url={neutrals[1].url}  />
                        <NeutralCard image={neutrals[2].image} name={neutrals[2].name} url={neutrals[2].url}  />
                        <NeutralCard image={neutrals[3].image} name={neutrals[3].name} url={neutrals[3].url}  />
                        <NeutralCard image={neutrals[4].image} name={neutrals[4].name} url={neutrals[4].url}  />
                        <NeutralCard image={neutrals[5].image} name={neutrals[5].name} url={neutrals[5].url}  />
                        <NeutralCard image={neutrals[6].image} name={neutrals[6].name} url={neutrals[6].url}  />
                        <NeutralCard image={neutrals[7].image} name={neutrals[7].name} url={neutrals[7].url}  />
                        <NeutralCard image={neutrals[0].image} name={neutrals[0].name} url={neutrals[0].url}  />
                        <NeutralCard image={neutrals[1].image} name={neutrals[1].name} url={neutrals[1].url}  />
                        <NeutralCard image={neutrals[2].image} name={neutrals[2].name} url={neutrals[2].url}  />
                        <NeutralCard image={neutrals[3].image} name={neutrals[3].name} url={neutrals[3].url}  />

                    </div>
                </div>
            </section>
            <CallToAction/>
            <Footer/>

        </div>
    );
}
