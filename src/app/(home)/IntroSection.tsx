'use client'


import MasonryGallery from "@/components/MansonryGallery";

export default function IntroSection() {
    return (
        <section className="w-full bg-white py-[100px] text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-title text-[40px] leading-[60px] font-medium uppercase text-[var(--Dark-Green_1,#003135)] tracking-[-0.44px] mb-6">
                    MILES MEDIATION <br /> & ARBITRATION
                </h2>

                <p className="font-body  text-[16px] leading-[24px] text-black font-normal tracking-[-0.176px] mb-10">
                    Our diverse legal expertise, consistently high-touch administrative support,
                    and dedication to our clients and neutrals can be summed up in the following
                    words: the Miles Mediation experience is “Miles Above the Rest.”
                </p>

                <button className="text-white font-semibold font-body text-[16px] rounded-[8px] px-6 py-[10px] bg-[var(--Dark-Green_1,#003135)] hover:opacity-90 transition">
                    Schedule a mediation
                </button>
            </div>

            {/* Image animation block */}
            <MasonryGallery />
        </section>
    )
}
