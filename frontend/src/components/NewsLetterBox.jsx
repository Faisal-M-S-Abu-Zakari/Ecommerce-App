import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const { t, isRtl } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success(
        isRtl ? "شكراً لك! تم اشتراكك بنجاح" : "Thank you for subscribing!",
      );
      setEmail("");
    }
  };

  return (
    <section className="bg-gray-50 py-32 border-t">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center ">
        <h4 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter ">
          {isRtl ? "كن أول من يعلم" : "Be the first to know "}
        </h4>
        <p className="text-gray-500 text-xl mb-12 font-light">
          {isRtl
            ? "اشترك في قائمتنا البريدية للحصول على آخر التحديثات والعروض الحصرية"
            : "Subscribe to our newsletter to receive the latest updates and exclusive offers."}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-4xl shadow-sm max-w-2xl mx-auto"
        >
          <input
            type="email"
            placeholder={isRtl ? "بريدك الإلكتروني" : "Your Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-8 py-4 outline-none text-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-10 py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-[#BC9355] transition-all"
          >
            {isRtl ? "اشترك الآن" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;

// <div class="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-[2rem] shadow-sm max-w-2xl mx-auto">
//     <input type="email" placeholder="بريدك الإلكتروني" class="flex-1 px-8 py-4 outline-none text-black">
//     <button class="bg-black text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-[#BC9355] transition-all">اشترك الآن</button>
// </div>
