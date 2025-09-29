'use client'

import NeutralCard from "@/components/cards/NeutralCard";
import { useState } from "react";
import useSWR from "swr";
import {NEXT_URL_BACKOFFICE, URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";
import type {  MembersResponse } from "@/types/api";

// Function to fetch data from the API
const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())

// API endpoint to get members with their categories
const FETCH_URL = `/api/members?populate[avatar][populate]=*&populate[member_category][fields][0]=title`;

/**
 * Main component for displaying team members with category filtering
 */
export default function MainContentOurTeam(){
    // Track which category is selected for filtering
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    
    // Fetch team members data from the API
    const { data: dataOurTeam, error, isLoading } = useSWR<MembersResponse>(`${URL_BACKOFFICE_DOMAIN}${FETCH_URL}`, fetcher)

    // Get the members data from the API response
    const data = dataOurTeam?.data

    // Show loading state while data is being fetched
    if (isLoading) return (
        <div>
            <div className={'h-[650px] p-60 text-center'}>
                <h1>Loading...</h1>
            </div>
        </div>
    )
    
    // Show error message if API request failed
    if (error) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>
    
    // Return null if no data is available
    if(!data) return null;

    // Get all unique category titles from members
    const categoryTitles = [...new Set(
        data
            .map((member) => member.member_category?.title)
            .filter(Boolean)
    )] as string[];

    // Filter members based on selected category
    const filteredMembers = selectedCategory 
        ? data.filter((member) => member.member_category?.title === selectedCategory)
        : data;



    return(
        <>
            <main className="container mx-auto py-10 min-h-[calc(100vh-160px)]">
                <div className="grid grid-cols-10 gap-4">
                    {/* Categories sidebar for filtering */}
                    <aside className="col-span-2">
                        <h4 className={'font-title text-xl font-bold main-text-color uppercase'}>Categories</h4>
                        <ul className={` list-inside mt-4`}>
                            {/* Show all categories option */}
                            <li 
                                className={`flex px-3 rounded-sm py-5 cursor-pointer transition-colors ${
                                    selectedCategory === null 
                                        ? 'bg-cyan-800 text-white' 
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setSelectedCategory(null)}
                            >
                                All Categories
                            </li>
                            {/* Render each category as a clickable filter option */}
                            {categoryTitles.map((categoryTitle, index) => (
                                <li 
                                    key={index} 
                                    className={`flex px-3 mt-2 rounded-sm py-5 cursor-pointer transition-colors ${
                                        selectedCategory === categoryTitle 
                                            ? 'bg-cyan-800 text-white' 
                                            : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => setSelectedCategory(categoryTitle)}
                                >
                                    {categoryTitle}
                                </li>
                            ))}
                        </ul>

                    </aside>
                    
                    {/* Team members grid */}
                    <div className="hidden col-span-8 md:block relative z-50">
                        <div className={'flex flex-row flex-wrap'}>
                            <AnimatePresence mode="wait">
                            {/* Render team member cards with animations */}
                            {filteredMembers.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className={`w-1/3 p-4`}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3}}
                                    layout
                                >
                                    {/* Team member card */}
                                    <NeutralCard
                                        url={item.slug ? 'our-team/' + item.slug : ''}
                                        image={item.avatar?.url ? NEXT_URL_BACKOFFICE + item.avatar.url : ''}
                                        name={item.name}
                                        buttonLabel={item.description}
                                        subTitle={item.member_category?.title || ''}
                                    />
                                </motion.div>

                            ))}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}