import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import ShopContext from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const { navigate, token, placeOrder, cartProducts } = useContext(ShopContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (!cartProducts || cartProducts.length === 0) {
      navigate("/collection");
    }
  }, [token, navigate, cartProducts]);

  if (!token || !cartProducts || cartProducts.length === 0) return null;

  const handleInput = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (cartProducts.length === 0) {
      navigate("/collection");
      return;
    }
    const result = await placeOrder(address, method);
    if (result.success) {
      navigate("/orders");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex sm:flex-row flex-col justify-between gap-4 pt-5 sm:pt-14 border-t min-h-[80vh]">
      {/* ------- Left Side ----- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="firstName"
            onChange={handleInput}
            value={address.firstName}
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={handleInput}
            value={address.lastName}
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={handleInput}
          value={address.email}
          className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={handleInput}
          value={address.street}
          className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            name="city"
            onChange={handleInput}
            value={address.city}
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={handleInput}
            value={address.state}
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            onChange={handleInput}
            value={address.zipcode}
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            type="number"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={handleInput}
            value={address.country}
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={handleInput}
          value={address.phone}
          className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
          type="number"
          placeholder="Phone"
        />
      </div>
      {/*------- Right Side ----------  */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ------------ Payment Method Selection */}
          <div className="flex lg:flex-row flex-col gap-3">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""} `}
              ></p>
              <img className="mx-4 h-5" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""} `}
              ></p>
              <img className="mx-4 h-5" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""} `}
              ></p>
              <p className="mx-4 font-medium text-muted text-sm">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="mt-8 w-full text-end">
            <button
              type="submit"
              className="bg-black px-16 py-3 text-white text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
