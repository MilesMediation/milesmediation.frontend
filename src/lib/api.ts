import {
    StrapiResponse,
    PageHomeData,
    ArticleData,
    OfficeData,
    PageLocationData,
    LocationData, PageAboutUsData, PageOurTeamData, ServicesSectionResponse,
} from '@/types/api';

// API Configuration
const API_BASE_URL = process.env.STRAPI_URL;
const API_TIMEOUT = 10000; // 10 seconds

// Generic API fetch function
async function fetchFromStrapi<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const fullUrl = `${API_BASE_URL}/api${endpoint}`;
    console.log(`🌐 Making request to: ${fullUrl}`);

    try {
        console.log('FULL URL CHECK', fullUrl)
        const response = await fetch(fullUrl, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        clearTimeout(timeoutId);

        console.log(`📡 Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ HTTP Error Response:`, errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`✅ Successfully fetched data from ${endpoint}`);
        return data;
    } catch (error) {
        clearTimeout(timeoutId);

        console.error(`❌ Fetch error for ${endpoint}:`, error);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            if (error.message.includes('fetch failed')) {
                throw new Error(`Connection failed to ${API_BASE_URL}. Is Strapi running?`);
            }
            throw new Error(`API request failed: ${error.message}`);
        }

        throw new Error('Unknown API error');
    }
}

// Specific API functions
export async function fetchPageHome(): Promise<StrapiResponse<PageHomeData>> {
    try {
        console.log('🔍 Fetching page-home data from Strapi...');
        const data = await fetchFromStrapi<StrapiResponse<PageHomeData>>('/page-home?populate[0]=Hero&populate[1]=Hero.featured_banner&populate[2]=Hero.buttons');
        console.log('✅ Page-home data fetched successfully:', {
            id: data.data.id,
            heroTitle: data.data.Hero?.main_title,
            heroDescription: data.data.Hero?.description,
            seoTitle: data.data.seo?.metaTitle,
            lastUpdated: data.data.updatedAt
        });
        return data;
    } catch (error) {
        console.error('❌ Error fetching page-home:', error);
        throw error;
    }
}

// Specific API functions
export async function fetchFeaturedSectionHome(): Promise<StrapiResponse<PageHomeData>> {
    try {
        console.log('🔍 Fetching page-home data from Strapi...');
        const data = await fetchFromStrapi<StrapiResponse<PageHomeData>>('/page-home?populate[0]=featured_section.bento_box.image_col.image_col');
        console.log('✅ Page-home data fetched successfully:', {
            id: data.data.id,
            heroTitle: data.data.Hero?.main_title,
            heroDescription: data.data.Hero?.description,
            seoTitle: data.data.seo?.metaTitle,
            lastUpdated: data.data.updatedAt
        });
        return data;
    } catch (error) {
        console.error('❌ Error fetching page-home:', error);
        throw error;
    }
}

export async function fetchPageLocation(): Promise<StrapiResponse<PageLocationData>> {
    try {
        console.log('🔍 Fetching page-location data from Strapi...');
        const data = await fetchFromStrapi<StrapiResponse<PageLocationData>>('/page-location');
        console.log('✅ Page-location data fetched successfully:', {
            id: data.data.id,
            pageHeaderTitle: data.data.pageHeader?.title,
            pageHeaderDescription: data.data.pageHeader?.description,
            seoTitle: data.data.seo?.metaTitle,
            lastUpdated: data.data.updatedAt
        });
        return data;
    } catch (error) {
        console.error('❌ Error fetching page-location:', error);
        throw error;
    }
}

export async function fetchPageLocationsWithOffices(): Promise<StrapiResponse<LocationData[]>> {
    try {
        console.log('🔍 Fetching locations with offices from Strapi...');
        const data = await fetchFromStrapi<StrapiResponse<LocationData[]>>('/locations?populate[offices][populate][featuredImage][populate]=*');
        console.log('✅ Locations with offices fetched successfully:', {
            count: data.data.length,
            locations: data.data.map(location => ({
                id: location.id,
                name: location.name,
                slug: location.slug,
                officesCount: location.offices.length,
                offices: location.offices.map(office => ({
                    id: office.id,
                    name: office.name,
                    slug: office.slug,
                    hasImage: !!office.featuredImage?.url
                }))
            }))
        });
        return data;
    } catch (error) {
        console.error('❌ Error fetching locations with offices:', error);
        throw error;
    }
}

export async function fetchOfficesByLocation(): Promise<OfficeData[]> {
    try {
        console.log('🔍 Fetching offices by location from Strapi...');
        const data = await fetchPageLocationsWithOffices();
        
        // Flatten all offices from all locations into a single array
        const allOffices: OfficeData[] = [];
        data.data.forEach(location => {
            allOffices.push(...location.offices);
        });
        
        console.log('✅ Offices by location fetched successfully:', {
            totalOffices: allOffices.length,
            locationsCount: data.data.length,
            offices: allOffices.map(office => ({
                id: office.id,
                name: office.name,
                slug: office.slug,
                location: data.data.find(loc => loc.offices.includes(office))?.name || 'Unknown'
            }))
        });
        
        return allOffices;
    } catch (error) {
        console.error('❌ Error fetching offices by location:', error);
        throw error;
    }
}

export async function fetchArticles(): Promise<StrapiResponse<ArticleData[]>> {
    try {
        console.log('🔍 Fetching articles from Strapi...');
        const data = await fetchFromStrapi<StrapiResponse<ArticleData[]>>('/articles');
        console.log('✅ Articles fetched successfully:', {
            count: data.data.length,
            articles: data.data.map(article => ({
                id: article.id,
                title: article.title,
                slug: article.slug,
                publishedAt: article.publishedAt
            }))
        });
        return data;
    } catch (error) {
        console.error('❌ Error fetching articles:', error);
        throw error;
    }
}

