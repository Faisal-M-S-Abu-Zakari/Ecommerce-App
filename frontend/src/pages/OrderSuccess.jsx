import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const OrderSuccess = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const orderId = location.state?.orderId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-20 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-4 text-center">
        <div className="relative mb-8">
          <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mx-auto animate-bounce-once">
            <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full bg-green-100 animate-ping opacity-20"></div>
        </div>

        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-3">{t.orderSuccess}</h1>
        <p className="text-gray-500 mb-2">{t.orderSuccessSub}</p>
        {orderId && (
          <p className="text-sm text-gray-400 mb-8">
            {t.orderId}: <span className="font-mono font-bold text-[#BC9355]">#{orderId.slice(-8).toUpperCase()}</span>
          </p>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left">
          <h3 className="font-semibold text-[#1A1A1A] mb-4 text-center">{t.whatHappensNext}</h3>
          <div className="space-y-4">
            {[
              { icon: "📧", label: t.nextStep1 },
              { icon: "📦", label: t.nextStep2 },
              { icon: "🚚", label: t.nextStep3 },
              { icon: "🏠", label: t.nextStep4 },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#BC9355]/10 rounded-full flex items-center justify-center text-sm shrink-0">
                  {step.icon}
                </div>
                <p className="text-sm text-gray-600">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/orders"
            className="bg-[#BC9355] px-8 py-3 rounded-full text-white font-bold text-sm hover:bg-[#a67d40] transition-all hover:shadow-lg"
          >
            {t.trackOrder}
          </Link>
          <Link
            to="/collection"
            className="bg-white border border-gray-200 px-8 py-3 rounded-full text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all"
          >
            {t.continueShopping}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
