import { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import ShopContext from "../context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, CartCount, token, logout } = useContext(ShopContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearchClick = () => {
    if (!pathname.startsWith("/collection")) {
      navigate("/collection");
    }
    setShowSearch(true);
  };

return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="flex-shrink-0">
            <img src={assets.logo} className="h-8" alt="" />
          </Link>
          
          <div className="hidden sm:flex items-center space-x-8">
            <NavLink to="/" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
              Home
            </NavLink>
            <NavLink to="/collection" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
              Collection
            </NavLink>
            <NavLink to="/about" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
              Contact
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handleSearchClick} className="p-2 text-gray-400 hover:text-black transition-colors">
              <img src={assets.search_icon} className="w-5 h-5" alt="" />
            </button>
            
            {token ? (
              <div className="relative group">
                <button className="p-2 text-gray-400 hover:text-black transition-colors">
                  <img src={assets.profile_icon} className="w-5 h-5" alt="" />
                </button>
                <div className="hidden group-hover:block absolute right-0 top-full pt-4">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 w-40">
                    <button onClick={() => navigate("/orders")} className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Orders</button>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to={"/login"} className="p-2 text-gray-400 hover:text-black transition-colors">
                <img src={assets.profile_icon} className="w-5 h-5" alt="" />
              </Link>
            )}
            
            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-black transition-colors">
              <img src={assets.cart_icon} className="w-5 h-5" alt="" />
              {CartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {CartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
