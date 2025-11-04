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

export default function Page() {
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
        azureFetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

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

    // Reset to first page when filters change
    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    // Handle practice area filter
    const handlePracticeAreaFilter = (practiceArea: string | null) => {
        setSelectedPracticeArea(practiceArea);
        setIsPracticeAreaOpen(false);
        setPracticeAreaSearch('');
        handleFilterChange();
    };

    // Handle location filter
    const handleLocationFilter = (location: string | null) => {
        setSelectedLocation(location);
        setIsLocationOpen(false);
        setLocationSearch('');
        handleFilterChange();
    };

    // Handle name filter
    const handleNameFilter = (name: string) => {
        setNameFilter(name);
        handleFilterChange();
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedPracticeArea(null);
        setSelectedLocation(null);
        setNameFilter('');
        setCurrentPage(1);
    };

    // Close filter dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsPracticeAreaOpen(false);
                setPracticeAreaSearch('');
            }
            if (locationFilterRef.current && !locationFilterRef.current.contains(event.target as Node)) {
                setIsLocationOpen(false);
                setLocationSearch('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Show loading state only for Azure data
    if (azureLoading) {
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
                    <div className="relative z-10 mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
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
                    
                    {/* Enhanced Filters Section - Left Aligned */}
                    <div className="py-8">
                        <div className="flex flex-col space-y-4">
                            <h3 className="text-lg font-title uppercase font-bold">Filters</h3>
                            
                            <div className="flex flex-wrap gap-4 items-start">
                                {/* Name Filter */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter neutral name..."
                                            value={nameFilter}
                                            onChange={(e) => handleNameFilter(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)] focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Practice Area Filter */}
                                <div className="flex-1 min-w-[200px]" ref={filterRef}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Practice Area</label>
                                    <div className="relative">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsPracticeAreaOpen(!isPracticeAreaOpen)}
                                            className="w-full justify-between border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                                        >
                                            <span className="truncate">
                                                {selectedPracticeArea || 'All Practice Areas'}
                                            </span>
                                            <ChevronDown 
                                                className={`h-4 w-4 transition-transform duration-200 ${
                                                    isPracticeAreaOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </Button>
                                        
                                        {/* Practice Area Dropdown */}
                                        {isPracticeAreaOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
                                                {/* Search Input */}
                                                <div className="p-3 border-b border-gray-100">
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search practice areas..."
                                                            value={practiceAreaSearch}
                                                            onChange={(e) => setPracticeAreaSearch(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)] focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {/* Practice Areas List */}
                                                <div className="max-h-40 overflow-y-auto">
                                                    <button
                                                        onClick={() => handlePracticeAreaFilter(null)}
                                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
                                                    >
                                                        <span className="text-gray-600 font-medium">All Practice Areas</span>
                                                    </button>
                                                    {filteredPracticeAreas.map((area) => (
                                                        <button
                                                            key={area}
                                                            onClick={() => handlePracticeAreaFilter(area)}
                                                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                                                        >
                                                            <span className="text-[var(--color-dark-green)] font-medium">
                                                                {area}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Location Filter */}
                                <div className="flex-1 min-w-[200px]" ref={locationFilterRef}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <div className="relative">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsLocationOpen(!isLocationOpen)}
                                            className="w-full justify-between border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                                        >
                                            <span className="truncate">
                                                {selectedLocation || 'All Locations'}
                                            </span>
                                            <ChevronDown 
                                                className={`h-4 w-4 transition-transform duration-200 ${
                                                    isLocationOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </Button>
                                        
                                        {/* Location Dropdown */}
                                        {isLocationOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
                                                {/* Search Input */}
                                                <div className="p-3 border-b border-gray-100">
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search locations..."
                                                            value={locationSearch}
                                                            onChange={(e) => setLocationSearch(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-green)] focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {/* Locations List */}
                                                <div className="max-h-40 overflow-y-auto">
                                                    <button
                                                        onClick={() => handleLocationFilter(null)}
                                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
                                                    >
                                                        <span className="text-gray-600 font-medium">All Locations</span>
                                                    </button>
                                                    {filteredLocations.map((location) => (
                                                        <button
                                                            key={location}
                                                            onClick={() => handleLocationFilter(location)}
                                                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                                                        >
                                                            <span className="text-[var(--color-dark-green)] font-medium">
                                                                {location}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Clear All Filters Button */}
                                {(selectedPracticeArea || selectedLocation || nameFilter) && (
                                    <div className="flex items-end">
                                        <Button
                                            variant="ghost"
                                            onClick={clearAllFilters}
                                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
                                        >
                                            Clear All
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Active Filters Display */}
                            {(selectedPracticeArea || selectedLocation || nameFilter) && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedPracticeArea && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-dark-green)] text-white">
                                            Practice: {selectedPracticeArea}
                                            <button
                                                onClick={() => handlePracticeAreaFilter(null)}
                                                className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors duration-150"
                                                aria-label="Remove practice area filter"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedLocation && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-dark-green)] text-white">
                                            Location: {selectedLocation}
                                            <button
                                                onClick={() => handleLocationFilter(null)}
                                                className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors duration-150"
                                                aria-label="Remove location filter"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}
                                    {nameFilter && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-dark-green)] text-white">
                                            Name: {nameFilter}
                                            <button
                                                onClick={() => handleNameFilter('')}
                                                className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors duration-150"
                                                aria-label="Remove name filter"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Strapi Data Section - Hidden */}
                    {/* <div className="py-10">
                        <h3 className="text-2xl font-title uppercase font-bold mb-6 text-center">Strapi Neutrals</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {mockStrapiNeutrals.map((neutral) => (
                                <div key={neutral.id}>
                                    <NeutralCard
                                        image={neutral.avatar?.url || '/neutrals/placeholder.png'}
                                        name={neutral.name}
                                        url={`/our-panel/neutral/${neutral.slug}`}
                                        buttonLabel="View profile"
                                    />
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Azure Data Section */}
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
                        
                        {azureError && (
                            <div className="text-center py-10">
                                <div className="text-xl font-bold mb-4 text-red-600">Error loading neutrals</div>
                                <div className="text-gray-600 mb-4">{azureError.message}</div>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Retry
                                </button>
                            </div>
                        )}
                        
                        {currentNeutrals.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                </div>
            </section>
            <CallToAction/>
            <Footer/>
        </div>
    );
}