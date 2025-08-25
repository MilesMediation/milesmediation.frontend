import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";


export default function Page(){


    return(
        <>
            <MainNavigation/>
            <PageHeader title={'Events'}
                        description={'Our diverse legal expertise, consistently high-touch administrative support, ' +
                            'and dedication to our clients and neutrals can be summed up in the following words: ' +
                            'the Miles Mediation experience is “Miles Above the Rest.”'}
            />
            <main className="container mx-auto py-10">
            </main>
        </>
    )
}