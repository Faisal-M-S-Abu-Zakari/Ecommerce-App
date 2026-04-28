import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { useLanguage } from "../context/LanguageContext";

const BestSellerPage = () => {
  const { products } = useContext(ShopContext);
  const { t } = useLanguage();

  const bestSeller = products.filter((product) => product.bestseller === true);

  const getRating = (index) => {
    const fixedRatings = [4.8, 4.5, 4.9, 4.7, 5.0, 4.6, 4.4, 4.3];
    return fixedRatings[index % fixedRatings.length];
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
            {t.bestSeller}
          </span>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mt-2">
            {t.thisMonth}
          </h1>
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
            <div className="col-span-full py-20 text-center text-gray-500">
              {t.noOrders}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellerPage;