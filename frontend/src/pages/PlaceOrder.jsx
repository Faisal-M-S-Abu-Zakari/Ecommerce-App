import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import ShopContext from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [address, setAddress] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { navigate, token, placeOrder, cartProducts, user } = useContext(ShopContext);
  const { t } = useLanguage();

  useEffect(() => {
    if (!token) navigate("/login");
    else if (!cartProducts || cartProducts.length === 0) navigate("/collection");
  }, [token, navigate, cartProducts]);

  useEffect(() => {
    if (user?.email && !address.email) {
      setAddress((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  if (!token || !cartProducts || cartProducts.length === 0) return null;

  const handleInput = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const result = await placeOrder(address, method);
    setIsSubmitting(false);
    if (result.success) {
      navigate("/order-success", { state: { orderId: result.orderId } });
    }
  };

  const inputClass = "px-4 py-3 border border-gray-200 rounded-xl w-full focus:outline-none focus:border-[#BC9355] transition-colors text-sm";

  return (
    <form onSubmit={onSubmitHandler} className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">{t.checkout}</span>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mt-2">{t.placeOrder}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-6 text-[#1A1A1A]">{t.deliveryInfo}</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input required name="firstName" onChange={handleInput} value={address.firstName} className={inputClass} type="text" placeholder={t.firstName} />
                <input required name="lastName" onChange={handleInput} value={address.lastName} className={inputClass} type="text" placeholder={t.lastName} />
              </div>
              <input required name="email" onChange={handleInput} value={address.email} className={inputClass} type="email" placeholder={t.email} />
              <input required name="street" onChange={handleInput} value={address.street} className={inputClass} type="text" placeholder={t.street} />
              <div className="flex gap-4">
                <input required name="city" onChange={handleInput} value={address.city} className={inputClass} type="text" placeholder={t.city} />
                <input required name="state" onChange={handleInput} value={address.state} className={inputClass} type="text" placeholder={t.state} />
              </div>
              <div className="flex gap-4">
                <input required name="zipcode" onChange={handleInput} value={address.zipcode} className={inputClass} type="text" placeholder={t.zipcode} />
                <input required name="country" onChange={handleInput} value={address.country} className={inputClass} type="text" placeholder={t.country} />
              </div>
              <input required name="phone" onChange={handleInput} value={address.phone} className={inputClass} type="tel" placeholder={t.phone} />
            </div>
          </div>

          <div className="lg:w-100">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 text-[#1A1A1A]">{t.paymentMethod}</h2>
              <div className="flex flex-col gap-3">
                {[
                  { id: "stripe", label: t.stripe, img: assets.stripe_logo },
                  { id: "razorpay", label: t.razorpay, img: assets.razorpay_logo },
                  { id: "cod", label: t.cod, img: null },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      method === m.id ? "border-[#BC9355] bg-[#BC9355]/5" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${method === m.id ? "bg-[#BC9355] border-[#BC9355]" : "border-gray-300"}`} />
                    {m.img && <img src={m.img} alt="" className="h-5" />}
                    <span className="font-medium text-sm">{m.label}</span>
                  </div>
                ))}
              </div>

              {method === "cod" && (
                <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-xs text-amber-700 font-medium">💰 Pay in cash when your order is delivered</p>
                </div>
              )}

              <div className="mt-6">
                <CartTotal />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#BC9355] w-full mt-6 py-4 rounded-full text-white font-bold hover:bg-[#a67d40] transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : t.placeOrder}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