export async function fetchOffices(): Promise<StrapiResponse<OfficeData[]>> {
    try {
        console.log('🔍 Fetching offices from Strapi...');
        const data = await fetchFromStrapi<StrapiResponse<OfficeData[]>>('/offices?populate=*');
        console.log('✅ Offices fetched successfully:', {
            count: data.data.length,
            offices: data.data.map(office => ({
                id: office.id,
                name: office.name,
                slug: office.slug,
                available: office.available
            }))
        });
        return data;
    } catch (error) {
        console.error('❌ Error fetching offices:', error);
        throw error;
    }
}

export async function fetchServices(): Promise<StrapiResponse<ServicesSectionResponse>> {
    try {
        console.log('🔍 Fetching services from Strapi...');
        const data = await fetchFromStrapi<StrapiResponse<ServicesSectionResponse>>('/page-home?populate[0]=services_section.services_list.featured_image&populate[1]=services_section.services_list.button');
        console.log('✅ Services fetched successfully:', {
            services: data.data
        });
        return data;
    } catch (error) {
        console.error('❌ Error fetching services:', error);
        throw error;
    }
}

export interface HomePageDataErrors {
    pageHome: unknown;
    articles: unknown;
    offices: unknown;
    services: unknown;
    featured: unknown;
}

export interface HomePageDataResult {
    pageHome: StrapiResponse<PageHomeData> | null;
    articles: StrapiResponse<ArticleData[]> | null;
    offices: StrapiResponse<OfficeData[]> | null;
    services: StrapiResponse<ServicesSectionResponse> | null;
    featured: StrapiResponse<PageHomeData> | null;
    errors: HomePageDataErrors;
}

// Combined data fetching for home page
export async function fetchHomePageData(): Promise<HomePageDataResult> {
    console.log('🚀 Starting to fetch all home page data...');
    console.log(`🔧 Using API_BASE_URL: ${API_BASE_URL}`);

    try {
        const [pageHome, articles, offices, services, featured] = await Promise.allSettled([
            fetchPageHome(),
            fetchArticles(),
            fetchOffices(),
            fetchServices(),
            fetchFeaturedSectionHome()
        ]);

        const result = {
            pageHome: pageHome.status === 'fulfilled' ? pageHome.value : null,
            articles: articles.status === 'fulfilled' ? articles.value : null,
            offices: offices.status === 'fulfilled' ? offices.value : null,
            services: services.status === 'fulfilled' ? services.value : null,
            featured: featured.status === 'fulfilled' ? featured.value : null,
            errors: {
                pageHome: pageHome.status === 'rejected' ? pageHome.reason : null,
                articles: articles.status === 'rejected' ? articles.reason : null,
                offices: offices.status === 'rejected' ? offices.reason : null,
                services: services.status === 'rejected' ? services.reason : null,
                featured: featured.status === 'rejected' ? featured.reason : null,
            }
        };

        console.log('📊 Home page data fetch completed:', {
            pageHome: result.pageHome ? '✅ Success' : '❌ Failed',
            articles: result.articles ? '✅ Success' : '❌ Failed',
            offices: result.offices ? '✅ Success' : '❌ Failed',
            services: result.services ? '✅ Success' : '❌ Failed',
            featured: result.featured ? '✅ Success' : '❌ Failed'
        });

        // Log any errors for debugging
        if (result.errors.pageHome) {
            console.error('❌ Page Home Error:', result.errors.pageHome);
        }
        if (result.errors.articles) {
            console.error('❌ Articles Error:', result.errors.articles);
        }
        if (result.errors.offices) {
            console.error('❌ Offices Error:', result.errors.offices);
        }
        if (result.errors.services) {
            console.error('❌ Offices Error:', result.errors.services);
        }
        if (result.errors.featured) {
            console.error('❌ Offices Error:', result.errors.featured);
        }

        return result;
    } catch (error) {
        console.error('❌ Critical error in fetchHomePageData:', error);
        throw error;
    }
}


// Data fetching for About Us page
export async function fetchAboutUsPageData() {
    try {
        return await fetchFromStrapi<StrapiResponse<PageAboutUsData>>('/page-about-us?populate[page_header][populate]=*&populate[metadata][populate]=*');
    } catch (error) {
        console.error('❌ Error fetching page-about-us:', error);
        throw error;
    }
}

// Data fetching for our Team Page
export async function fetchOurTeamPageData() {
    try {
        return await fetchFromStrapi<StrapiResponse<PageOurTeamData>>('/page-our-team?populate[page_header][populate]=*&populate[metadata][populate]=*');
    } catch (error) {
        console.error('❌ Error fetching page-about-us:', error);
        throw error;
    }
}

// /members?filters[slug][$eq]=${slug_data.slug}&populate[avatar][populate]=*&populate[member_category][fields][0]=title&populate=posts
// Data fetching for our Team Page
export async function fetchLocationsByTag(tag: string) {

    try {
        return await fetchFromStrapi<StrapiResponse<PageOurTeamData>>(`/locations?filters[slug][$eq]=${tag}&populate[metadata][populate]=*&populate[offices][populate]=*&populate[articles][populate]=*`);
    } catch (error) {
        console.error('❌ Error fetching page-about-us:', error);
        throw error;
    }
}



// Generic data fetching function for custom pages
export async function customPageData<T>(endpoint: string): Promise<StrapiResponse<T>> {
    try {
        return await fetchFromStrapi<StrapiResponse<T>>(endpoint);
    } catch (error) {
        console.error('❌ Error fetching custom page data:', error);
        throw error;
    }
}
