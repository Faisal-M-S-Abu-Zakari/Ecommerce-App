import { assets } from "./../assets/assets";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-bold tracking-tighter text-[#1A1A1A]">
          FAISAL<span className="text-[#BC9355]">.</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-500">
          <Link to="/" className="hover:text-[#BC9355] transition-colors">
            {t.privacy}
          </Link>
          <Link to="/about" className="hover:text-[#BC9355] transition-colors">
            {t.terms}
          </Link>
          <Link to="/collection" className="hover:text-[#BC9355] transition-colors">
            {t.shipping}
          </Link>
        </div>
        <div className="text-sm text-gray-400">
          © 2026 FAISAL E-commerce. {t.allRights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;