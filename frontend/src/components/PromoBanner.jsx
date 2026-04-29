import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const PromoBanner = () => {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-16 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#BC9355] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#BC9355] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-start">
            <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
              {isRtl ? "عرض خاص" : "Special Offer"}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
              {isRtl
                ? "شحن مجاني للطلبات فوق 499 ر.س"
                : "Free Shipping on Orders Over SAR 499"}
            </h3>
            <p className="text-gray-400 mt-3 max-w-md">
              {isRtl
                ? "استمتع بتجربة تسوق بدون تكاليف الشحن مع طلباتك القادمة"
                : "Enjoy shopping without delivery fees on your next order. Limited time offer!"}
            </p>
          </div>

          <Link
            to="/collection"
            className="bg-[#BC9355] hover:bg-[#a67d40] text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-lg whitespace-nowrap"
          >
            {isRtl ? "تسوق الآن" : "Shop Now"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
