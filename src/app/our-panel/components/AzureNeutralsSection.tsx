'use client'

import NeutralCard from "@/components/cards/NeutralCard";
import {AZURE_API_URL, AUTH_TOKEN} from "@/lib/globalConstants";
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

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
    // Other fields are available but not used in the card
}

// Updated to match actual API response (array directly, not wrapped in data property)
type AzureNeutralsResponse = AzureNeutral[];

// Default image for neutrals without profile images
const DEFAULT_NEUTRAL_IMAGE = "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";

// SWR fetcher for Azure API
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

export default function AzureNeutralsSection() {
    // Filter state variables (commented out - filters UI not implemented)
    // const [selectedPracticeArea, setSelectedPracticeArea] = useState<string | null>(null);
    // const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    // const [nameFilter, setNameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // const [practiceAreaSearch, setPracticeAreaSearch] = useState('');
    // const [locationSearch, setLocationSearch] = useState('');
    const itemsPerPage = 12; // Show 12 neutrals per page (3 rows of 4)
    
    // Default filter values (no filters applied)
    const selectedPracticeArea: string | null = null;
    const selectedLocation: string | null = null;
    const nameFilter: string = '';

    // Fetch Azure data using SWR
    const {data: azureData, error: azureError, isLoading: azureLoading} = useSWR<AzureNeutralsResponse>(
        `${AZURE_API_URL}/neutrals/list`, azureFetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    // Filter logic (commented out - filters UI not implemented)
    /*
    // Get unique practice areas for filtering
    const practiceAreas = useMemo(() => {
        if (!azureData) return [];
        const areas = new Set<string>();
        azureData.forEach(neutral => {
            if (neutral.info?.practice_areas) {
                neutral.info.practice_areas.forEach(area => areas.add(area));
            }
        });
        return Array.from(areas).sort();
    }, [azureData]);

    // Get unique locations for filtering
    const locations = useMemo(() => {
        if (!azureData) return [];
        const locs = new Set<string>();
        azureData.forEach(neutral => {
            if (neutral.info?.locations) {
                neutral.info.locations.forEach(location => locs.add(location));
            }
        });
        return Array.from(locs).sort();
    }, [azureData]);

    // Filter practice areas based on search term
    const filteredPracticeAreas = useMemo(() => {
        if (!practiceAreaSearch) return practiceAreas;
        return practiceAreas.filter(area => 
            area.toLowerCase().includes(practiceAreaSearch.toLowerCase())
        );
    }, [practiceAreas, practiceAreaSearch]);

    // Filter locations based on search term
    const filteredLocations = useMemo(() => {
        if (!locationSearch) return locations;
        return locations.filter(location => 
            location.toLowerCase().includes(locationSearch.toLowerCase())
        );
    }, [locations, locationSearch]);
    */

    // Filter neutrals by all criteria
    const filteredNeutrals = useMemo(() => {
        if (!azureData) return [];
        
        return azureData.filter(neutral => {
            // Practice area filter
            if (selectedPracticeArea && !neutral.info?.practice_areas?.includes(selectedPracticeArea)) {
                return false;
            }
            
            // Location filter
            if (selectedLocation && !neutral.info?.locations?.includes(selectedLocation)) {
                return false;
            }
            
            // Name filter
            if (nameFilter && !neutral.neutral_name.toLowerCase().includes(nameFilter.toLowerCase())) {
                return false;
            }
            
            return true;
        });
    }, [azureData, selectedPracticeArea, selectedLocation, nameFilter]);

    // Pagination logic
    const totalPages = Math.ceil(filteredNeutrals.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNeutrals = filteredNeutrals.slice(startIndex, endIndex);
    /*
       // Reset to first page when filters change
       const handleFilterChange = () => {
           setCurrentPage(1);
       };

      // Handle practice area filter
       const handlePracticeAreaFilter = (practiceArea: string | null) => {
           setSelectedPracticeArea(practiceArea);
           handleFilterChange();
       };

       // Handle location filter
       const handleLocationFilter = (location: string | null) => {
           setSelectedLocation(location);
           handleFilterChange();
       };

       // Handle name filter
       const handleNameFilter = (name: string) => {
           setNameFilter(name);
           handleFilterChange();
       };*/

    // Show loading state
    if (azureLoading) {
        return (
            <div className="py-10">
                <div className="text-center">
                    <div className="text-2xl font-bold mb-4">Loading neutrals...</div>
                    <div className="text-gray-600">Please wait while we fetch the data</div>
                </div>
            </div>
        );
    }

    // Show error state
    if (azureError) {
        return (
            <div className="py-10">
                <div className="text-center">
                    <div className="text-xl font-bold mb-4 text-red-600">Error loading neutrals</div>
                    <div className="text-gray-600 mb-4">{azureError.message}</div>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-title uppercase font-bold">
                    {filteredNeutrals.length > 0 ? `${filteredNeutrals.length} Neutrals Found` : 'No Neutrals Found'}
                </h3>
                {filteredNeutrals.length > 0 && (
                    <p className="text-gray-600">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredNeutrals.length)} of {filteredNeutrals.length} neutrals
                    </p>
                )}
            </div>
            
            {currentNeutrals.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {currentNeutrals.map((item) => (
                            <div 
                                key={item.neutral_id}
                                className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg"
                            >
                                <NeutralCard
                                    image={item.info?.profile || DEFAULT_NEUTRAL_IMAGE}
                                    name={item.neutral_name}
                                    url={`/our-panel/neutral/${item.neutral_id}`}
                                    subTitle={item.info?.email}
                                    buttonLabel="View profile"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <Pagination>
                                <PaginationContent className="gap-2">
                                    <PaginationItem>
                                        <PaginationPrevious 
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            className={`${
                                                currentPage === 1 
                                                    ? 'pointer-events-none opacity-50' 
                                                    : 'cursor-pointer hover:bg-[var(--color-dark-green)] hover:text-white'
                                            } border-[var(--color-dark-green)] text-[var(--color-dark-green)] transition-all duration-200`}
                                        />
                                    </PaginationItem>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        // Show first page, last page, current page, and pages around current
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                        ) {
                                            return (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() => setCurrentPage(page)}
                                                        isActive={currentPage === page}
                                                        className={`${
                                                            currentPage === page
                                                                ? 'bg-[var(--color-dark-green)] text-white border-[var(--color-dark-green)]'
                                                                : 'border-[var(--color-dark-green)] text-[var(--color-dark-green)] hover:bg-[var(--color-dark-green)] hover:text-white'
                                                        } cursor-pointer transition-all duration-200`}
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        } else if (
                                            page === currentPage - 2 ||
                                            page === currentPage + 2
                                        ) {
                                            return (
                                                <PaginationItem key={page}>
                                                    <PaginationEllipsis className="text-[var(--color-dark-green)]" />
                                                </PaginationItem>
                                            );
                                        }
                                        return null;
                                    })}
                                    
                                    <PaginationItem>
                                        <PaginationNext 
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            className={`${
                                                currentPage === totalPages 
                                                    ? 'pointer-events-none opacity-50' 
                                                    : 'cursor-pointer hover:bg-[var(--color-dark-green)] hover:text-white'
                                            } border-[var(--color-dark-green)] text-[var(--color-dark-green)] transition-all duration-200`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">
                        {nameFilter || selectedPracticeArea || selectedLocation 
                            ? 'No neutrals found matching your filters. Try adjusting your search criteria.' 
                            : 'No neutrals found'
                        }
                    </p>
                </div>
            )}
        </div>
    );
}

