import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isRtl } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 ${isRtl ? "start-8" : "end-8"} bg-[#BC9355] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#a67d40] transition-all z-50`}
      aria-label={isRtl ? "العودة للأعلى" : "Back to top"}
    >
      <svg
        className={`w-6 h-6 ${isRtl ? "rotate-360" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default BackToTop;
