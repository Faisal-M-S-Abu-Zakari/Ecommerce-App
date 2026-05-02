import { useContext, useState, useEffect } from "react";
import { assets } from "./../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowSearch, CartCount, token, logout, wishlist } = useContext(ShopContext);
  const { isRtl, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  const handleSearchClick = () => {
    if (!pathname.startsWith("/collection")) navigate("/collection");
    setShowSearch(true);
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors py-2 ${isActive ? "text-[#BC9355]" : "text-gray-500 hover:text-[#BC9355]"}`;

  const navLinkContent = ({ isActive }, label) => (
    <>
      {label}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#BC9355] transition-all duration-300 ${isActive ? "w-full" : "w-0"}`} />
    </>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-out ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-lg py-2 border-b border-gray-100/50" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all" onClick={() => setVisible(true)}>
            <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1 flex justify-center md:justify-start">
            <Link to="/" className="shrink-0 group">
              <h1 className="text-2xl font-bold tracking-tighter text-[#1A1A1A] transition-transform duration-300 group-hover:scale-105">
                FAISAL<span className="text-[#BC9355]">.</span>
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center gap-8">
            {[
              { to: "/", label: t.home },
              { to: "/collection", label: t.collection },
              { to: "/bestseller", label: t.bestSeller },
              { to: "/about", label: t.about },
              { to: "/contact", label: t.contact },
            ].map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"} className={navLinkClass}>
                {(state) => navLinkContent(state, label)}
              </NavLink>
            ))}
          </div>

          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold border border-[#1A1A1A] px-2 py-1.5 rounded hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer"
            >
              {isRtl ? "EN" : "عربي"}
            </button>

            <button onClick={handleSearchClick} className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
              <img src={assets.search_icon} className="w-5 h-5" alt="" />
            </button>

            {token ? (
              <>
                <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600" fill={wishlist?.length > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" className={wishlist?.length > 0 ? "text-red-500" : "text-gray-600"} />
                  </svg>
                  {wishlist?.length > 0 && (
                    <span className="absolute top-0 end-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <div className="relative group">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
                    <img src={assets.profile_icon} className="w-5 h-5" alt="" />
                  </button>
                  <div className="hidden group-hover:block absolute end-0 top-full pt-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-44 overflow-hidden">
                      <button onClick={() => navigate("/profile")} className="block w-full text-start px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#BC9355] transition-colors">
                        {t.myProfile}
                      </button>
                      <button onClick={() => navigate("/orders")} className="block w-full text-start px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#BC9355] transition-colors">
                        {t.orders}
                      </button>
                      <button onClick={() => navigate("/wishlist")} className="block w-full text-start px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#BC9355] transition-colors">
                        {t.wishlist}
                      </button>
                      <hr className="my-1" />
                      <button onClick={logout} className="block w-full text-start px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-colors">
                        {t.logout}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
                <img src={assets.profile_icon} className="w-5 h-5" alt="" />
              </Link>
            )}

            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
              <img src={assets.cart_icon} className="w-5 h-5" alt="" />
              {CartCount > 0 && (
                <span className="absolute top-0 end-0 bg-[#BC9355] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {CartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {visible && (
        <div className="fixed inset-0 z-[100] md:hidden" onClick={() => setVisible(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className={`absolute top-0 bottom-0 w-[85%] max-w-xs bg-white p-8 shadow-2xl transition-transform duration-300 ${isRtl ? "start-0 rtl:-translate-x-0" : "end-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-xl font-bold text-[#1A1A1A]">FAISAL<span className="text-[#BC9355]">.</span></h1>
              <button onClick={() => setVisible(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {[
                { to: "/", label: t.home },
                { to: "/collection", label: t.collection },
                { to: "/bestseller", label: t.bestSeller },
                { to: "/about", label: t.about },
                { to: "/contact", label: t.contact },
              ].map(({ to, label }) => (
                <Link key={to} to={to} onClick={() => setVisible(false)} className="text-lg font-semibold text-[#1A1A1A] hover:text-[#BC9355] transition-colors py-3 border-b border-gray-100">
                  {label}
                </Link>
              ))}

              {token ? (
                <>
                  <Link to="/profile" onClick={() => setVisible(false)} className="text-lg font-semibold text-[#1A1A1A] hover:text-[#BC9355] transition-colors py-3 border-b border-gray-100">
                    {t.myProfile}
                  </Link>
                  <Link to="/orders" onClick={() => setVisible(false)} className="text-lg font-semibold text-[#1A1A1A] hover:text-[#BC9355] transition-colors py-3 border-b border-gray-100">
                    {t.orders}
                  </Link>
                  <Link to="/wishlist" onClick={() => setVisible(false)} className="text-lg font-semibold text-[#1A1A1A] hover:text-[#BC9355] transition-colors py-3 border-b border-gray-100">
                    {t.wishlist} {wishlist?.length > 0 && `(${wishlist.length})`}
                  </Link>
                  <button onClick={() => { logout(); setVisible(false); }} className="text-lg font-semibold text-red-500 hover:text-red-600 transition-colors py-3 text-start">
                    {t.logout}
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setVisible(false)} className="text-lg font-semibold text-[#BC9355] hover:text-[#a67d40] transition-colors py-3">
                  {t.login}
                </Link>
              )}
            </div>

            <div className="absolute bottom-8 start-8">
              <button onClick={toggleLanguage} className="text-xs font-bold border border-[#1A1A1A] px-4 py-2 rounded hover:bg-[#1A1A1A] hover:text-white transition-all">
                {isRtl ? "Switch to English" : "التبديل للعربية"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
