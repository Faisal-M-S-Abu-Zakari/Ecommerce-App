import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const NotFound = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
          {isRtl ? "الصفحة غير موجودة" : "Page Not Found"}
        </h2>
        <p className="text-gray-500 mb-8">
          {isRtl
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <Link
          to="/"
          className="bg-[#BC9355] text-white px-8 py-3 rounded-full font-bold hover:bg-[#a67d40] transition-colors inline-block"
        >
          {isRtl ? "العودة للرئيسية" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;