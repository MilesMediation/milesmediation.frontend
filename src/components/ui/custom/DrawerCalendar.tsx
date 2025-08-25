"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"




export function DrawerCalendar({ events }: { events: { title: string, start: string }[] }) {




    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="default">Open Calendar</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full h-[100vh] p-10">
                    <DrawerHeader>
                        <DrawerTitle>Calendar</DrawerTitle>
                        <DrawerDescription>Manage your events.</DrawerDescription>
                    </DrawerHeader>

                    <div className="mt-3 border overflow-y-auto">
                        <FullCalendar
                            height="calc(100vh - 320px)"
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            dateClick={(arg) => {
                                console.log("Fecha clickeada:", arg.dateStr);
                            }}
                            editable={true}
                            selectable={true}
                            events={events}
                            eventContent={(arg) => {
                                const title = arg.event.title.toLowerCase();
                                const isBooked = title.includes("booked");
                                const isHoliday = title.includes("holiday");
                                
                                return (
                                    <div
                                        className={`px-1 py-0.5 font-semibold rounded w-full text-sm ${ 
                                            title == 'booked'  
                                            ? "bg-blue-600 text-white" 
                                            : "bg-red-200 text-black"}`}
                                    >
                                        {arg.event.title}
                                    </div>
                                );
                            }}
                        />
                    </div>

                    <DrawerFooter className={'flex flex-row pt-10 px-0'}>
                        <Button>Save</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

