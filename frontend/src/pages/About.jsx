import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/Newsletter";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
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
              {t.about}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-3">
              {t.about}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 my-10">
            <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative overflow-hidden rounded-3xl shadow-luxury group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#BC9355]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  src={assets.about_img}
                  alt="About Us"
                />
              </div>
              <div className="absolute -bottom-8 -start-8 w-40 h-40 bg-[#BC9355]/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -end-8 w-32 h-32 bg-[#BC9355]/5 rounded-full blur-2xl"></div>
            </div>
            <div className={`flex flex-col justify-center gap-6 text-gray-600 leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <p className="text-lg">{t.aboutDesc1}</p>
              <p>{t.aboutDesc2}</p>
              <b className="text-gray-800 text-2xl font-semibold">{t.aboutMission}</b>
              <p className="pb-4">{t.missionText}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 mb-20 gap-6">
            {[
              { key: 'quality', title: t.qualityAssurance, text: t.qualityText, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { key: 'convenience', title: t.convenience, text: t.convenienceText, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { key: 'service', title: t.customerService, text: t.customerServiceText, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
            ].map((item, index) => (
              <div 
                key={item.key}
                className={`flex flex-col gap-5 px-8 md:px-10 py-10 border border-gray-100 rounded-3xl bg-white hover:shadow-luxury transition-all duration-500 hover:-translate-y-2 group opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${index * 150 + 200}ms` }}
              >
                <div className="w-14 h-14 bg-[#BC9355]/10 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-[#BC9355] transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#BC9355] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <b className="text-[#1A1A1A] text-xl">{item.title}</b>
                <p className="text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
