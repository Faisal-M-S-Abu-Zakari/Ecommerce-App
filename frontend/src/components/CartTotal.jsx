import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import Title from "./Title";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";

const FREE_SHIPPING_THRESHOLD = 500;

const CartTotal = () => {
  const { currency, delivery_fee, cartTotal, token, API_URL, coupon, setCoupon } = useContext(ShopContext);
  const { t } = useLanguage();
  const [couponCode, setCouponCode] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const subtotal = cartTotal;
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = subtotal > 0 ? (freeShipping ? 0 : delivery_fee) : 0;
  const discount = coupon ? coupon.discount : 0;
  const total = subtotal + shippingCost - discount;
  const progressPct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    if (!token) { toast.error(t.pleaseLogin); return; }
    setLoadingCoupon(true);
    try {
      const res = await fetch(`${API_URL}/api/coupon/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ code: couponCode, orderAmount: subtotal }),
      });
      const data = await res.json();
      if (data.success) {
        setCoupon(data.coupon);
        toast.success(`${t.couponApplied}: -${currency}${data.coupon.discount}`);
        setCouponCode("");
      } else {
        toast.error(data.message);
      }
    } catch (e) { toast.error(e.message); }
    setLoadingCoupon(false);
  };

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={t.yourCart.toUpperCase()} text2={t.total.toUpperCase()} />
      </div>

      {subtotal > 0 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-[#BC9355]/10 to-[#BC9355]/5 rounded-xl border border-[#BC9355]/20">
          {freeShipping ? (
            <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
              🎉 {t.freeShippingUnlocked}
            </p>
          ) : (
            <div>
              <p className="text-xs text-gray-600 mb-2">
                {t.freeShippingProgress ? t.freeShippingProgress.replace("{amount}", `${currency}${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(0)}`) : `Add ${currency}${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(0)} more for free shipping`}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-[#BC9355] h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>{t.subtotal}</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>{t.shipping}</p>
          <p className={freeShipping && subtotal > 0 ? "text-green-500 font-semibold" : ""}>
            {subtotal > 0 ? (freeShipping ? (t.free || "Free") : `${currency} ${shippingCost}`) : `${currency} 0`}
          </p>
        </div>
        {coupon && (
          <>
            <hr />
            <div className="flex justify-between text-green-600">
              <p className="flex items-center gap-1">
                🏷️ {t.couponDiscount || "Discount"} ({coupon.code})
                <button onClick={() => setCoupon(null)} className="ml-1 text-gray-400 hover:text-red-400 text-xs">✕</button>
              </p>
              <p>- {currency} {coupon.discount.toFixed(2)}</p>
            </div>
          </>
        )}
        <hr />
        <div className="flex justify-between font-bold">
          <b>{t.total}</b>
          <b>{currency} {Math.max(0, total).toFixed(2)}</b>
        </div>
      </div>

      {!coupon && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-600 mb-2">{t.haveCoupon || "Have a coupon?"}</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
              placeholder={t.enterCouponCode || "Enter code"}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BC9355] uppercase"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={loadingCoupon}
              className="bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#BC9355] transition-colors disabled:opacity-60"
            >
              {loadingCoupon ? "..." : (t.apply || "Apply")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTotal;
