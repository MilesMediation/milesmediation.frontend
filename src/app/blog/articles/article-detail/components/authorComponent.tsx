export default function AuthorComponent() {
    return (
        <div className="container mx-auto mt-10">
            <div className="flex">
                <div className="w-[250px] h-[250px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/demo/buildings_1.jpg"
                        className="object-cover w-[250px] h-[250px]"
                        alt=""
                    />
                </div>

                <div className="bg-[#B0DBDF] grow p-10">
                    <h4 className="text-4xl font-title font-medium main-text-color">
                        About Kim L. Kirn
                    </h4>
                    <p>
                        Kim has conducted more than 1,000 mediations and 75 arbitrations over the past 17 years as an ADR professional. Her areas of experience include employment, real estate, personal injury, sexual misconduct, consumer, commercial, insurance, securities and education including special education. She is a tireless advocate for the mediation process and will continue to urge the parties towards settlement until no stone is left unturned.
                    </p>
                </div>
            </div>
        </div>
    );
}
