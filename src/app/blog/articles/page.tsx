import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";
/*import CardComponent from "@/components/cards/CardComponent";*/
import CardComponent from "@/components/flowbite/CardComponent";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {ChevronRight} from "lucide-react";
import Footer from "@/components/global/Footer";

/*
const testData : {name:string; url: string; size: 'sm'| 'md' | 'lg'}= {
    name: 'The Current State of Non-Competes: How the Recent FTC Rule Affects Missouri Employment Attorneys',
    url: '/',
    size:'lg'
}
*/


export default function Page(){


    return(
        <>
            <MainNavigation/>
            <PageHeader title={'Articles'}
                        description={'Our diverse legal expertise, consistently high-touch administrative support, ' +
                            'and dedication to our clients and neutrals can be summed up in the following words: ' +
                            'the Miles Mediation experience is “Miles Above the Rest.”'}
            />
            <main className="container mx-auto py-10">
                <div className="grid grid-cols-10 gap-4">

                    <aside className="col-span-2">
                        <h4 className={'font-title text-xl font-bold main-text-color uppercase'}>Categories</h4>
                        <ul className={` list-inside`}>
                            <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 1 </li>
                            <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 2</li>
                            <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 3</li>
                            <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 4</li>
                        </ul>
                        <div className="mt-10">
                            <h4 className={'font-title text-xl font-bold main-text-color uppercase'}>More</h4>
                            <ul className={` list-inside`}>
                                <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 1 </li>
                                <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 2</li>
                                <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 3</li>
                                <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 4</li>
                            </ul>
                        </div>
                    </aside>
                    <div className="hidden col-span-8 md:block relative z-50">
                        <div className={'flex flex-row flex-wrap'}>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div key={index} className={`w-1/3 p-4`}>
                                    <CardComponent />
                                    {/*<CardComponent   name={testData.name} url={testData.url} size={testData.size} />*/}
                                </div>

                            ))}
                            <Pagination className={'text-cyan-600 text-left mt-5'}>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}