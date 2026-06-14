import HeroSection from "@/components/marketing/HeroSection";
import CategoryGrid from "@/components/marketing/CategoryGrid";
import TrendVehicles from "@/components/marketing/TrendVehicles";
import TechBanner from "@/components/marketing/TechBanner";
import PromoBanner from "@/components/marketing/PromoBanner";
import Footer from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <TrendVehicles />
      <TechBanner />
      <PromoBanner />
      <Footer />
    </>
  );
}
