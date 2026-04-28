import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const { t, isRtl } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success(isRtl ? "شكراً لك! تم اشتراكك بنجاح" : "Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="bg-[#1A1A1A] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {isRtl ? "انضم إلى نادي النخبة" : "Join the Elite Club"}
        </h3>
        <p className="text-gray-400 mb-10 font-light">
          {isRtl
            ? "كن أول من يعرف عن التشكيلات الجديدة والعروض الحصرية."
            : "Be the first to know about new collections and exclusive offers."}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder={isRtl ? "بريدك الإلكتروني" : "Your Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#BC9355] transition-colors"
          />
          <button
            type="submit"
            className="bg-[#BC9355] text-white px-8 py-4 rounded-full font-bold hover:bg-[#a67d40] transition-all"
          >
            {isRtl ? "اشترك الآن" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;