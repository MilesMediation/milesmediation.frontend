import NeutralCard from "@/components/cards/NeutralCard";

interface sectionProps{
    title?: string;
    description?: string;
    amount?: number;
    neutrals?:Array<{
        slug: string;
        avatar: {
            url: string;
        };
        name: string;
        url: string;
    }>;
}

const descExample = 'Miles’ neutrals are experienced mediators and arbitrators with expertise in their fields. They are\n' +
    '                        experts in dispute resolution who are helping to shape the future of the ADR field with thought\n' +
    '                        leadership that includes articles, speaking engagements, and CLE classes and training. Learn more\n' +
    '                        about their background and experience here.'

export default function NeutralSection({title='Neutrals', amount, description = descExample,neutrals}:sectionProps) {

    if(!neutrals) return null

    return (
        <>
            <div className={'container mx-auto'}>
                <div className={'mb-10'}>
                    <h2 className={'font-title font-bold main-text-color uppercase mb-5'}>
                        {title}
                    </h2>
                    {description && (
                        <p className={'font-body'}>
                            {description}
                        </p>
                    )}

                </div>
                <div className={`pb-10 grid grid-cols-4 gap-5`}>
                    {neutrals.map((item, index) => (
                            <div key={index}>
                                <NeutralCard
                                    name={item.name}
                                    image={`http://localhost:1337${item.avatar?.url ? item.avatar.url : ''}`}
                                    url={`/our-panel/neutral/${item.slug}`}  />
                            </div>
                    ))}


                </div>
            </div>
        </>
    )
}