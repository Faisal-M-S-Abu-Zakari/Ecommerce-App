import { useContext } from "react";
import Title from "../components/Title";
import ShopContext from "../context/ShopContext";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  console.log(products);
  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="flex md:flex-row flex-col md:justify-between items-center gap-4 py-4 border-t border-b text-gray-700"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="font-medium sm:text-base">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-gray-500 text-base">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>size: M</p>
                </div>
                <p className="mt-1">
                  Date:
                  <span className="text-gray-400">25,Dec,2025</span>
                </p>
                {/* <p className="mt-1">
                  Payment:
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p> */}
              </div>
            </div>

            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <p className="bg-green-500 rounded-full min-w-2 h-2"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>
              <button className="px-4 py-2 border rounded-sm font-medium text-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
