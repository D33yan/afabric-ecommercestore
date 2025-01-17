import CategoriesSection from "@/components/layouts/CategoriesSection";
import FeaturedProducts from "@/components/layouts/FeaturedProducts";

import HeroSection from "@/components/layouts/Hero";

import TrendingProducts from "@/components/layouts/TrendingProducts";

import ContactPage from "./contact/page";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <CategoriesSection/>
      <FeaturedProducts/>
      <TrendingProducts/>
      <ContactPage/>
    </div>
  );
}
