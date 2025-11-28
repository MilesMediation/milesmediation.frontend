import Link from "next/link";
import { Button } from "../ui/button";

interface FeatureCardProps {
    backgroundMode?: "dark" | "light";
    targetURL?: string;
    buttonLabel?: string;
    title?: string;
    description?: string;
}

export default function FeatureCard({
    title = "Default title",
    description,
    backgroundMode = "light",
    targetURL,
    buttonLabel = "See more",
}: FeatureCardProps) {
    return (
        <div
            className={`text-center p-4 rounded-lg ${
                backgroundMode === "dark"
                    ? "bg-white border border-gray-200"
                    : ""
            }`}
        >
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="mx-auto" src="/globe.svg" alt="Privacy" width="100" height="100" />
            </div>
            <h3 className={` font-bold text-main-color my-4 ${
                backgroundMode === "dark"
                    ? "text-xl"
                    : "text-3xl"
            }`}>{title}</h3>
            {description && <p>{description}</p>}
            {targetURL && (
                <>
                    <Link href={targetURL} target="_blank">
                        <Button className="mt-4 w-full bg-teal-800">{buttonLabel}</Button>
                    </Link>
                </>
            )}
        </div>
    );
}
