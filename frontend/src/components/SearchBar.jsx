import { useContext, useRef, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products } =
    useContext(ShopContext);
  const { pathname } = useLocation();
  const { t, isRtl } = useLanguage();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const isVisible = showSearch && pathname.includes("collection");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSearch(false);
        setSearch("");
      }
    };
    if (isVisible) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible]);

  const handleSearchClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearch(false);
    setSearch("");
  };

  const handleClose = () => {
    setShowSearch(false);
    setSearch("");
  };

  const filteredProducts = search.trim()
    ? products
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 6)
    : [];

  if (!isVisible) return null;

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div ref={containerRef} className="relative max-w-2xl mx-auto">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 focus-within:border-[#BC9355] focus-within:bg-white transition-all duration-200 shadow-sm">
            <img src={assets.search_icon} alt="" className="w-4 h-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent outline-none text-sm text-[#1A1A1A] placeholder-gray-400"
              placeholder={isRtl ? "ابحث عن منتج..." : "Search for a product..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && handleClose()}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={handleClose}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors ms-1"
              aria-label="Close search"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {filteredProducts.length > 0 && (
            <div className="absolute top-full mt-2 start-0 end-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              {filteredProducts.map((product, idx) => (
                <button
                  key={product._id}
                  className={`w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors text-start ${idx !== filteredProducts.length - 1 ? "border-b border-gray-50" : ""}`}
                  onClick={() => handleSearchClick(product._id)}
                >
                  <img
                    src={product.images?.[0] || product.image?.[0]}
                    alt={product.name}
                    className="w-12 h-14 object-cover rounded-lg shrink-0 bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1A1A1A] truncate">{product.name}</p>
                    <p className="text-xs text-[#BC9355] font-medium mt-0.5">${product.price}</p>
                    {product.category && (
                      <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">{product.category}</p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRtl ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {search.trim() && filteredProducts.length === 0 && (
            <div className="absolute top-full mt-2 start-0 end-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 px-5 py-8 text-center">
              <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm text-gray-400">{isRtl ? "لا توجد نتائج لـ" : "No results for"} <span className="font-semibold text-gray-600">"{search}"</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
