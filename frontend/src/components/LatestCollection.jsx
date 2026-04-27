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
          The latest products from our collection. Check them out and find your
          new favorite.
        </p>
      </div>
      {/* Rendering Products  */}

      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.length > 0 ? (
          latestProducts.map((product, index) => (
            <ProductItem
              key={index}
              id={product._id}
              name={product.name}
              image={product.images || product.image}
              price={product.price}
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-500">
            No products available. Add products from the admin panel.
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
