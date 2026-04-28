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

  const getRating = (index) => {
    const fixedRatings = [4.5, 4.8, 4.7, 4.9, 4.6, 5.0, 4.4, 4.3, 4.7, 4.5, 4.6, 4.8];
    return fixedRatings[index % fixedRatings.length];
  };

  const toggleCategory = (event) => {
    if (categories.includes(event.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setCategories((prev) => [...prev, event.target.value]);
    }
  };

  const toggleSubCategory = (event) => {
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
              <span className="font-bold">Filters</span>
              <svg className={`w-5 h-5 transition-transform ${showFilter ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className={`${showFilter ? "block" : "hidden"} md:block`}>
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="flex flex-col gap-2">
                  {["Men", "Women", "Kids"].map((cat) => (
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
                <h4 className="font-semibold mb-3">Type</h4>
                <div className="flex flex-col gap-2">
                  {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
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
              <span className="text-gray-500">{filteredProducts.length} products</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#BC9355]"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
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

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center text-gray-500">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;