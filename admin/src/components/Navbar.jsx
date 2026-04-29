const Navbar = ({ setToken }) => {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 flex justify-between items-center px-6 py-4 shadow-sm">
      <div className="flex-1 flex justify-center md:justify-start">
        <a href={"/"} className="shrink-0">
          <h1 className="text-2xl font-bold tracking-tighter text-[#1A1A1A]">
            FAISAL<span className="text-[#BC9355]">.</span>
            <span className="ml-2 text-xs font-normal text-gray-500 uppercase tracking-widest border-l border-gray-300 pl-2">Admin</span>
          </h1>
        </a>
      </div>
      <button
        onClick={() => setToken("")}
        className="bg-[#1A1A1A] hover:bg-[#BC9355] transition-colors px-6 py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
