import React from "react";
import { useLanguage } from "../context/LanguageContext";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { t, isRtl } = this.props.langContext || { t: {}, isRtl: false };
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isRtl ? "حدث خطأ ما" : "Something went wrong"}
            </h2>
            <p className="text-gray-500 mb-6">
              {isRtl ? "نعتذر، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى." : "We're sorry, an unexpected error occurred. Please try again."}
            </p>
            <button
              onClick={this.handleReload}
              className="bg-[#BC9355] text-white px-8 py-3 rounded-full font-bold hover:bg-[#a67d40] transition-colors"
            >
              {isRtl ? "إعادة تحميل الصفحة" : "Reload Page"}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;