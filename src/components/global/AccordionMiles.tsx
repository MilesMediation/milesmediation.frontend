'use client'



import AccordionItem from "@/components/ui/AccordionItems";




export function AccordionMiles() {

    
    
    return (
        <>
            <div className="mx-auto">
                <AccordionItem
                    title="Admitted to Practice"
                    headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                    bodyClassName="text-gray-700 "
                >
                    Material Tailwind is a UI library that combines Tailwind CSS with Material Design components. It&#39;s
                    customizable and built for React.
                </AccordionItem>

                <AccordionItem
                    title="Professional to trade affiliations"
                    headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                    bodyClassName="text-gray-700  px-4 py-2"
                >
                    Yes! You can pass your own classes to the header and body using the props `headerClassName` and
                    `bodyClassName`.
                </AccordionItem>

                <AccordionItem
                    title="Honors and Awards"
                    headerClassName="text-2xl text-dark font-semibold border-bottom border-b-gray-300"
                    bodyClassName="text-gray-700 text-normal px-2 py-4"
                >
                    Yes! You can pass your own classes to the header and body using the props `headerClassName` and
                    `bodyClassName`.
                </AccordionItem>
            </div>
        </>
    );
}