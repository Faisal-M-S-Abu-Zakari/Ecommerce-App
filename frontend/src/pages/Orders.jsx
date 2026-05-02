import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ShopContext from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";

const STATUS_STEPS = [
  { key: "Order Placed", icon: "📋" },
  { key: "Packing", icon: "📦" },
  { key: "Shipped", icon: "🚚" },
  { key: "Out for Delivery", icon: "🏃" },
  { key: "Delivered", icon: "✅" },
];

const StatusTimeline = ({ status }) => {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === status);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        {STATUS_STEPS.map((step, i) => (
          <div key={step.key} className="flex flex-col items-center flex-1">
            <div className="relative flex items-center w-full">
              {i > 0 && (
                <div className={`flex-1 h-0.5 ${i <= activeIndex ? "bg-[#BC9355]" : "bg-gray-200"}`} />
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 border-2 transition-all ${
                i <= activeIndex
                  ? "bg-[#BC9355] border-[#BC9355] text-white"
                  : "bg-white border-gray-200 text-gray-400"
              }`}>
                {i <= activeIndex ? "✓" : i + 1}
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < activeIndex ? "bg-[#BC9355]" : "bg-gray-200"}`} />
              )}
            </div>
            <span className={`text-[9px] mt-1 text-center font-medium hidden sm:block ${i <= activeIndex ? "text-[#BC9355]" : "text-gray-400"}`}>
              {step.key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Orders = () => {
  const { currency, token, navigate, products, getUserOrders, orders } = useContext(ShopContext);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserOrders().finally(() => setLoading(false));
    }
  }, [token]);

  if (!token || loading) return null;

  const productMap = {};
  products.forEach((p) => (productMap[p._id] = p));

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      "Order Placed": "bg-blue-50 text-blue-600",
      "Packing": "bg-yellow-50 text-yellow-600",
      "Shipped": "bg-purple-50 text-purple-600",
      "Out for Delivery": "bg-orange-50 text-orange-600",
      "Delivered": "bg-green-50 text-green-600",
      "Cancelled": "bg-red-50 text-red-600",
    };
    return colors[status] || "bg-[#BC9355]/10 text-[#BC9355]";
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">{t.account}</span>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mt-2">{t.yourOrders}</h1>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">{t.noOrders}</p>
              <p className="text-gray-400 text-sm mb-6">Start shopping to see your orders here</p>
              <button
                onClick={() => navigate("/collection")}
                className="bg-[#BC9355] px-8 py-3 rounded-full text-white font-bold text-sm hover:bg-[#a67d40] transition-all"
              >
                {t.continueShopping}
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#BC9355]/20 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <p className="font-bold text-[#1A1A1A]">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5">{formatDate(order.date)}</p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">{order.paymentMethod}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="font-bold text-lg text-[#1A1A1A]">{currency}{order.amount}</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {order.items.map((item, index) => {
                    const product = productMap[item.productId];
                    return (
                      <div key={index} className="flex items-center gap-4 py-3">
                        {product ? (
                          <img className="w-14 h-18 object-cover rounded-lg shrink-0" src={product.images?.[0]} alt={product.name} />
                        ) : (
                          <div className="w-14 h-18 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#1A1A1A] truncate">{item.name || product?.name || "Product"}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{item.size}</span>
                            <span>×{item.quantity}</span>
                            <span className="text-[#BC9355] font-semibold">{currency}{item.price || product?.price}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {order.status !== "Delivered" && order.status !== "Cancelled" && (
                  <StatusTimeline status={order.status} />
                )}

                {order.address && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-semibold mb-1">DELIVERY ADDRESS</p>
                    <p className="text-sm text-gray-600">
                      {order.address.firstName} {order.address.lastName} — {order.address.street}, {order.address.city}, {order.address.country}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
