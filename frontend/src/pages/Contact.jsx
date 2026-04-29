import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/Newsletter";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
              {t.contact}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              {t.contact}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-28">
            <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative overflow-hidden rounded-3xl shadow-luxury group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#BC9355]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  src={assets.contact_img}
                  alt="Contact Us"
                />
              </div>
              <div className="absolute -bottom-6 -end-6 w-32 h-32 bg-[#BC9355]/10 rounded-full blur-2xl"></div>
            </div>
            <div className={`flex flex-col justify-center gap-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="space-y-6">
                <p className="font-semibold text-gray-800 text-2xl">
                  {t.ourStore}
                </p>
                <div className="space-y-3 text-gray-500">
                  <p>{t.storeLocation}</p>
                  <p>
                    {t.tel}: +972 599 091 546
                    <br />
                    Email: zkryfysl@gmail.com
                  </p>
                </div>
              </div>
              
              <div className="h-px bg-gradient-to-r from-[#BC9355]/30 via-gray-200 to-transparent"></div>
              
              <div className="space-y-4">
                <p className="font-semibold text-gray-800 text-xl">
                  {t.careers}
                </p>
                <p className="text-gray-500 leading-relaxed">{t.careersText}</p>
              </div>

              <button className="btn-luxury w-fit px-10 py-4 rounded-full font-bold text-sm mt-4">
                {t.exploreJobs}
              </button>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", title: "Visit Us", text: "123 Fashion Street, Riyadh" },
              { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Email Us", text: "zkryfysl@gmail.com" },
              { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Call Us", text: "+972 599 091 546" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-[#BC9355]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#BC9355] transition-colors">
                  <svg className="w-6 h-6 text-[#BC9355] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
