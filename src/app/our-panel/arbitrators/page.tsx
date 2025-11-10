import FeatureCard from "@/components/cards/featureCard";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import MainNavigation from "@/components/global/MainNavigation";
import PageHeader from "@/components/global/PageHeader";

import FeaturedNeutralSection from "@/components/sections/FeaturedNeutralSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";

import { Button } from "@/components/ui/button";
import DocumentCard from "./component/documentCard";

// const mockData = [
//     {
//         name: "ADR on demand",
//         description: "xl",
//         url: "/our-panel/adr-on-demand",
//         image: "/demo/buildings_1.jpg",
//     },
//     {
//         name: "Arbitration",
//         description: "xl",
//         url: "/our-panel/arbitration",
//         image: "/demo/buildings_1.jpg",
//     },
// ];

export default function Page() {
    return (
        <>
            <MainNavigation />
            <PageHeader
                title="Arbitration"
                description="Trusted experts. Proven process. Focused on delivering outcomes that help you move forward. 
            Our diverse legal expertise, consistently high-touch administrative support, and dedication to our clients and neutrals can be summed up in the following words: the Miles Mediation experience is Miles Above the Rest."
            />
            <main className="mb-10">
                <FeaturedNeutralSection
                    title_1st_line="Meet Our"
                    title_2nd_line="Arbitrators"
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam eligendi ab vel esse, minima numquam natus, iusto deserunt fuga eos velit fugiat maxime fugit quidem et illo saepe dolorum. Consectetur."
                    buttonLabel="See all arbitrators"
                />

                {/* Arbiration Features section */}
                <section id="what-is-arbitration" className="container mx-auto py-10">
                    <h2 className="text-5xl main-text-color font-bold mb-10 text-center">
                        What Is Arbitration?
                    </h2>
                    <p className="text-center">
                        Arbitration is a private, legally binding process where a neutral arbitrator
                        hears both sides of a dispute and makes a final decision. Unlike litigation,
                        arbitration typically moves faster, is cost-effective, and offers greater
                        privacy for all parties involved.
                    </p>
                    <div className="grid grid-cols-3 mt-20">
                        <div>
                            <FeatureCard
                                title="Privacy"
                                description="Proceedings are confidential."
                            />
                        </div>
                        <div>
                            <FeatureCard
                                title="Privacy"
                                description="Proceedings are confidential."
                            />
                        </div>
                        <div>
                            <FeatureCard
                                title="Privacy"
                                description="Proceedings are confidential."
                            />
                        </div>
                    </div>
                </section>

                {/* Rules and Procedures section */}
                <section id="rules" className="py-60 bg-teal-100">
                    <div className="container mx-auto">
                        <h2 className="text-5xl main-text-color font-bold mb-10 text-center">
                            Arbitration Rules & Procedures
                        </h2>
                        <div>
                            <div>
                                <h3 className="text-3xl mb-5 text-main-color font-bold">Rules</h3>
                                <p>
                                    Miles adapts to the differing needs of all parties involved in
                                    arbitration. Our rules address various fields of law and types
                                    of arbitration, providing parties with flexibility. We ensure
                                    that the rules incorporate recent developments in arbitration
                                    and are simple to use.
                                </p>
                            </div>
                            <div className="grid grid-cols-6 gap-10 py-10">
                                <FeatureCard
                                    title="Miles Class Action Arbitration Rules & Procedures"
                                    backgroundMode="dark"
                                    buttonLabel="Download"
                                    targetURL="/"
                                />
                                <FeatureCard
                                    title="Miles Class Action Arbitration Rules & Procedures"
                                    backgroundMode="dark"
                                    buttonLabel="Download"
                                    targetURL="/"
                                />
                                <FeatureCard
                                    title="Miles Class Action Arbitration Rules & Procedures"
                                    backgroundMode="dark"
                                    buttonLabel="Download"
                                    targetURL="/"
                                />
                                <FeatureCard
                                    title="Miles Class Action Arbitration Rules & Procedures"
                                    backgroundMode="dark"
                                    buttonLabel="Download"
                                    targetURL="/"
                                />
                                <FeatureCard
                                    title="Miles Class Action Arbitration Rules & Procedures"
                                    backgroundMode="dark"
                                    buttonLabel="Download"
                                    targetURL="/"
                                />
                                <FeatureCard
                                    title="Miles Class Action Arbitration Rules & Procedures"
                                    backgroundMode="dark"
                                    buttonLabel="Download"
                                    targetURL="/"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <FeaturedSection
                    title="Clauses"
                    description="Miles Mediation and Arbitration is the fastest growing mediation and arbitration firm in the Southeast. Miles is headquartered in Atlanta with additional offices in Savannah, Charlotte, Nashville, Jacksonville, Tampa and Columbia, SC.
                    Miles is shaping the future of resolution with a comprehensive professional services model that combines the expertise of its highly skilled and diverse panel of ADR professionals (neutrals) with an unparalleled level of client support in order to guide and empower parties to fair, timely and cost-effective resolution regardless of case size, specialization or complexity."
                    alignImg="right"
                    bgColor="teal"
                    featuredImage="/demo/buildings_1.jpg"
                />

                {/* Section Understaing the Workflow at Miles */}
                <section id="understanding-workflow" className="py-60">
                    <div className="container mx-auto px-4 text-center">
                        <div></div>
                        <h2 className="text-5xl font-bold mb-4 ">
                            Understanding the Workflow at Miles
                        </h2>
                        <p className="mt-10">
                            Since its inception, arbitral proceedings and procedures have championed
                            party autonomy, cost and time efficiency, and flexibility. At Miles, we
                            are often asked by parties and attorneys of stages, timelines, and fees
                            associated with arbitrations. While it is difficult to articulate
                            responses to such queries with absolute certainty, we have developed the
                            following workflow to assist parties and attorneys in dictating steps
                            and action plans throughout the arbitration proceedings and a
                            cost-calculator to determine costs to initiate and conclude arbitrations
                            at Miles. If you have any questions, please contact us at
                            <a href="#">arb@milesadr.com</a>.
                        </p>
                        <div className="mt-10 flex gap-4 justify-center">
                            <Button>General Arbitration</Button>
                            <Button variant={"outlined"}>Expedited Arbitrations</Button>
                        </div>
                    </div>
                </section>

                <section id="understanding-workflow" className="py-60">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-4">
                            <div>
                                <span className="bigTextStep">1</span>
                            </div>
                            <div className="col-span-3">
                                <p>Step 1</p>
                                <h3 className="text-5xl font-bold mb-4 main-text-color">
                                    Initiation & Commencement of Arbitration Proceedings
                                </h3>
                                <p>
                                    The Claimant must file a demand for arbitration (“Demand”)
                                    readily available on www.milesadr.com/demand-for-arbitration/
                                    through: (i) e-filing, (ii) email at arb@milesadr.com, or (iii)
                                    physical filing. Along with the Demand, the Claimant must make a
                                    payment of $1500 towards Miles’ administrative and commencement
                                    fees. Upon receipt of the Demand, a case manager will be
                                    assigned to the matter to coordinate with the parties and the
                                    arbitrator/ arbitral tribunal. Upon being served with the
                                    Demand, the Respondent must serve its answer to the Demand
                                    (“Response”) within a period of fourteen (14) days to the
                                    Claimant as well as to Miles by (i) e-filing, (ii) email at
                                    arb@milesadr.com, or (iii) physical filing. Along with the
                                    Response, the Respondent must make a payment of $1500 towards
                                    Miles’ administrative and commencement fees, unless stipulated
                                    otherwise. Time Period from the date of filing of Demand:
                                    Twenty-One (21) Business Days Estimated Costs: $1500.00 per
                                    party.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="">
                    <div className="container mx-auto">
                        <h2 className="text-5xl font-bold mb-4 main-text-color">
                            Draft Forms
                        </h2>
                        <p>
                            At Miles, we strongly believe that procedures and processes involved
                            with arbitration must be cost-effective, transparent, and speedy. To
                            help parties and attorneys efficiently utilize resources and ensure
                            uniformity and consistency for our arbitrators, we provide the following
                            templates of documents that parties may require during arbitral
                            proceedings. Each document has a corresponding downloadable word
                            document and a pre-filled sample for parties’ reference. If you have any
                            questions, please contact us at arb@milesadr.com. 
                            </p>
                            <p className="mt-4">
                            Disclaimer: The purpose of these templates is informational and educational only. Please
                            note that by using these templates, Miles Mediation & Arbitration
                            Services, LLC is neither providing legal advice nor creating any
                            attorney-client relationship with you. You should not act upon or rely
                            on any information provided by these documents, without engaging and
                            seeking the advice of an attorney. Miles Mediation & Arbitration
                            Services, LLC does not guarantee the enforceability of the templates and
                            forms.
                        </p>
                        <div className={'grid grid-cols-3 mt-10 gap-4'}>
                            <DocumentCard />
                            <DocumentCard />
                            <DocumentCard />
                            <DocumentCard />
                            <DocumentCard />
                            <DocumentCard />
                        </div>
                    </div>
                </section>
            </main>
            <CallToAction />
            <Footer />
        </>
    );
}
