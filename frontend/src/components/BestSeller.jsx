import { useContext } from "react";
import { Link } from "react-router-dom";
import ShopContext from "./../context/ShopContext";
import ProductItem from "./ProductItem";
import { useLanguage } from "../context/LanguageContext";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const { t } = useLanguage();

  const bestSeller = products
    .filter((product) => product.bestseller === true)
    .slice(0, 4);

  const getRating = (index) => {
    const fixedRatings = [4.8, 4.5, 4.9, 4.7, 5.0, 4.6, 4.4, 4.3];
    return fixedRatings[index % fixedRatings.length];
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
              {t.bestSeller}
            </span>
            <h3 className="text-3xl font-bold text-[#1A1A1A] mt-2">
              {t.thisMonth}
            </h3>
          </div>
          <Link to="/bestseller" className="text-sm font-bold flex items-center gap-2 border-b-2 border-[#BC9355] pb-1 hover:text-[#BC9355] transition-colors">
            <span>{t.viewAll}</span>
          </Link>
        </div>

        <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {bestSeller.length > 0 ? (
            bestSeller.map((product, index) => (
              <ProductItem
                key={index}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.images || product.image}
                rating={getRating(index)}
              />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-500">
              No best seller products available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;