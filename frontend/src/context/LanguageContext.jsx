/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isRtl, setIsRtl] = useState(() => {
    const stored = localStorage.getItem("isRtl");
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem("isRtl", JSON.stringify(isRtl));
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = isRtl ? "ar" : "en";
  }, [isRtl]);

  const toggleLanguage = () => setIsRtl(!isRtl);

  const t = {
    // Navigation
    home: isRtl ? "الرئيسية" : "Home",
    collection: isRtl ? "المجموعة" : "Collection",
    about: isRtl ? "عن المتجر" : "About",
    contact: isRtl ? "اتصل بنا" : "Contact",
    orders: isRtl ? "الطلبات" : "Orders",
    cart: isRtl ? "السلة" : "Cart",
    login: isRtl ? "تسجيل الدخول" : "Login",
    logout: isRtl ? "تسجيل الخروج" : "Logout",

    // Hero
    heroTitle: isRtl
      ? "اكتشف الفخامة في كل تفصيل"
      : "Discover Luxury in Every Detail",
    heroSub: isRtl
      ? "مجموعة ملابس حصرية تجمع بين الأصالة والعصرية لتناسب ذوقك الرفيع."
      : "An exclusive collection of clothing that combines heritage and modernity to suit your fine taste.",
    shopNow: isRtl ? "تسوق الآن" : "Shop Now",

    // Sections
    newArrivals: isRtl ? "وصل حديثاً" : "New Arrivals",
    bestSeller: isRtl ? "الأكثر مبيعاً" : "Best Seller",
    springCollection: isRtl ? "تشكيلة الربيع" : "Spring Collection",
    thisMonth: isRtl ? "تشكيلة هذا الشهر" : "This Month",
    viewAll: isRtl ? "عرض الكل" : "View All",

    // Product
    addToCart: isRtl ? "أضف للسلة" : "Add to Cart",
    selectSize: isRtl ? "اختر المقاس" : "Select Size",
    price: isRtl ? "السعر" : "Price",
    size: isRtl ? "المقاس" : "Size",
    addedToCart: isRtl ? "تمت الإضافة للسلة" : "Added to cart!",
    pleaseLogin: isRtl
      ? "يرجى تسجيل الدخول لإضافة منتجات للسلة"
      : "Please login to add items to cart",
    selectSizeFirst: isRtl ? "يرجى اختيار المقاس" : "Please select a size",

    // Cart
    yourCart: isRtl ? "سلة التسوق" : "Your Cart",
    cartEmpty: isRtl ? "سلة التسوق فارغة" : "Your cart is empty",
    continueShopping: isRtl ? "متابعة التسوق" : "Continue Shopping",
    proceedCheckout: isRtl ? "إتمام الشراء" : "Proceed to Checkout",
    subtotal: isRtl ? "المجموع الفرعي" : "Subtotal",
    total: isRtl ? "المجموع" : "Total",
    itemRemoved: isRtl ? "تمت إزالة المنتج من السلة" : "Item removed from cart",

    // Checkout
    deliveryInfo: isRtl ? "معلومات التوصيل" : "Delivery Information",
    firstName: isRtl ? "الاسم الأول" : "First Name",
    lastName: isRtl ? "الاسم الأخير" : "Last Name",
    email: isRtl ? "البريد الإلكتروني" : "Email",
    street: isRtl ? "الشارع" : "Street",
    city: isRtl ? "المدينة" : "City",
    state: isRtl ? "المنطقة" : "State",
    country: isRtl ? "البلد" : "Country",
    zipcode: isRtl ? "الرمز البريدي" : "Zip Code",
    phone: isRtl ? "الهاتف" : "Phone",
    paymentMethod: isRtl ? "طريقة الدفع" : "Payment Method",
    placeOrder: isRtl ? "تأكيد الطلب" : "Place Order",
    checkout: isRtl ? "الدفع" : "Checkout",
    stripe: "Stripe",
    razorpay: "Razorpay",
    cod: isRtl ? "الدفع عند الاستلام" : "Cash on Delivery",

    // Orders
    yourOrders: isRtl ? "طلباتك" : "Your Orders",
    noOrders: isRtl ? "لا توجد طلبات" : "No orders yet",
    orderId: isRtl ? "رقم الطلب" : "Order ID",
    qty: isRtl ? "الكمية" : "Qty",
    orderTotal: isRtl ? "المجموع" : "Total",

    // Login
    password: isRtl ? "كلمة المرور" : "Password",
    createAccount: isRtl ? "إنشاء حساب" : "Create account",
    loginHere: isRtl ? "تسجيل الدخول هنا" : "Login Here",
    signIn: isRtl ? "دخول" : "Sign In",
    signUp: isRtl ? "تسجيل" : "Sign Up",

    // About
    aboutTitle: isRtl ? "عن متجرنا" : "About Us",
    aboutDesc1: isRtl
      ? "لقد تم إنشاءي بpurpose — لجعل التسوق أسهل وأسرع وأكثر متعة. بدأت بفكرة بسيطة، لكنني نمت إلى منصة يمكنك من خلالها استكشاف واكتشاف وشراء مجموعة واسعة من المنتجات من راحة منزلك. مهمتي هي أن أقدم لك الراحة والثقة تجربة تسوق سلسة في كل مرة تزورني."
      : "I was created with a purpose — to make online shopping easier, faster, and more enjoyable. I began as a simple idea, but I grew into a platform where you can explore, discover, and purchase a wide range of products from the comfort of your home.",
    aboutDesc2: isRtl
      ? "منذ يوم إطلاقها، كنت مكرساً لتقديم مجموعة مختارة بعناية من الأزياء العصرية عالية الجودة للنساء والرجال والأطفال. كل قطعة أقدمها مختارة بعناية، من موردين موثوقين لضمان التنوع والراحة والأناقة الحديثة — وكل ذلك собрано لك في مكان واحد."
      : "Since the day I launched, I've been devoted to offering a thoughtfully curated collection of stylish, high-quality clothing for women, men, and kids.",
    aboutMission: isRtl ? "مهمتي" : "My Mission",
    missionText: isRtl
      ? "مهمتي هي تمكينك من الاختيار والراحة والثقة. ملتزماً تجربة تسوق سلسة وممتعة تتجاوز التوقعات — من لحظة تصفحك، إلى تقديم طلبك، واستلامDelivery، وكل ما يلي."
      : "My mission is to empower you with choice, convenience, and confidence. I'm committed to giving you a smooth, enjoyable shopping experience that goes beyond expectations.",
    qualityAssurance: isRtl ? "ضمان الجودة" : "Quality Assurance",
    qualityText: isRtl
      ? "أختار وأفحص كل منتج بعناية لضمان استيفاء معايير الجودة لدينا."
      : "I meticulously select and vet each product to ensure it meets our stringent quality standards.",
    convenience: isRtl ? "الراحة" : "Convenience",
    convenienceText: isRtl
      ? "مع واجهة سهلة الاستخدام عملية طلب بدون متاعب، التسوق لم يكن أسهل."
      : "With my user-friendly interface and hassle-free ordering process, shopping has never been easier.",
    customerService: isRtl ? "خدمة العملاء" : "Customer Service",
    customerServiceText: isRtl
      ? "أنا مدعوم بفريق مخصص موجود دائماً للمساعدة، مما يضمن تجربة سهلة ورضاك دائماً يأتي أولاً."
      : "I'm supported by a dedicated team that's always here to help, making sure your experience is effortless and your satisfaction always comes first.",

    // Contact
    ourStore: isRtl ? "متجرنا" : "OUR STORE",
    storeLocation: isRtl ? "إstanbul، Türkiye" : "Istanbul, Türkiye",
    tel: isRtl ? "الهاتف" : "Tel",
    careers: isRtl ? "وظائف في Faisal" : "CAREERS AT FAISAL",
    careersText: isRtl
      ? "تعرف على فرقنا ووظائف الشاغرة."
      : "Learn more about my teams and job openings.",
    exploreJobs: isRtl ? "استكشف الوظائف" : "Explore Jobs",

    // Product Page
    description: isRtl ? "الوصف" : "Description",
    reviews: isRtl ? "التقييمات" : "Reviews",
    noDescription: isRtl ? "لا يوجد وصف متاح" : "No description available.",
    addReview: isRtl ? "أضف تقييمك" : "Add Your Review",
    rating: isRtl ? "التقييم" : "Rating",
    writeReview: isRtl ? "اكتب تقييمك..." : "Write your review...",
    submitReview: isRtl ? "إرسال التقييم" : "Submit Review",
    loadingReviews: isRtl ? "جاري تحميل التقييمات..." : "Loading reviews...",
    noReviews: isRtl
      ? "لا توجد تقييمات بعد. كن أول من يقيّم!"
      : "No reviews yet. Be the first to review!",
    originalProduct: isRtl ? "منتج أصلي 100%." : "100% Original product.",
    codAvailable: isRtl
      ? "الدفع عند الاستلام متاح لهذا المنتج."
      : "Cash on delivery is available on this product.",
    returnPolicy: isRtl
      ? "سياسة الإرجاع والاستبدال خلال 7 أيام."
      : "Easy return and exchange policy within 7 days.",
    pleaseLoginReview: isRtl
      ? "يرجى تسجيل الدخول لإضافة تقييم"
      : "Please login to add a comment",
    writeComment: isRtl ? "يرجى كتابة تقييم" : "Please write a comment",
    commentAdded: isRtl
      ? "تم إضافة التقييم بنجاح!"
      : "Comment added successfully!",
    commentFailed: isRtl ? "فشل في إضافة التقييم" : "Failed to add comment",

    // Misc
    loading: isRtl ? "جاري التحميل..." : "Loading...",
    currency: isRtl ? "ر.س" : "SAR",

// Footer
    privacy: isRtl ? "الخصوصية" : "Privacy",
    terms: isRtl ? "الشروط" : "Terms",
    shipping: isRtl ? "الشحن" : "Shipping",
    allRights: isRtl ? "جميع الحقوق محفوظة" : "All rights reserved",

    // Policy
    exchangePolicy: isRtl ? "سياسة الاستبدال السهلة" : "Easy Exchange Policy",
    exchangeText: isRtl
      ? "أقدم سياسة استبدال بدون متاعب"
      : "I offer hassle free exchange policy",
    returnText: isRtl
      ? "أوفر إرجاع مجاني خلال 7 أيام"
      : "I provide 7 days free return policy",
    supportPolicy: isRtl ? "دعم العملاء الأفضل" : "Best Customer Support",
    supportText: isRtl
      ? "أوفر دعم عملاء على مدار الساعة"
      : "I provide 24/7 customer support",

    // Related Products
    relatedProducts: isRtl ? "منتجات ذات صلة" : "RELATED",
    productsText: isRtl ? "منتجات" : "PRODUCTS",

    // Collection Page
    filters: isRtl ? "فلاتر" : "Filters",
    category: isRtl ? "الفئة" : "Category",
    type: isRtl ? "النوع" : "Type",
    sortBy: isRtl ? "ترتيب حسب" : "Sort by",
    relevant: isRtl ? "الأكثر صلة" : "Relevant",
    lowHigh: isRtl ? "السعر: من الأقل للأعلى" : "Price: Low to High",
    highLow: isRtl ? "السعر: من الأعلى للأقل" : "Price: High to Low",
    men: isRtl ? "رجالي" : "Men",
    women: isRtl ? "نسائي" : "Women",
    kids: isRtl ? "أطفال" : "Kids",
    accessories: isRtl ? "إكسسوارات" : "Accessories",
    perfume: isRtl ? "عطور" : "Perfume",
    shoes: isRtl ? "أحذية" : "Shoes",
    noProducts: isRtl ? "لم يتم العثور على منتجات" : "No products found",

    // Sub-categories
    topwear: isRtl ? "ملابس علوية" : "Topwear",
    bottomwear: isRtl ? "ملابس سفلية" : "Bottomwear",
    winterwear: isRtl ? "ملابس شتوية" : "Winterwear",

    // Products count
    productsCount: isRtl ? "منتج" : "products",
  };

  return (
    <LanguageContext.Provider value={{ isRtl, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
