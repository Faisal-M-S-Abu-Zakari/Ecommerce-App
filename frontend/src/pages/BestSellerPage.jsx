import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { useLanguage } from "../context/LanguageContext";

const BestSellerPage = () => {
  const { products } = useContext(ShopContext);
  const { t, isRtl } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const bestSeller = products.filter((product) => product.bestseller === true);

  const totalPages = Math.ceil(bestSeller.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = bestSeller.slice(startIndex, startIndex + itemsPerPage);

  const getRating = (index) => {
    const fixedRatings = [4.8, 4.5, 4.9, 4.7, 5.0, 4.6, 4.4, 4.3];
    return fixedRatings[index % fixedRatings.length];
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center items-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#BC9355] hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
              currentPage === page
                ? "bg-[#BC9355] text-white border-[#BC9355]"
                : "border-gray-200 hover:bg-[#BC9355] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#BC9355] hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
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
            paginatedProducts.map((product, index) => (
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

        {totalPages > 1 && renderPagination()}
      </div>
    </div>
  );
};

export default BestSellerPage;