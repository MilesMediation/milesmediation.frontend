import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SeoData } from '@/types/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function defaulMetadataResponse(metadata_response: SeoData | null | undefined) {
    if (metadata_response) {
        return {
            title: metadata_response?.metaTitle || "Miles Mediation - Miles Above the Rest",
            description: metadata_response?.metaDescription || "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.",
            keywords: metadata_response?.keywords || "mediation, arbitration, ADR, dispute resolution, legal services",
            robots: metadata_response?.metaRobots || "index, follow",
            viewport: metadata_response?.metaViewport || "width=device-width, initial-scale=1",
            openGraph: {
                title: metadata_response?.metaTitle ||  "Miles Mediation",
                description: metadata_response?.metaDescription,
                type: "website",
                locale: "en_US",
            },
            twitter: {
                card: "summary_large_image",
                title: metadata_response?.metaTitle || "Miles Mediation",
                description: metadata_response?.metaDescription,
            },
            alternates: {
                canonical: metadata_response?.canonicalURL || "https://milesmediation.com",
            },
        };
    }

    // Return default metadata if no response provided
    return {
        title: "Miles Mediation - Miles Above the Rest",
        description: "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.",
        keywords: "mediation, arbitration, ADR, dispute resolution, legal services",
        robots: "index, follow",
        viewport: "width=device-width, initial-scale=1",
        openGraph: {
            title: "Miles Mediation",
            description: "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.",
            type: "website",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: "Miles Mediation",
            description: "Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest.",
        },
        alternates: {
            canonical: "https://milesmediation.com",
        },
    };
}



export const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json())