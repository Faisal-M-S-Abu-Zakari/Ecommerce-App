const Navbar = ({ setToken }) => {
  return (
    <div className="flex justify-between items-center px-[4%] py-2">
      <div className="flex-1 flex justify-center md:justify-start">
        <a href={"/"} className="shrink-0">
          <h1 className="text-2xl font-bold tracking-tighter text-[#1A1A1A]">
            FAISAL<span className="text-[#BC9355]">.</span>
          </h1>
        </a>
      </div>
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 px-5 sm:px-7 py-2 sm:py-2 rounded-full text-white text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
