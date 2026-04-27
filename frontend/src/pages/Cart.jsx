import { useContext, useMemo, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartProducts,
    removeFromCart,
    updateQuantity,
    navigate,
    token,
  } = useContext(ShopContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  // in the cart i store products by their productId , quantity and size
  // But i need the other product info like name , price , image etc.
  // So i create a map of products where the key is the productId and the value is the product object
  // الحين انا كأني عملت اوبجيكت بيتكون من المفتاح يلي هو الاي دي و القيمة هي مكونات هذه المنتج
  // {
  //   "6437e4f7c7d4e5c4e5c4e5c4" :{ name: "Product 1", price: 100, image: "image.jpg", quantity: 2, size: "M"}
  //   "6437e4f7c7d4e5c4e5c4e5c5" : {name: "Product 2", price: 200, image: "image2.jpg", quantity: 1, size: "L"}
  // And so on for all products in the App
  // }

  const productMap = useMemo(() => {
    const map = {};
    products.forEach((item) => {
      map[item._id] = item;
    });
    return map;
  }, [products]);

  return (
    <div className="pt-14 border-t">
      <div className="mb-3 text-2xl">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {/* here i will render only the products that were added to the cart , so i will map on cart Products and take there info from the map */}
        {cartProducts.map((cartItem) => {
          const productInfo = productMap[cartItem?.productId];

          if (!productInfo) return null;

          const productImage = productInfo.images?.[0] || productInfo.image?.[0];

          return (
            <div
              key={`${cartItem.productId}-${cartItem.size}`}
              className="items-center gap-4 grid grid-cols-[4fr_1fr_1fr_1fr] py-4 border-b text-gray-700"
            >
              {/* Product Info */}
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
                onClick={() =>
                  removeFromCart(cartItem.productId, cartItem.size)
                }
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
    </div>
  );
};

export default Cart;
