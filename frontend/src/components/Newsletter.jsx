import { useState } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";
import emailjs from "@emailjs/browser";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t, isRtl } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error(isRtl ? "الرجاء إدخال بريد إلكتروني صحيح" : "Please enter a valid email");
      return;
    }

    setIsLoading(true);

    try {
      console.log("EmailJS Config:", {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? "exists" : "missing"
      });

      const templateParams = {
        to_email: email,
        to_name: email.split("@")[0],
      };

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("EmailJS Success:", result);
      toast.success(
        isRtl ? "شكراً لك! تم اشتراكك بنجاح" : "Thank you for subscribing!",
      );
      setEmail("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      
      let errorMessage = isRtl ? "حدث خطأ. حاول مرة أخرى لاحقاً" : "Something went wrong";
      
      if (error.text) {
        errorMessage = error.text;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-32 border-t">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center ">
        <h4 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter ">
          {isRtl ? "كن أول من يعلم" : "Be the first to know"}
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
            disabled={isLoading}
            className="flex-1 px-8 py-4 outline-none text-black disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white px-10 py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-[#BC9355] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : (isRtl ? "اشترك الآن" : "Subscribe")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;
