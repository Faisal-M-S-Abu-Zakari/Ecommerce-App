import { assets } from "../assets/assets";
import { useLanguage } from "../context/LanguageContext";

const OurPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="flex sm:flex-row flex-col justify-around gap-12 sm:gap-2 py-20 text-gray-700 text-xs sm:text-sm md-text-base text-center">
      <div>
        <img src={assets.exchange_icon} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">{t.exchangePolicy}</p>
        <p className="text-gray-400">{t.exchangeText}</p>
      </div>
      <div>
        <img src={assets.quality_icon} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">{t.returnPolicy}</p>
        <p className="text-gray-400">{t.returnText}</p>
      </div>
      <div>
        <img src={assets.support_img} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">{t.supportPolicy}</p>
        <p className="text-gray-400">{t.supportText}</p>
      </div>
    </div>
  );
};

export default OurPolicy;