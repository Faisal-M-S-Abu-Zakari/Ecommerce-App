import { useContext, useMemo, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

const Cart = () => {
  const {
    products,
    currency,
    cartProducts,
    removeFromCart,
    updateQuantity,
    navigate,
    token,
    loading,
  } = useContext(ShopContext);
  const { t } = useLanguage();

  const productMap = useMemo(() => {
    const map = {};
    if (products && Array.isArray(products)) {
      products.forEach((item) => {
        map[item._id] = item;
      });
    }
    return map;
  }, [products]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  if (loading) {
    return (
      <div className="py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title text1={t.yourCart} text2={""} />
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500">{t.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Title text1={t.yourCart} text2={""} />
        </div>

        {!cartProducts || cartProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <img src={assets.cart_icon} alt="" className="w-20 h-20 opacity-30" />
            <p className="mt-4 text-gray-500 text-lg">{t.cartEmpty}</p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-[#BC9355] mt-4 px-8 py-3 rounded-full text-white font-bold text-sm cursor-pointer hover:bg-[#a67d40] transition-all"
            >
              {t.continueShopping}
            </button>
          </div>
        ) : (
          <>
            <div>
              {cartProducts.map((cartItem) => {
                const productInfo = productMap[cartItem?.productId];

                if (!productInfo) return null;

                const productImage = productInfo.images?.[0] || productInfo.image?.[0];

                return (
                  <div
                    key={`${cartItem.productId}-${cartItem.size}`}
                    className="flex items-center gap-6 py-6 border-b border-gray-100"
                  >
                    <img
                      src={productImage || "https://via.placeholder.com/100"}
                      alt={productInfo.name}
                      className="w-20 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#1A1A1A] line-clamp-1">
                        {productInfo.name}
                      </h4>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="font-semibold text-[#BC9355]">
                          {currency} {productInfo.price}
                        </p>
                        <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                          {cartItem.size}
                        </span>
                      </div>
                    </div>
                    <input
                      type="number"
                      className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-center"
                      min={1}
                      value={cartItem.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          cartItem.productId,
                          cartItem.size,
                          Number(e.target.value),
                        )
                      }
                    />
                    <button
                      onClick={() => {
                        removeFromCart(cartItem.productId, cartItem.size);
                        toast.success("Item removed from cart");
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <img src={assets.bin_icon} alt="" className="w-5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end mt-10">
              <div className="w-full max-w-md">
                <CartTotal />
                <div className="w-full text-end">
                  <button
                    onClick={() => navigate("/place-order")}
                    className="bg-[#BC9355] my-8 px-8 py-4 rounded-full text-white font-bold text-sm cursor-pointer hover:bg-[#a67d40] transition-all hover:shadow-lg"
                  >
                    {t.proceedCheckout}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;