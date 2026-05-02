import ShopContext from "../context/ShopContext";
import { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";

const getStoredCart = () => {
  try {
    const stored = localStorage.getItem("cartProducts");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartProducts, setCartProducts] = useState(getStoredCart);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const getUserId = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  const syncCartToBackend = async (cart) => {
    if (!token) return;
    try {
      await fetch(`${API_URL}/api/user/updatecart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: getUserId(), cartData: cart }),
      });
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  };

  const loadCart = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/user/getcart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: getUserId() }),
      });
      const data = await response.json();
      if (data.success && data.cartData) {
        const cartArray = Array.isArray(data.cartData)
          ? data.cartData
          : Object.values(data.cartData || {});
        setCartProducts(cartArray);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const loadUserProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success && data.user) setUser(data.user);
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  };

  const loadWishlist = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setWishlist(data.productIds || []);
    } catch (e) {
      console.error("Failed to load wishlist:", e);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!token) {
      toast.error("Please login to save items");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/wishlist/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(data.productIds || []);
        toast.success(data.added ? "Added to wishlist ❤️" : "Removed from wishlist");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      loadUserProfile();
      loadWishlist();
    } else {
      localStorage.removeItem("token");
      setWishlist([]);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    if (token && products.length > 0) loadCart();
  }, [token, products]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        setUser(data.user || { email });
        getUserOrders();
        toast.success("Logged in successfully");
        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        setUser({ name, email });
        toast.success("Registered successfully");
        return true;
      } else {
        toast.error(data.message || "Registration failed");
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setCartProducts([]);
    setOrders([]);
    setWishlist([]);
    setCoupon(null);
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/product/list`);
      const data = await response.json();
      if (data.success) setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    getUserOrders();

    const productInterval = setInterval(fetchProducts, 30000);
    const ordersInterval = setInterval(() => {
      if (token) getUserOrders();
    }, 30000);

    return () => {
      clearInterval(productInterval);
      clearInterval(ordersInterval);
    };
  }, []);

  const productMap = useMemo(() => {
    const map = {};
    products.forEach((p) => (map[p._id] = p));
    return map;
  }, [products]);

  const addToCart = (productId, size) => {
    if (!token) {
      navigate("/login");
      toast.error("Please login to add items to cart");
      return;
    }
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    setCartProducts((prev) => {
      const cart = Array.isArray(prev) ? prev : [];
      const existingItem = cart.find((item) => item?.productId === productId && item?.size === size);
      let newCart;
      if (existingItem) {
        newCart = cart.map((item) =>
          item?.productId === productId && item?.size === size
            ? { ...item, quantity: (item?.quantity || 0) + 1 }
            : item
        );
      } else {
        newCart = [...cart, { productId, size, quantity: 1 }];
      }
      if (token) syncCartToBackend(newCart);
      toast.success("Added to cart!");
      return newCart;
    });
  };

  const removeFromCart = (productId, size) => {
    const newCart = cartProducts.filter((item) => item.productId !== productId || item.size !== size);
    setCartProducts(newCart);
    if (token) syncCartToBackend(newCart);
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return;
    const newCart = cartProducts.map((item) =>
      item.productId === productId && item.size === size ? { ...item, quantity } : item
    );
    setCartProducts(newCart);
    if (token) syncCartToBackend(newCart);
  };

  const placeOrder = async (address, paymentMethod) => {
    if (!token) {
      toast.error("Please login to place an order");
      return { success: false };
    }
    try {
      const itemsWithDetails = cartProducts.map((item) => {
        const product = productMap[item.productId];
        return {
          productId: item.productId,
          name: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
          size: item.size,
        };
      });

      const discount = coupon ? coupon.discount : 0;
      const FREE_SHIPPING_THRESHOLD = 500;
      const freeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
      const shippingCost = freeShipping ? 0 : delivery_fee;
      const totalAmount = cartTotal + shippingCost - discount;

      const response = await fetch(`${API_URL}/api/order/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          userId: getUserId(),
          items: itemsWithDetails,
          amount: Math.max(0, totalAmount),
          address,
          paymentMethod,
          couponCode: coupon?.code,
          discount,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCartProducts([]);
        syncCartToBackend([]);
        setCoupon(null);
        getUserOrders();
        toast.success("Order placed successfully!");
        return { success: true, orderId: data.orderId };
      } else {
        toast.error(data.message);
        return { success: false };
      }
    } catch (error) {
      toast.error(error.message);
      return { success: false };
    }
  };

  const getUserOrders = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/order/userorders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: getUserId() }),
      });
      const data = await response.json();
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const CartCount = useMemo(() => {
    if (!Array.isArray(cartProducts)) return 0;
    return cartProducts.reduce((total, item) => total + (item?.quantity || 0), 0);
  }, [cartProducts]);

  const cartTotal = useMemo(() => {
    if (!Array.isArray(cartProducts)) return 0;
    return cartProducts.reduce((total, item) => {
      const product = productMap[item?.productId];
      return product ? total + product.price * (item?.quantity || 0) : total;
    }, 0);
  }, [cartProducts, productMap]);

  const value = {
    products,
    loading,
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
    API_URL,
    user,
    setUser,
    token,
    login,
    register,
    logout,
    orders,
    placeOrder,
    getUserOrders,
    getUserId,
    wishlist,
    toggleWishlist,
    coupon,
    setCoupon,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
