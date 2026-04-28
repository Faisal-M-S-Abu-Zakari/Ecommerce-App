import { useContext, useState, useEffect } from "react";
import { assets } from "./../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowSearch, CartCount, token, logout } = useContext(ShopContext);
  const { isRtl, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    if (!pathname.startsWith("/collection")) {
      navigate("/collection");
    }
    setShowSearch(true);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button className="md:hidden p-2" onClick={() => setVisible(true)}>
            <svg
              className="w-6 h-6 text-[#1A1A1A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex-1 flex justify-center md:justify-start">
            <Link to={"/"} className="shrink-0">
              <h1 className="text-2xl font-bold tracking-tighter text-[#1A1A1A]">
                FAISAL<span className="text-[#BC9355]">.</span>
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#BC9355]"
                    : "text-gray-500 hover:text-[#BC9355]"
                }`
              }
            >
              {t.home}
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#BC9355]"
                    : "text-gray-500 hover:text-[#BC9355]"
                }`
              }
            >
              {t.collection}
            </NavLink>
            <NavLink
              to="/bestseller"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#BC9355]"
                    : "text-gray-500 hover:text-[#BC9355]"
                }`
              }
            >
              {t.bestSeller}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#BC9355]"
                    : "text-gray-500 hover:text-[#BC9355]"
                }`
              }
            >
              {t.about}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#BC9355]"
                    : "text-gray-500 hover:text-[#BC9355]"
                }`
              }
            >
              {t.contact}
            </NavLink>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold border border-[#1A1A1A] px-2 py-1 rounded hover:bg-[#1A1A1A] hover:text-white transition-all"
            >
              {isRtl ? "EN" : "عربي"}
            </button>
            <button
              onClick={handleSearchClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={assets.search_icon} className="w-5 h-5" alt="" />
            </button>

            {token ? (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <img src={assets.profile_icon} className="w-5 h-5" alt="" />
                </button>
                <div className="hidden group-hover:block absolute end-0 top-full pt-4 z-50">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 w-40">
                    <button
                      onClick={() => navigate("/orders")}
                      className="block w-full text-start px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      {t.orders}
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-start px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      {t.logout}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img src={assets.profile_icon} className="w-5 h-5" alt="" />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={assets.cart_icon} className="w-5 h-5" alt="" />
              {CartCount > 0 && (
                <span className="absolute top-0 end-0 bg-[#BC9355] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {CartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {visible && (
        <div
          className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setVisible(false)}
        >
          <div
            className={`absolute top-0 bottom-0 w-[80%] bg-white p-10 ${
              isRtl ? "start-0" : "end-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={() => setVisible(false)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <Link
                to="/"
                onClick={() => setVisible(false)}
                className="text-2xl font-bold hover:text-[#BC9355]"
              >
                {t.home}
              </Link>
              <Link
                to="/collection"
                onClick={() => setVisible(false)}
                className="text-2xl font-bold hover:text-[#BC9355]"
              >
                {t.collection}
              </Link>
              <Link
                to="/bestseller"
                onClick={() => setVisible(false)}
                className="text-2xl font-bold hover:text-[#BC9355]"
              >
                {t.bestSeller}
              </Link>
              <Link
                to="/about"
                onClick={() => setVisible(false)}
                className="text-2xl font-bold hover:text-[#BC9355]"
              >
                {t.about}
              </Link>
              <Link
                to="/contact"
                onClick={() => setVisible(false)}
                className="text-2xl font-bold hover:text-[#BC9355]"
              >
                {t.contact}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
