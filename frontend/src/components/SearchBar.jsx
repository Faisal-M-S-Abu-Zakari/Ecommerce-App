import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const { pathname } = useLocation();

  const isVisible = showSearch && pathname.includes("collection");

  if (!isVisible) return null;

  return (
    <div className="bg-gray-50 border-t border-b text-center">
      <div className="inline-flex justify-center items-center mx-3 my-5 px-5 py-2 border border-gray-400 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          className="flex-1 bg-inherit outline-none text-sm"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} alt="Search" className="w-4" />
      </div>
      <img
        src={assets.cross_icon}
        alt="Close search"
        className="inline w-3 cursor-pointer"
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
      />
    </div>
  );
};

export default SearchBar;
