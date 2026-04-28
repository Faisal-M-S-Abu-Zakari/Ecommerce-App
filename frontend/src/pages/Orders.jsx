import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ShopContext from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";

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
  }, [token, navigate, getUserOrders]);

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

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Title text1={t.yourOrders} text2={""} />
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t.noOrders}</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{t.orderId}: {order._id.slice(0, 10)}...</p>
                    <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#BC9355]/10 text-[#BC9355] px-4 py-1 rounded-full text-sm font-medium">
                      {order.status}
                    </span>
                    <span className="text-gray-500 text-sm">{order.paymentMethod}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  {order.items.map((item, index) => {
                    const product = productMap[item.productId];
                    if (!product) return null;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 py-4"
                      >
                        <img className="w-16 h-20 object-cover rounded-xl" src={product.images?.[0]} alt={product.name} />
                        <div className="flex-1">
                          <p className="font-medium text-[#1A1A1A]">{product.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-gray-500 text-sm">
                            <span>{currency}{product.price}</span>
                            <span className="bg-gray-100 px-2 py-0.5 rounded">{item.size}</span>
                            <span>{t.qty}: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                  <span className="text-gray-500">{t.orderTotal}</span>
                  <span className="font-bold text-lg text-[#1A1A1A]">{currency}{order.amount}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;