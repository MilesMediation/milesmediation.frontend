// src/app/locations/layout.tsx  (SERVER COMPONENT — no pongas "use client")
import type { Metadata, ResolvingMetadata } from "next";

type CMSSeo =
    | {
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string | string[] | null;
    metaRobots?: string | null;
    canonicalURL?: string | null;
}
    | null
    | undefined;

function toKeywordsArray(k?: string | string[] | null): string[] | undefined {
    if (!k) return undefined;
    if (Array.isArray(k)) return k.filter(Boolean);
    return k.split(",").map(s => s.trim()).filter(Boolean);
}

function parseRobots(metaRobots?: string | null): Metadata["robots"] | undefined {
    if (!metaRobots) return undefined;
    const v = metaRobots.toLowerCase();
    const noindex = v.includes("noindex");
    const nofollow = v.includes("nofollow");
    if (noindex || nofollow) return { index: !noindex, follow: !nofollow };
    return undefined;
}

export async function generateMetadata(
    _: unknown,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // Detecta el origen en server; si tienes NEXT_PUBLIC_APP_URL úsalo como fallback
    const base =
        process.env.STRAPI_URL ??
        (typeof process !== "undefined" ? undefined : undefined);

    const apiUrl = base ? `${base}/api/page-location` : `/api/page-location`;

    let seo: CMSSeo = null;

    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 } });
        if (res.ok) {
            const json = await res.json();
            seo = json?.data?.seo ?? null;
        } else {
            console.warn("[locations/layout] SEO fetch status:", res.status);
        }
    } catch (e) {
        console.warn("[locations/layout] SEO fetch error:", e);
    }

    const title = seo?.metaTitle ?? "Locations";
    const description =
        seo?.metaDescription ??
        'The Miles Mediation experience is "Miles Above the Rest."';
    const keywords = toKeywordsArray(seo?.keywords);
    const robots = parseRobots(seo?.metaRobots);

    // Si el CMS no trae canonical, asumimos /locations
    const canonical = seo?.canonicalURL ?? "/locations";

    // Mantiene imágenes OG del parent si existiesen
    const prev = await parent;
    const previousImages = prev.openGraph?.images ?? [];

    return {
        title,
        description,
        keywords,
        robots,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: "Miles Mediation & Arbitration",
            type: "website",
            locale: "en_US",
            images: previousImages,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
    // OJO: nada de "use client" aquí.
    return children;
}
