import { useContext } from "react";
import ShopContext from "./../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const bestSeller = products.filter((product) => product.bestseller === true);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="m-auto w-3/4 text-gray-600 text-xs sm:text-sm md:text-base">
          Best seller products of the month are here.
        </p>
      </div>
      {/* Rendering Products  */}

      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSeller.map((product, index) => {
          if (product.bestseller === true) {
            return (
              <ProductItem
                key={index}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.images || product.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default BestSeller;
