import HeroSection from "@/components/marketing/HeroSection";
import CategoryGrid from "@/components/marketing/CategoryGrid";
import ProductCarousel from "@/components/marketing/ProductCarousel";
import ModelShowcaseGrid from "@/components/marketing/ModelShowcaseGrid";
import VideoShowcase from "@/components/marketing/VideoShowcase";
import TechBanner from "@/components/marketing/TechBanner";
import PromoBanner from "@/components/marketing/PromoBanner";
import DroneSection from "@/components/marketing/DroneSection";
import Footer from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <ProductCarousel />
      <ModelShowcaseGrid />
      <VideoShowcase />
      <TechBanner />
      <PromoBanner />
      <DroneSection />
      <Footer />
    </>
  );
}
