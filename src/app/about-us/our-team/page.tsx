import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
import NeutralCard from "@/components/cards/NeutralCard";

export default function Page(){


    return(
        <>
            <MainNavigation />
            <PageHeader title='Meet our team' />
            <main className="container mx-auto py-10">
                <div className="grid grid-cols-10 gap-4">

                    <aside className="col-span-2">
                        <h4 className={'font-title text-xl font-bold main-text-color uppercase'}>Categories</h4>
                        <ul className={` list-inside`}>
                            <li className={'flex border-b border-cyan-950/10 py-5'}>Cagetegory 1 </li>
                            <li className={'flex border-b border-cyan-950/10 py-5'}>Cagetegory 2</li>
                            <li className={'flex border-b border-cyan-950/10 py-5'}>Cagetegory 3</li>
                            <li className={'flex border-b border-cyan-950/10 py-5'}>Cagetegory 4</li>
                        </ul>

                    </aside>
                    <div className="hidden col-span-8 md:block relative z-50">
                        <div className={'flex flex-row flex-wrap'}>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div key={index} className={`w-1/3 p-4`}>
                                    <NeutralCard
                                        url={''}
                                        image={'/neutrals/audrey.png'}
                                        name={'John Miles'}
                                        buttonLabel={'See more'}
                                        subTitle={'CEO'}
                                    />
                                    {/*<CardComponent   name={testData.name} url={testData.url} size={testData.size} />*/}
                                </div>

                            ))}
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}