import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={assets.hero_img}
          alt="Hero Background"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#BC9355] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {t.newArrivals}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.heroTitle}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-100 font-light max-w-lg">
            {t.heroSub}
          </p>
          <Link
            to="/collection"
            className="bg-[#BC9355] text-white px-10 py-4 rounded-full font-bold inline-flex items-center gap-3 group hover:bg-[#a67d40] transition-all"
          >
            <span>{t.shopNow}</span>
            <svg
              className={`w-5 h-5 transition-transform ${isRtl ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRtl ? "M17 8l4 4m0 0l-4 4m4-4H3" : "M17 8l4 4m0 0l-4 4m4-4H3"} />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;