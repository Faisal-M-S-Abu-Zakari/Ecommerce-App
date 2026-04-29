import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const CategoriesSection = () => {
  const { t, isRtl } = useLanguage();

  const categories = [
    {
      name: t.men,
      image:
        "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&h=800&fit=crop",
      link: "/collection?category=Men",
    },
    {
      name: t.women,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop",
      link: "/collection?category=Women",
    },
    {
      name: t.kids,
      image:
        "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=600&h=800&fit=crop",
      link: "/collection?category=Kids",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
            {t.category}
          </span>
          <h3 className="text-3xl font-bold text-[#1A1A1A] mt-2">
            {isRtl ? "تسوق حسب الفئة" : "Shop by Category"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              className="group relative overflow-hidden rounded-2xl aspect-3/4"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h4 className="text-2xl font-bold text-white text-center">
                  {cat.name}
                </h4>
                <p className="text-white/80 text-center text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isRtl ? "تسوق الآن" : "Shop Now"} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
