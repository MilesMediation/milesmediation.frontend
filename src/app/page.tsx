import HeroSection from "@/app/(home)/HeroSection";
import MainNavigation from "@/components/global/MainNavigation";
import IntroSection from "@/app/(home)/IntroSection";
import ServicesSection from "@/app/(home)/ServicesSection";
import OfficesSection from "@/app/(home)/OfficeSection";
import DashboardSection from "@/app/(home)/DashboardSection";
import OurVideos from "@/app/(home)/OurVideos";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";

export default function Home() {
    return (
        <div className="bg-white text-gray-800 space-y-12">
            <MainNavigation />
            <HeroSection/>
            <IntroSection  />
            <ServicesSection />
            <OfficesSection />
            <DashboardSection
                title="Dashboard"
                description="Miles’ neutrals are experienced mediators and arbitrators with expertise in their fields. They are experts in dispute resolution who are helping to shape the future of the ADR field with thought leadership that includes articles, speaking engagements, and CLE classes and training. Learn more about their background and experience here."
                image="/cardImgSample1.png"
                imagePosition="left"
                buttonLabel="Sign up"
                buttonUrl="/signup"
            />

            <DashboardSection
                title="Our Panel"
                description="Meet our larger panel of neutrals and arbitrators"
                image="/cardImgSample1.png"
                imagePosition="right"
                buttonLabel="Schedule a mediation"
                buttonUrl="/schedule"
                backgroundImage="/cardImgSample1.png"
                dark
            />
            <OurVideos />
            <CallToAction />
            <Footer />

        </div>
    );
}
