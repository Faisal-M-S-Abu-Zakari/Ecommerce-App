import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsLetterBox";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
              {t.contact}
            </span>
            <h1 className="text-4xl font-bold text-[#1A1A1A] mt-2">
              {t.contact}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-10 mb-28">
            <img
              className="w-full md:max-w-125 rounded-2xl"
              src={assets.contact_img}
              alt=""
            />
            <div className="flex flex-col justify-center items-start gap-6">
              <p className="font-semibold text-gray-700 text-xl">
                {t.ourStore}
              </p>
              <p className="text-gray-500">{t.storeLocation}</p>
              <p className="text-gray-500">
                {t.tel}: +972 599 091 546
                <br />
                Email: zkryfysl@gmail.com
              </p>
              <p className="font-semibold text-gray-700 text-xl mt-4">
                {t.careers}
              </p>
              <p className="text-gray-500">{t.careersText}</p>
              <button className="bg-[#BC9355] hover:bg-[#a67d40] px-8 py-4 rounded-full text-white font-bold text-sm transition-all hover:shadow-lg">
                {t.exploreJobs}
              </button>
            </div>
          </div>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
