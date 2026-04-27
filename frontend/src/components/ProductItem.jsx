import React, { useContext } from "react";
import ShopContext from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  
  // Handle both image (array) and images (array from DB)
  const imageUrl = image && image.length > 0 
    ? image[0] 
    : (image && image[0] !== undefined ? image : null);

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        <img
          src={imageUrl || "https://via.placeholder.com/400x500"}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-black">{name || "Product"}</h3>
        <p className="text-sm text-gray-500">{currency}{price || 0}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
