import { assets } from "./../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-bold tracking-tighter text-[#1A1A1A]">
          FAISAL<span className="text-[#BC9355]">.</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-500">
          <Link to="/" className="hover:text-[#BC9355] transition-colors">
            Privacy
          </Link>
          <Link to="/about" className="hover:text-[#BC9355] transition-colors">
            Terms
          </Link>
          <Link to="/collection" className="hover:text-[#BC9355] transition-colors">
            Shipping
          </Link>
        </div>
        <div className="text-sm text-gray-400">
          © 2026 FAISAL E-commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;