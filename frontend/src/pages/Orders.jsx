import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ShopContext from "../context/ShopContext";

const Orders = () => {
  const { currency, token, navigate, products, getUserOrders, orders } = useContext(ShopContext);
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
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orders.length === 0 ? (
          <p className="py-8 text-gray-500">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="border-t border-b py-4">
              <div className="flex flex-col gap-2 mb-4">
                <p className="font-medium">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">Date: {formatDate(order.date)}</p>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
                <p className="text-sm text-gray-500">Payment: {order.paymentMethod}</p>
              </div>
              {order.items.map((item, index) => {
                const product = productMap[item.productId];
                if (!product) return null;
                return (
                  <div
                    key={index}
                    className="flex md:flex-row flex-col md:justify-between items-center gap-4 py-4 border-b last:border-b-0 text-gray-700"
                  >
                    <div className="flex items-start gap-6 text-sm">
                      <img className="w-16 sm:w-20" src={product.images?.[0]} alt={product.name} />
                      <div>
                        <p className="font-medium sm:text-base">{product.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-gray-500 text-base">
                          <p className="text-lg">
                            {currency}
                            {product.price}
                          </p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Size: {item.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="bg-green-500 rounded-full min-w-2 h-2"></p>
                      <p className="text-sm md:text-base">{order.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
