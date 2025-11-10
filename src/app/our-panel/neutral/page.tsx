'use client'

import MainNavigation from "@/components/global/MainNavigation";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import PageHeader from "@/components/global/PageHeader";
import NeutralCard from "@/components/cards/NeutralCard";
import {AZURE_API_URL, AUTH_TOKEN} from "@/lib/globalConstants";
import useSWR from 'swr';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDown, Search, MapPin, User, X } from 'lucide-react';

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

export default function NeutralListPage() {
    const [selectedPracticeArea, setSelectedPracticeArea] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [nameFilter, setNameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isPracticeAreaOpen, setIsPracticeAreaOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [practiceAreaSearch, setPracticeAreaSearch] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const itemsPerPage = 12; // Show 12 neutrals per page (3 rows of 4)
    const filterRef = useRef<HTMLDivElement>(null);
    const locationFilterRef = useRef<HTMLDivElement>(null);

    // Fetch Azure data using SWR
    const { data: azureData, error: azureError, isLoading: azureLoading } = useSWR<AzureNeutralsResponse>(
        `${AZURE_API_URL}/neutrals/list`,
        azureFetcher
    );

    // Extract unique practice areas and locations from the data
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

    // Filter and paginate the data
    const filteredNeutrals = useMemo(() => {
        if (!azureData) return [];
        
        return azureData.filter(neutral => {
            const matchesName = neutral.neutral_name.toLowerCase().includes(nameFilter.toLowerCase());
            const matchesPracticeArea = !selectedPracticeArea || 
                (neutral.info?.practice_areas && neutral.info.practice_areas.includes(selectedPracticeArea));
            const matchesLocation = !selectedLocation || 
                (neutral.info?.locations && neutral.info.locations.includes(selectedLocation));
            
            return matchesName && matchesPracticeArea && matchesLocation;
        });
    }, [azureData, nameFilter, selectedPracticeArea, selectedLocation]);

    const paginatedNeutrals = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredNeutrals.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredNeutrals, currentPage]);

    const totalPages = Math.ceil(filteredNeutrals.length / itemsPerPage);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsPracticeAreaOpen(false);
            }
            if (locationFilterRef.current && !locationFilterRef.current.contains(event.target as Node)) {
                setIsLocationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [nameFilter, selectedPracticeArea, selectedLocation]);

    if (azureLoading) {
        return (
            <div className="bg-white text-gray-800">
                <MainNavigation />
                <div className="container mx-auto py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-dark-green)] mx-auto"></div>
                        <p className="mt-4 text-lg">Loading neutrals...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (azureError) {
        return (
            <div className="bg-white text-gray-800">
                <MainNavigation />
                <div className="container mx-auto py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Neutrals</h1>
                        <p className="text-gray-600">{azureError.message}</p>
                        <Button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 bg-[var(--color-dark-green)] hover:bg-[var(--color-hover-light-green)]"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-white text-gray-800">
            <MainNavigation />
            
            <PageHeader
                title="Our Neutrals"
                description="Experienced mediators and arbitrators with expertise in their fields"
                backgroundImage="/heroBanner.png"
            />

            <section className="py-16">
                <div className="container mx-auto px-6">
                    {/* Filters */}
                    <div className="mb-8 flex flex-wrap gap-4 items-center">
                        {/* Search by name */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)] focus:border-transparent"
                            />
                        </div>

                        {/* Practice Area Filter */}
                        <div className="relative" ref={filterRef}>
                            <Button
                                onClick={() => setIsPracticeAreaOpen(!isPracticeAreaOpen)}
                                variant="outlined"
                                className="flex items-center gap-2"
                            >
                                <User size={16} />
                                {selectedPracticeArea || 'Practice Area'}
                                <ChevronDown size={16} />
                            </Button>
                            
                            {isPracticeAreaOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            placeholder="Search practice areas..."
                                            value={practiceAreaSearch}
                                            onChange={(e) => setPracticeAreaSearch(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        />
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                        <button
                                            onClick={() => {
                                                setSelectedPracticeArea(null);
                                                setIsPracticeAreaOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                        >
                                            All Practice Areas
                                        </button>
                                        {practiceAreas
                                            .filter(area => area.toLowerCase().includes(practiceAreaSearch.toLowerCase()))
                                            .map((area) => (
                                                <button
                                                    key={area}
                                                    onClick={() => {
                                                        setSelectedPracticeArea(area);
                                                        setIsPracticeAreaOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                                >
                                                    {area}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Location Filter */}
                        <div className="relative" ref={locationFilterRef}>
                            <Button
                                onClick={() => setIsLocationOpen(!isLocationOpen)}
                                variant="outlined"
                                className="flex items-center gap-2"
                            >
                                <MapPin size={16} />
                                {selectedLocation || 'Location'}
                                <ChevronDown size={16} />
                            </Button>
                            
                            {isLocationOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            placeholder="Search locations..."
                                            value={locationSearch}
                                            onChange={(e) => setLocationSearch(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        />
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                        <button
                                            onClick={() => {
                                                setSelectedLocation(null);
                                                setIsLocationOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                        >
                                            All Locations
                                        </button>
                                        {locations
                                            .filter(location => location.toLowerCase().includes(locationSearch.toLowerCase()))
                                            .map((location) => (
                                                <button
                                                    key={location}
                                                    onClick={() => {
                                                        setSelectedLocation(location);
                                                        setIsLocationOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                                >
                                                    {location}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Clear filters */}
                        {(selectedPracticeArea || selectedLocation || nameFilter) && (
                            <Button
                                onClick={() => {
                                    setSelectedPracticeArea(null);
                                    setSelectedLocation(null);
                                    setNameFilter('');
                                }}
                                variant="outlined"
                                className="flex items-center gap-2"
                            >
                                <X size={16} />
                                Clear Filters
                            </Button>
                        )}
                    </div>

                    {/* Results count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing {filteredNeutrals.length} of {azureData?.length || 0} neutrals
                        </p>
                    </div>

                    {/* Neutrals Grid */}
                    {paginatedNeutrals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {paginatedNeutrals.map((neutral) => (
                                    <NeutralCard
                                        key={neutral.neutral_id}
                                        name={neutral.neutral_name}
                                        image={neutral.info?.profile || DEFAULT_NEUTRAL_IMAGE}
                                        url={`/our-panel/neutral/${neutral.neutral_id}`}
                                        buttonLabel="View profile"
                                    />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No neutrals found</h3>
                            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    />
                                </PaginationItem>
                                
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <PaginationItem key={pageNum}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(pageNum)}
                                                isActive={currentPage === pageNum}
                                                className="cursor-pointer"
                                            >
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                                
                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </section>

            <CallToAction />
            <Footer />
        </div>
    );
}

