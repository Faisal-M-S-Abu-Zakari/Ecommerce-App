import { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import ShopContext from "../context/ShopContext";
const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, CartCount } = useContext(ShopContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleSearchClick = () => {
    if (!pathname.startsWith("/collection")) {
      navigate("/collection");
    }
    setShowSearch(true);
  };
  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-gray-700 text-sm">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={handleSearchClick}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          <Link to={"/login"}>
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          </Link>
          <div className="hidden group-hover:block right-0 absolute pt-4 dropdown-menu">
            <div className="flex flex-col gap-2 bg-slate-100 px-5 py-3 rounded w-36 text-gray-500">
              <p className="hover:text-black cursor-pointer">My Profile</p>
              <p className="hover:text-black cursor-pointer">Orders</p>
              <p className="hover:text-black cursor-pointer">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 cursor-pointer"
            alt=""
          />
          <p className="-right-1.25 -bottom-1.25 absolute bg-black rounded-full w-4 aspect-square text-[8px] text-white text-center leading-4">
            {CartCount}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="sm:hidden w-5 cursor-pointer"
          alt=""
        />
      </div>
      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={"/collection"}
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={"/about"}
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={"/contact"}
          >
            CONATCT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
