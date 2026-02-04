import { assets } from "./../assets/assets";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <img src={assets.logo} className="w-36" alt="" />
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
        <img src={assets.search_icon} className="w-5 cursor-pointer" alt="" />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
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
          <p className="absolute bg-black rounded-full w-4 aspect-square text-[8px] text-white text-center leading-4 -right[-5px] -bottom[-5px]">
            0
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
