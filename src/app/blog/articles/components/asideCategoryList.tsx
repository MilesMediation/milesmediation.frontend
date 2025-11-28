
import {ChevronRight} from "lucide-react";
import {customPageData} from "@/lib/api";
import Link from "next/link";
import {StrapiResponse} from "@/types/api";

// /api/articles-categories
interface CategoryListData {
    id: number;
    name: string;
    slug: string;
    additionalLinks?: {
        label: string
        url: string
        icon?: string
    }[]
}
// /api/articles-categories
interface AsideCategoryListProps {
    additionalLinks?: {
        label: string
        url: string
        icon?: string
    }[]
    activeCategorySlug?: string | null
}

export default async function AsideCategoryList({additionalLinks, activeCategorySlug}: AsideCategoryListProps) {

    let categoryListData: StrapiResponse<CategoryListData[]> | null = null;

    try {
        // Fetch data on the server
        categoryListData = await customPageData<CategoryListData[]>('/articles-categories');

    } catch (error) {
        console.error("❌ Failed to fetch Category list data:", error);
        // Create fallback data structure
        categoryListData = {
            data: []
        };
    }

    if(!categoryListData?.data) return null;


    return(
        <>
            <aside className="col-span-2">
                <h4 className={'font-title text-xl font-bold main-text-color uppercase'}>Categories</h4>
                {categoryListData?.data?.length > 0 && (
                <ul className={` list-inside`}>
                    {categoryListData.data.map((category: CategoryListData) => {
                        const isActive = activeCategorySlug === category.slug;
                        return (
                            <li key={category.id} className={' border-b border-cyan-950/10 py-5'}>
                                <Link 
                                    className={`flex capitalize ${isActive ? 'font-bold text-teal-900' : ''}`} 
                                    href={'/blog/category/' + category.slug}
                                >
                                    <ChevronRight /> {category.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                )}
                {(additionalLinks && additionalLinks.length > 0 )&& (
                <div className="mt-10">
                    <h4 className={'font-title text-xl font-bold main-text-color uppercase'}>Useful links</h4>
                    <ul className={` list-inside`}>
                        {additionalLinks.map((item, index) => (
                            <li key={index} className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight />
                                <Link href={item.url}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
                )}
            </aside>
        </>
    )
}