import { useContext, useMemo, useState } from "react";
import ShopContext from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { useLanguage } from "../context/LanguageContext";

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const { t } = useLanguage();
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const getRating = (index) => {
    const fixedRatings = [4.5, 4.8, 4.7, 4.9, 4.6, 5.0, 4.4, 4.3, 4.7, 4.5, 4.6, 4.8];
    return fixedRatings[index % fixedRatings.length];
  };

  const toggleCategory = (event) => {
    setCurrentPage(1);
    if (categories.includes(event.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setCategories((prev) => [...prev, event.target.value]);
    }
  };

  const toggleSubCategory = (event) => {
    setCurrentPage(1);
    if (subCategories.includes(event.target.value)) {
      setSubCategories((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setSubCategories((prev) => [...prev, event.target.value]);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim() !== "") {
      result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category));
    }
    if (subCategories.length > 0) {
      result = result.filter((p) => subCategories.includes(p.subCategory));
    }

    if (sortBy === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, categories, subCategories, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

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
        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="w-10 h-10 rounded-full border border-gray-200 hover:bg-[#BC9355] hover:text-white transition-colors">1</button>
            {startPage > 2 && <span className="text-gray-400">...</span>}
          </>
        )}
        {pages.map((page) => (
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
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className="w-10 h-10 rounded-full border border-gray-200 hover:bg-[#BC9355] hover:text-white transition-colors">{totalPages}</button>
          </>
        )}
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
            {t.collection}
          </span>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mt-2">
            {t.springCollection}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="md:w-1/4">
            <div className="flex items-center justify-between mb-4 md:hidden" onClick={() => setShowFilter(!showFilter)}>
              <span className="font-bold">{t.filters}</span>
              <svg className={`w-5 h-5 transition-transform ${showFilter ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className={`${showFilter ? "block" : "hidden"} md:block`}>
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{t.category}</h4>
                <div className="flex flex-col gap-2">
                  {[t.men, t.women, t.kids].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={cat}
                        onChange={toggleCategory}
                        checked={categories.includes(cat)}
                        className="w-4 h-4 accent-[#BC9355]"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">{t.type}</h4>
                <div className="flex flex-col gap-2">
                  {[t.topwear, t.bottomwear, t.winterwear].map((sub) => (
                    <label key={sub} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={sub}
                        onChange={toggleSubCategory}
                        checked={subCategories.includes(sub)}
                        className="w-4 h-4 accent-[#BC9355]"
                      />
                      <span className="text-sm">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500">{filteredProducts.length} {t.productsCount}</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#BC9355]"
              >
                <option value="relevant">{t.sortBy}: {t.relevant}</option>
                <option value="low-high">{t.lowHigh}</option>
                <option value="high-low">{t.highLow}</option>
              </select>
            </div>

            <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product, index) => (
                <ProductItem
                  key={index}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.images || product.image}
                  rating={getRating(index)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                {t.noProducts}
              </div>
            ) : (
              totalPages > 1 && renderPagination()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;