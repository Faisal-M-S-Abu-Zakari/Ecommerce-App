import ShopContext from "../context/ShopContext";
import { products } from "../assets/assets";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  // map for faster lookup
  const productMap = useMemo(() => {
    const map = {};
    products.forEach((p) => (map[p._id] = p));
    return map;
  }, []);

  const addToCart = (productId, size) => {
    // if the user doesn't select a size then show an error message
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    // check if the product is already in the cart
    // then you will update the quantity , otherwise you will add it to the cart
    // add new product to the cart

    // So , here if i add {productId: 1, size: 'M'} and then i add {productId: 1, size: 'L'} , the second one will be added to the cart as new product

    setCartProducts((prev) => {
      const existingItem = prev.find(
        (item) => item.productId === productId && item.size === size,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { productId, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartProducts((prev) =>
      prev.filter((item) => item.productId !== productId || item.size !== size),
    );
  };
  // if user make any change to the quantity :
  // first , the min number is 1
  // second : i will change the product quantity in the cart .
  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return; // منع الرقم أقل من 1
    setCartProducts((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? // here i will keep the item info , but i will change the quantity by passing the value to the object
            { ...item, quantity }
          : item,
      ),
    );
  };
  const CartCount = useMemo(() => {
    return cartProducts.reduce((total, item) => total + item.quantity, 0);
  }, [cartProducts]);

  const cartTotal = useMemo(() => {
    return cartProducts.reduce((total, item) => {
      const product = productMap[item.productId];
      return product ? total + product.price * item.quantity : total;
    }, 0);
  }, [cartProducts, productMap]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartProducts,
    addToCart,
    CartCount,
    removeFromCart,
    updateQuantity,
    cartTotal,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
