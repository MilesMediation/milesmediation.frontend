"use client";

import Image from "next/image";
import Link from "next/link";

interface DashboardSectionProps {
    title: string;
    description: string;
    image: string;
    imagePosition?: "left" | "right";
    buttonLabel?: string;
    buttonUrl?: string;
    backgroundImage?: string;
    dark?: boolean;
}

export default function DashboardSection({
    title,
    description,
    image,
    imagePosition = "right",
    buttonLabel,
    buttonUrl,
    backgroundImage,
    dark = false,
}: DashboardSectionProps) {
    const imageFirst = imagePosition === "left";
    const textColor = dark ? "text-white" : "text-[var(--Dark-Green_1,#003135)]";
    const bgColor = dark ? "bg-[var(--Dark-Green_1,#003135)]" : "bg-[var(--low-green,#AEDDE5)]";

    return (
        <section
            className={`w-full py-60 px-4 relative mb-0 ${bgColor} ${
                backgroundImage ? "bg-cover bg-center" : ""
            }`}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
        >
            <div
                className="absolute  inset-0 w-full h-full z-0 "
                style={{ backgroundColor: dark ? "#003135aa" : "transparent" }}
            ></div>

            <div className="relative container z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div
                    className={`relative w-full h-[300px] sm:h-[480px] aspect-square sm:aspect-auto rounded-xl overflow-hidden
            ${imageFirst ? "order-1 md:order-1" : "order-1 md:order-2"}`}
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-xl"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Text Content */}
                <div
                    className={`flex flex-col justify-center ${
                        imageFirst ? "order-2 md:order-2" : "order-2 md:order-1"
                    }`}
                >
                    <h2
                        className={`font-title text-[32px]  md:text-[40px] mb-6 uppercase ${textColor}`}
                    >
                        {title}
                    </h2>
                    <p className={`font-body text-[16px] leading-[24px] mb-6 ${textColor}`}>
                        {description}
                    </p>

                    <div>
                        {buttonLabel && buttonUrl && (
                            <Link
                                href={buttonUrl}
                                className={`inline-block w-auto px-6 py-3 text-sm font-medium rounded-md transition ${
                                    dark
                                        ? "border border-white text-white hover:bg-white hover:text-[var(--Dark-Green_1,#003135)]"
                                        : "bg-[var(--Dark-Green_1,#003135)] text-white hover:opacity-90"
                                }`}
                            >
                                {buttonLabel}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
