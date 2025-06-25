import NeutralCard from "@/components/cards/NeutralCard";

export default function NeutralSection() {


    return (
        <>
            <div className={'container mx-auto pb-40'}>
                <div className={'mb-10'}>
                    <h2 className={'font-title font-bold main-text-color uppercase mb-5'}>
                        Neutrals
                    </h2>
                    <p className={'font-body'}>
                        Miles’ neutrals are experienced mediators and arbitrators with expertise in their fields. They are
                        experts in dispute resolution who are helping to shape the future of the ADR field with thought
                        leadership that includes articles, speaking engagements, and CLE classes and training. Learn more
                        about their background and experience here.
                    </p>
                </div>
                <div className={`pb-10 grid grid-cols-4 gap-5`}>
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />
                    <NeutralCard name={'Sally ANkins'} image={'/neutrals/sally.png'} url={'/'}  />

                </div>
            </div>
        </>
    )
}