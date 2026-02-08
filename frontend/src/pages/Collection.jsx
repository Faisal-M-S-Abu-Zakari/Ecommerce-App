import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex sm:flex-row flex-col gap-1 sm-gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : " hidden"} sm:block`}
        >
          <p className="mb-3 font-medium text-sm">CATEGORIES</p>
          <div className="flex flex-col gap-2 font-light text-gray-700 text-sm">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Men"} /> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Women"} /> Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Kids"} /> Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : " hidden"} sm:block`}
        >
          <p className="mb-3 font-medium text-sm">Type</p>
          <div className="flex flex-col gap-2 font-light text-gray-700 text-sm">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Topwear"} />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Bottomwear"} />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Winterwear"} />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between mb-4 text-basesm:texxt-2xl">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* product sort */}
          <select
            name=""
            id=""
            className="px-2 border-2 border-gray-300 text-sm"
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low To High</option>
            <option value="high-low">Sort By: High TO Low</option>
          </select>
        </div>
        {/* Map Products  */}
        <div className="gap-4 gap-y-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
