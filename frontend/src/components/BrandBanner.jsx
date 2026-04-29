import { useLanguage } from "../context/LanguageContext";

const BrandBanner = () => {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-20 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
              alt="Brand Story"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
          <div className="flex-1">
            <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
              {isRtl ? "قصتنا" : "Our Story"}
            </span>
            <h3 className="text-3xl font-bold text-[#1A1A1A] mt-2 mb-6">
              {isRtl
                ? "الفخامة التقى فيها بالراحة"
                : "Where Luxury Meets Comfort"}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isRtl
                ? "نحن في FAISAL نؤمن بأن الأناقة. نسعى لتقديم ملابس تجمع بين الجودة العالية والتصميم العصري."
                : "At FAISAL, we believe that luxury should not come at the expense of comfort. Our carefully curated collection blends premium quality with modern design."}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {isRtl
                ? "منذ عام 2020، نحن نوفر لأفضلائنا أجود الأقمشة وأحدث التصميمات التي تناسب كل مناسبة. رضاكم هو نجاحنا."
                : "Since 2020, we've been providing our customers with the finest fabrics and latest designs for every occasion. Your satisfaction is our success."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandBanner;
