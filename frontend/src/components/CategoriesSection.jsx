import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../assets/assets";

const CategoriesSection = () => {
  const { t, isRtl } = useLanguage();

  const getCategoryImage = (name) => {
    const images = {
      Men: assets.men,
      Women: assets.yaso,
      Kids: assets.kids,
      Accessories: assets.accessories,
      Perfume: assets.perfume,
      Shoes: assets.Shoes,
    };
    return images[name] || assets.men;
  };

  const categories = [
    {
      name: t.men,
      image: getCategoryImage("Men"),
      link: "/collection?category=Men",
    },
    {
      name: t.women,
      image: getCategoryImage("Women"),
      link: "/collection?category=Women",
    },
    {
      name: t.kids,
      image: getCategoryImage("Kids"),
      link: "/collection?category=Kids",
    },
    {
      name: "Accessories",
      image: getCategoryImage("Accessories"),
      link: "/collection?category=Accessories",
    },
    {
      name: "Perfume",
      image: getCategoryImage("Perfume"),
      link: "/collection?category=Perfume",
    },
    {
      name: "Shoes",
      image: getCategoryImage("Shoes"),
      link: "/collection?category=Shoes",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
            {t.category}
          </span>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-2">
            {isRtl ? "تسوق حسب الفئة" : "Shop by Category"}
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              className="group flex flex-col items-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-300 group-hover:border-[#BC9355] group-hover:scale-105">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-3 text-sm font-medium text-gray-700 group-hover:text-[#BC9355] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
