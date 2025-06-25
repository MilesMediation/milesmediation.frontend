'use client'

import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from '@material-tailwind/react'
import { useState, ReactNode } from 'react'
import { HiChevronDown } from 'react-icons/hi'

interface AccordionItemProps {
    title: string
    children: ReactNode
    defaultOpen?: boolean
    headerClassName?: string
    bodyClassName?: string
}

export default function AccordionItem({
                                          title,
                                          children,
                                          defaultOpen = false,
                                          headerClassName = '',
                                          bodyClassName = '',
                                      }: AccordionItemProps) {
    const [open, setOpen] = useState(defaultOpen)

    const handleOpen = () => setOpen((prev) => !prev)

    const customIcon = (
        <HiChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
                open ? 'rotate-180' : ''
            }`}
        />
    )


    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*  @ts-expect-error */}
            <Accordion open={open} icon={customIcon}>

                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*  @ts-expect-error */}
                <AccordionHeader onClick={handleOpen} className={headerClassName}>
                    {title}
                </AccordionHeader>
                <AccordionBody className={bodyClassName}>
                    {children}
                </AccordionBody>
            </Accordion>
        </>


)
};
