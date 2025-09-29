
import {ChevronRight} from "lucide-react";
import {customPageData} from "@/lib/api";
import Link from "next/link";
import {StrapiResponse} from "@/types/api";

// /api/articles-categories
interface CategoryListData {
    id: number;
    name: string;
    slug: string;
}

export default async function AsideCategoryList() {

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

    console.log('testCategory!!!!',categoryListData);
    return(
        <>
            <aside className="col-span-2">
                <h4 className={'font-title text-xl font-bold main-text-color uppercase'}>Categories</h4>
                {categoryListData?.data?.length > 0 && (
                <ul className={` list-inside`}>
                    {categoryListData.data.map((category: CategoryListData) => (
                    <li key={category.id} className={' border-b border-cyan-950/10 py-5'}>
                        <Link className={'flex'} href={'/blog/articles?category=' + category.slug}>
                            <ChevronRight /> {category.name}
                        </Link>
                    </li>
                    ))}
                </ul>
                )}
                <div className="mt-10">
                    <h4 className={'font-title text-xl font-bold main-text-color uppercase'}>Useful links</h4>
                    <ul className={` list-inside`}>
                        <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 1 </li>
                        <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 2</li>
                        <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 3</li>
                        <li className={'flex border-b border-cyan-950/10 py-5'}><ChevronRight /> Cagetegory 4</li>
                    </ul>
                </div>
            </aside>
        </>
    )
}