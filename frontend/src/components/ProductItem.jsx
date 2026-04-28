import React, { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

const ProductItem = ({ id, image, name, price, rating = 4.5 }) => {
  const { currency, addToCart, token } = useContext(ShopContext);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedSize] = useState("M");

  const imageUrl =
    image && image.length > 0
      ? image[0]
      : image && image[0] !== undefined
      ? image
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      toast.error(t.pleaseLogin || "Please login to add items to cart");
      return;
    }
    addToCart(id, selectedSize);
    toast.success(t.addedToCart || "Added to cart!");
  };

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-2xl">
        <img
          src={imageUrl || "https://via.placeholder.com/400x500"}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Wishlist Button */}
        <button className="absolute top-4 start-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
          <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {/* Add to Cart Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-[#1A1A1A] py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-[#BC9355] hover:text-white transition-colors"
          >
            {t.addToCart}
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
            Fashion
          </p>
          <h4 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#BC9355] transition-colors line-clamp-1">
            {name || "Product"}
          </h4>
          <div className="flex items-center mt-1">
            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-bold ms-1 text-gray-500">{rating}</span>
          </div>
        </div>
        <div className="text-end">
          <span className="text-xl font-bold text-[#1A1A1A]">
            {currency}
            {price || 0}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;