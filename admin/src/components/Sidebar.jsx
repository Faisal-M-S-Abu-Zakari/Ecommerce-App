import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="border-r border-gray-200 w-[18%] min-h-[calc(100vh-64px)] bg-white shadow-soft hidden md:block">
      <div className="flex flex-col gap-2 pt-8 px-4 text-[15px]">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive ? "bg-[#BC9355]/10 text-[#BC9355] font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
          to="/"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <p className="hidden md:block">Dashboard</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive ? "bg-[#BC9355]/10 text-[#BC9355] font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
          to="/add"
        >
          <img className="w-5 h-5 opacity-70" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive ? "bg-[#BC9355]/10 text-[#BC9355] font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
          to="/list"
        >
          <img className="w-5 h-5 opacity-70" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive ? "bg-[#BC9355]/10 text-[#BC9355] font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
          to="/orders"
        >
          <img className="w-5 h-5 opacity-70" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive ? "bg-[#BC9355]/10 text-[#BC9355] font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
          to="/comments"
        >
          <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <p className="hidden md:block">Comments</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
