"use client"

import * as React from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

/*const components: { title: string; href: string; description?: string }[] = [
    {
        title: "Neutrals",
        href: "/neutrals",
    },{
        title: "Mediation",
        href: "/neutrals",
    },{
        title: "Arbitration",
        href: "/neutrals",
    },
]*/

export function NavigationMenuDemo() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>

                {/* Home Menu */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Our panel section */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Our Panel</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/our-panel">Our Panel</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/our-panel/mediators">Mediators</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/our-panel/arbitrators">Arbitratration</Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/*<NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/locations">Locations</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>*/}

                {/* Locations Menu*/}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/locations">Locations</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {/*<NavigationMenuItem>
                    <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                        href="/locations"
                                    >
                                        <div className="mt-4 mb-2 text-lg font-medium">
                                            Locations
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-tight">
                                            N/A
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/locations" title="Locations">
                                Locations landing page
                            </ListItem>
                            <ListItem href="/locations/offices" title="Offices">
                                List of Offices page
                            </ListItem>
                            <ListItem href="/locations/offices/office-detail" title="Installation">
                                Detail page of an office
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>*/}

                {/* Practices Areas Menu*/}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/practice-area">Practice Areas</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Blogs menu*/}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Blogs & Events</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/blog">Blog</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/blog/articles">Articles</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/blog/category/events">Events</Link>
                                </NavigationMenuLink>

                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About us menu*/}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/about-us">About us</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* With Icon Menu*/}
                {/*<NavigationMenuItem>
                    <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <CircleHelpIcon />
                                        Backlog
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <CircleIcon />
                                        To Do
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <CircleCheckIcon />
                                        Done
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>*/}


            </NavigationMenuList>
        </NavigationMenu>
    );
}
