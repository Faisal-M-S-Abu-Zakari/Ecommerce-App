import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsletterBox from "../components/Newsletter";
import OurPolicy from "../components/OurPolicy";
import CategoriesSection from "../components/CategoriesSection";
import PromoBanner from "../components/PromoBanner";
import TrustBadges from "../components/TrustBadges";
import BrandBanner from "../components/BrandBanner";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoriesSection />
      <LatestCollection />
      <BrandBanner />
      <PromoBanner />
      <BestSeller />
      <TrustBadges />
      {/* <OurPolicy /> */}
      <NewsletterBox />
    </div>
  );
};

export default Home;
