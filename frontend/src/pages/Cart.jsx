import { useContext, useMemo, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

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
      <div className="pt-14 border-t">
        <div className="mb-3 text-2xl">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-14 border-t">
      <div className="mb-3 text-2xl">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {(!cartProducts || cartProducts.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img src={assets.cart_icon} alt="" className="w-20 h-20 opacity-30" />
          <p className="mt-4 text-gray-500 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black mt-4 px-8 py-3 text-white text-sm cursor-pointer"
          >
            CONTINUE SHOPPING
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
                  className="items-center gap-4 grid grid-cols-[4fr_1fr_1fr_1fr] py-4 border-b text-gray-700"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={productImage || "https://via.placeholder.com/100"}
                      alt={productInfo.name}
                      className="w-16 sm:w-20"
                    />
                    <div>
                      <p className="font-medium text-xs sm:text-lg">
                        {productInfo.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency} {productInfo.price}
                        </p>
                        <p className="bg-slate-50 px-2 sm:px-3 sm:py-1 border">
                          {cartItem.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    className=""
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
                  <img
                    src={assets.bin_icon}
                    alt=""
                    className="mr-4 w-4 sm:w-5 cursor-pointer"
                    onClick={() => {
                      removeFromCart(cartItem.productId, cartItem.size);
                      toast.success("Item removed from cart");
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-112.5">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black my-8 px-8 py-3 text-white text-sm cursor-pointer"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
