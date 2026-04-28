import { useContext } from "react";
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

  const isVisible = showSearch && pathname.includes("collection");

  const handleSearchClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearch(false);
    setSearch("");
  };

  const filteredProducts = search.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 5)
    : [];

  if (!isVisible) return null;

  return (
    <div className="bg-gray-50 border-t border-b relative">
      <div className="flex justify-center items-center mx-3 my-5 px-5 py-2 border border-gray-400 rounded-full w-3/4 sm:w-1/2 m-auto">
        <input
          type="text"
          className="flex-1 bg-inherit outline-none text-sm"
          placeholder={isRtl ? "بحث..." : "Search"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} alt="Search" className="w-4" />
        {search && (
          <img
            src={assets.cross_icon}
            alt="Clear"
            className="w-3 cursor-pointer ms-2"
            onClick={() => setSearch("")}
          />
        )}
      </div>
      <div className="absolute end-0 me-10 lg:me-56 w-64 bg-white shadow-lg rounded-lg z-50 max-h-80 overflow-auto">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b"
            onClick={() => handleSearchClick(product._id)}
          >
            <img
              src={product.images?.[0] || product.image?.[0]}
              alt={product.name}
              className="w-12 h-16 object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium line-clamp-1">{product.name}</p>
              <p className="text-xs text-gray-500">{product.price} SAR</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;