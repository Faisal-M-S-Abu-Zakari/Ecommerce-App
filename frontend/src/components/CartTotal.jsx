import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import Title from "./Title";
import { useLanguage } from "../context/LanguageContext";

const CartTotal = () => {
  const { currency, delivery_fee, cartTotal } = useContext(ShopContext);
  const { t } = useLanguage();

  const subtotal = cartTotal;
  const total = subtotal + (subtotal > 0 ? delivery_fee : 0);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={t.yourCart.toUpperCase()} text2={t.total.toUpperCase()} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>{t.subtotal}</p>
          <p>
            {currency} {subtotal}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>{t.shipping}</p>
          <p>
            {currency} {subtotal > 0 ? delivery_fee : 0}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>{t.total}</b>
          <b>
            {currency} {total}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;