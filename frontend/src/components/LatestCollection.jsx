import { useContext, useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  // const [latestProducts, setLatestProducts] = useState([]);

  // useEffect(() => {
  //   setLatestProducts(products.slice(0, 10));
  // }, []);

  // const [latestProducts, setLatestProducts] = useState([]);

  // useEffect(() => {
  //   setLatestProducts(products.slice(0, 10));
  // }, []);

  const latestProducts = products.slice(0, 10);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="m-auto w-3/4 text-gray-600 text-xs sm:text-sm md:text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      {/* Rendering Products  */}

      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
