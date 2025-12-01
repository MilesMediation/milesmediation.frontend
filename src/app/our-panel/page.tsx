'use client'

import MainNavigation from "@/components/global/MainNavigation";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import PageHeader from "@/components/global/PageHeader";
import NeutralCard from "@/components/cards/NeutralCard";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";
import useSWR from 'swr';
import { useState, useMemo, Key} from 'react';
import {User, X} from 'lucide-react';

// Import Azure component (commented/disabled)
// import AzureNeutralsSection from './components/AzureNeutralsSection';

// URL Neutral Strapi
const STRAPI_NEUTRAL_ENDPOINT = '/api/neutrals?fields[0]=slug&fields[1]=name&populate[avatar][fields][0]=url';

const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())

/* ============================================
   AZURE CODE - MOVED TO COMPONENT (COMMENTED)
   ============================================
   
   // Azure API interface - updated to match actual response structure
   interface AzureNeutral {
       neutral_id: number;
       neutral_name: string;
       info: {
           profile: string;
           email: string;
           phone: string;
           tier: string;
           is_elite: boolean;
           is_arbitrator: boolean;
           practice_areas: string[];
           locations: string[];
       };
   }
   
   type AzureNeutralsResponse = AzureNeutral[];
   
   const DEFAULT_NEUTRAL_IMAGE = "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
   
   const azureFetcher = async (url: string) => {
       const response = await fetch(url, {
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${AUTH_TOKEN}`,
           },
       });
       if (!response.ok) {
           throw new Error(`Azure API GET failed: ${response.status}`);
       }
       return response.json();
   };
   
   // All Azure logic has been moved to: ./components/AzureNeutralsSection.tsx
   // To use Azure, uncomment the import above and add: <AzureNeutralsSection />
   ============================================ */

export default function Page() {
    const [nameFilter, setNameFilter] = useState('');

    // Fetch Strapi data
    const {
        data: dataStrapi,
        error: errorStrapi,
        isLoading: isLoadingStrapi
    } = useSWR(`${NEXT_URL_BACKOFFICE}${STRAPI_NEUTRAL_ENDPOINT}`, fetcher)
    // NEXT_URL_BACKOFFICE = localhost:1337
    // '/api/neutrals?fields[0]=slug&fields[1]=name&populate[avatar][fields][0]=url';

    // Filter Strapi neutrals by name
    const filteredNeutrals = useMemo(() => {
        if (!dataStrapi?.data) return [];
        
        if (!nameFilter) return dataStrapi.data;
        
        return dataStrapi.data.filter((neutral: { name: string }) => 
            neutral.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }, [dataStrapi, nameFilter]);

    // Handle name filter
    const handleNameFilter = (name: string) => {
        setNameFilter(name);
    };

    // Clear all filters
    const clearAllFilters = () => {
        setNameFilter('');
    };

    console.log('DATA TESTING: ', dataStrapi);

    // Show loading state
    if (isLoadingStrapi) {
        return (
            <div className="bg-white text-gray-800 space-y-12">
                <MainNavigation/>
                <PageHeader/>
                <div className="container mx-auto py-20 text-center">
                    <div className="text-2xl font-bold mb-4">Loading neutrals...</div>
                    <div className="text-gray-600">Please wait while we fetch the data</div>
                </div>
                <Footer/>
            </div>
        );
    }

    // Show error state
    if(errorStrapi){
        return (
            <div className="bg-white text-gray-800 space-y-12">
                <MainNavigation/>
                <PageHeader/>
                <div className="container mx-auto py-20 text-center">
                    <div className="text-xl font-bold mb-4 text-red-600">Error loading neutrals</div>
                    <div className="text-gray-600 mb-4">{errorStrapi.message || 'An error occurred while fetching data'}</div>
                </div>
                <Footer/>
            </div>
        )
    }

    return (
        <div className="bg-white text-gray-800 space-y-12">
            <MainNavigation/>
            <PageHeader
                classname={'h-[450px] md:h-[550px]'}
                title={'Our Panel'}
            />
            <section className="w-full py-[100px] px-4 bg-cover bg-center relative mb-0">
                {/* Content */}
                <div className="container mx-auto">
                    <div
                        className="relative z-10 mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="font-title text-3xl md:text-4xl uppercase font-bold mb-4">Neutrals</h2>
                            <p className="font-body">
                                Miles&apos; neutrals are experienced
                                mediators and arbitrators with expertise in their fields. They are experts in dispute
                                resolution who are helping to shape the future of the ADR field with thought leadership
                                that includes articles, speaking engagements, and CLE classes and training. Learn more
                                about their background and experience here.
                            </p>
                        </div>
                    </div>

                    {/* Filters Section - Simplified for Strapi (only name filter) */}
                    <div className="py-8">
                        <div className="flex flex-col space-y-4">
                            <h3 className="text-lg font-title uppercase font-bold">Filters</h3>

                            <div className="flex flex-wrap gap-4 items-start">
                                {/* Name Filter */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                        <input
                                            type="text"
                                            placeholder="Enter neutral name..."
                                            value={nameFilter}
                                            onChange={(e) => handleNameFilter(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)] focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Clear Filter Button */}
                                {nameFilter && (
                                    <div className="flex items-end">
                                        <button
                                            onClick={clearAllFilters}
                                            className="px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200"
                                        >
                                            Clear Filter
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Active Filter Display */}
                            {nameFilter && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-dark-green)] text-white">
                                        Name: {nameFilter}
                                        <button
                                            onClick={clearAllFilters}
                                            className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors duration-150"
                                            aria-label="Remove name filter"
                                        >
                                            <X className="h-3 w-3"/>
                                        </button>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Azure Section - Commented out, moved to component */}
                    {/* <AzureNeutralsSection /> */}

                    {/* Strapi Data Section */}
                    <div className="py-10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-title uppercase font-bold">
                                {filteredNeutrals.length > 0 ? `${filteredNeutrals.length} Neutrals Found` : 'No Neutrals Found'}
                            </h3>
                        </div>
                        
                        {filteredNeutrals.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                                {filteredNeutrals.map((neutral: { id: Key | null | undefined; avatar: { url: string; }; name: string; slug: string; }) => (
                                    <div key={neutral.id}>
                                        <NeutralCard
                                            image={NEXT_URL_BACKOFFICE + neutral.avatar?.url || '/neutrals/placeholder.png'}
                                            name={neutral.name}
                                            url={`/our-panel/neutral/${neutral.slug}`}
                                            buttonLabel="View profile"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">
                                    {nameFilter 
                                        ? 'No neutrals found matching your search. Try adjusting your search criteria.' 
                                        : 'No neutrals found'
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Azure Data Section - Commented out, moved to component */}
                    {/* 
                        All Azure functionality has been moved to: ./components/AzureNeutralsSection.tsx
                        To use Azure data instead of Strapi:
                        1. Uncomment the import at the top: import AzureNeutralsSection from './components/AzureNeutralsSection';
                        2. Uncomment the line below and comment out the Strapi section above
                        3. <AzureNeutralsSection />
                    */}
                </div>
            </section>
            <CallToAction/>
            <Footer/>
        </div>
    );
}