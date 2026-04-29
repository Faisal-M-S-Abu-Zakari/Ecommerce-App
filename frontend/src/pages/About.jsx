import React from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/Newsletter";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
              {t.about}
            </span>
            <h1 className="text-4xl font-bold text-[#1A1A1A] mt-2">
              {t.about}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-16 my-10">
            <img
              className="w-full md:max-w-112.5 rounded-2xl"
              src={assets.about_img}
              alt=""
            />
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 leading-relaxed">
              <p>{t.aboutDesc1}</p>
              <p>{t.aboutDesc2}</p>
              <b className="text-gray-800 text-lg">{t.aboutMission}</b>
              <p>{t.missionText}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-20 text-sm gap-4">
            <div className="flex-1 flex flex-col gap-5 px-8 md:px-12 py-10 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow">
              <b className="text-[#1A1A1A] text-lg">{t.qualityAssurance}</b>
              <p className="text-gray-600">{t.qualityText}</p>
            </div>
            <div className="flex-1 flex flex-col gap-5 px-8 md:px-12 py-10 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow">
              <b className="text-[#1A1A1A] text-lg">{t.convenience}</b>
              <p className="text-gray-600">{t.convenienceText}</p>
            </div>
            <div className="flex-1 flex flex-col gap-5 px-8 md:px-12 py-10 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow">
              <b className="text-[#1A1A1A] text-lg">{t.customerService}</b>
              <p className="text-gray-600">{t.customerServiceText}</p>
            </div>
          </div>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
