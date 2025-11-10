import BentoCard from "@/app/(home)/components/bentoCard";
import {NEXT_URL_BACKOFFICE} from "@/lib/globalConstants";
import type {FeaturedSectionData, BentoBoxColumn, BentoImage} from "@/types/api";

const NEUTRALS_DESCRIPTION =
    "Miles' neutrals are experienced mediators and arbitrators with expertise in their fields. They are experts in dispute resolution who are helping to shape the future of the ADR field with thought leadership that includes articles, speaking engagements, and CLE classes and training. Learn more about their background and experience here.";

function isBentoColumnAvailable(column: BentoBoxColumn | null | undefined): column is BentoBoxColumn {
    if (!column) {
        return false;
    }
    return column.is_available ?? true;
}

function getColumnItems(column: BentoBoxColumn): BentoImage[] {
    const items: (BentoImage | null)[] = column.image_col ?? [];
    return items.filter((item): item is BentoImage => Boolean(item));
}

export default function BentoSection({dataSection}: { dataSection?: FeaturedSectionData | null }) {

    console.log('DATA CHECK BENTO: ', dataSection);
    if (!dataSection?.is_available) {
        return null;
    }

    const bentoColumns = (dataSection.bento_box ?? []).filter(isBentoColumnAvailable);

    console.log('DATA CHECK BENTO2: ', dataSection);
    return (
        <section id={"bentoSection"} className={"py-40 mb-0"}>
            <div className={"mx-auto container"}>
                <h2 className={"font-title text-[32px] md:text-[40px] text-[var(--Dark-Green_1,#003135)] mb-6"}>
                    {dataSection.title ?? ""}
                </h2>
                <p>{dataSection.description ?? ""}</p>
            </div>
            <div className="relative container z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                {bentoColumns.map((column: BentoBoxColumn, columnIndex: number) => {
                    const columnItems = getColumnItems(column);

                    if (!columnItems.length) {
                        return null;
                    }

                    return (
                        <div key={column.id ?? columnIndex} className={"gap-4 flex flex-col h-full"}>
                            {columnItems.map((item: BentoImage) => {
                                const mediaUrl = item.image_col?.[0]?.url;
                                const imageBG = mediaUrl ? `${NEXT_URL_BACKOFFICE}${mediaUrl}` : "/bg-demo-city.png";

                                return (
                                    <div key={item.id ?? `${column.id ?? columnIndex}-${imageBG}`} className={"h-full"}>
                                        <BentoCard
                                            title={item.image_name ?? ""}
                                            description={NEUTRALS_DESCRIPTION}
                                            imageBG={imageBG}
                                            target_url={item.target_url ?? ""}
                                            classname={item.classname ?? undefined}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
