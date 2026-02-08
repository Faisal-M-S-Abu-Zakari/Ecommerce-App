import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  // المنتج مشتق مباشرة → لا state ولا effect
  const productData = useMemo(() => {
    return products.find((item) => item._id === productId);
  }, [products, productId]);

  const [image, setImage] = useState(null);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  if (!image) {
    setImage(productData.image[0]);
  }

  return (
    <div className="opacity-100 pt-10 border-t-2 transition-opacity duration-500 ease-in">
      <div className="flex sm:flex-row flex-col gap-12">
        {/* Images */}
        <div className="flex sm:flex-row flex-col flex-1 gap-3">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 w-full sm:w-[18.7%] overflow-x-auto sm:overflow-y-scroll">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={productData.name}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full cursor-pointer border ${
                  image === item ? "border-black" : "border-transparent"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={productData.name} className="w-full" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="mt-2 font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 font-medium text-3xl">
            {currency} {productData.price}
          </p>
          <p className="mt-5 md:w-4/5 text-gray-500">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => {
                return (
                  <button
                    key={index}
                    className={` cursor-pointer border py-2 px-4 bg-gray-100 ${size === selectedSize ? "border-orange-500" : ""} `}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          <button className="bg-black active:bg-gray-700 px-8 py-3 text-white text-sm cursor-pointer">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-gray-500 text-sm">
            <p className="">100% Original product.</p>
            <p className="">Cash on delivery is available on this product.</p>
            <p className="">Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/*  Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="px-5 py-3 border text-sm">Description</b>
          <p className="px-5 py-3 border text-sm">Reviews (122) </p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 border text-gray-500 text-sm">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            similique inventore adipisci ab, omnis dignissimos non consequuntur,
            repudiandae suscipit tenetur tempore rerum libero nihil aperiam
            quaerat natus cumque error voluptatibus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            similique inventore adipisci ab, omnis dignissimos non consequuntur,
            repudiandae suscipit tenetur tempore rerum libero nihil aperiam
            quaerat natus cumque error voluptatibus!
          </p>
        </div>
      </div>
      {/* Display Related Products */}
      <div className="">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
