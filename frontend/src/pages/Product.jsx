import { useContext, useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, token, user, getUserId, navigate } = useContext(ShopContext);
  const { t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [activeTab, setActiveTab] = useState("description");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/comment/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.success) setComments(data.comments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const handleAddComment = async () => {
    if (!token) {
      toast.error(t.pleaseLoginReview || "Please login to add a review");
      navigate("/login");
      return;
    }
    if (!newComment.trim()) {
      toast.error(t.writeComment || "Please write a comment");
      return;
    }
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const userId = getUserId();
      
      console.log("Submitting comment with:", {
        productId,
        userId,
        userName: user?.name || "Anonymous",
        rating: newRating,
        commentLength: newComment.length
      });
      
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/comment/add", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          userId: userId || "anonymous_test",
          userName: user?.name || "Anonymous",
          rating: newRating,
          comment: newComment,
        }),
      });
      
      const data = await res.json();
      console.log("Comment response:", data);
      
      if (data.success) {
        setNewComment("");
        setNewRating(5);
        fetchComments();
        toast.success(t.commentAdded || "Review added successfully!");
      } else {
        toast.error(data.message || "Failed to add review");
      }
    } catch (err) {
      console.error("Comment error:", err);
      toast.error("Failed to add review. Please make sure you are logged in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.length).toFixed(1)
    : 0;
  // المنتج مشتق مباشرة → لا state ولا effect
  const productData = useMemo(() => {
    return products.find((item) => item._id === productId);
  }, [products, productId]);

  const [image, setImage] = useState(null);

  // Reset image when productId changes
  useEffect(() => {
    if (productData?.images?.length > 0) {
      setImage(productData.images[0]);
    }
  }, [productId, productData]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  if (!productData.images || productData.images.length === 0) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="opacity-100 pt-10 border-t-2 transition-opacity duration-500 ease-in">
      <div className="flex sm:flex-row flex-col gap-12">
        {/* Images */}
        <div className="flex sm:flex-row flex-col flex-1 gap-3">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 w-full sm:w-[18.7%] overflow-x-auto sm:overflow-y-scroll">
            {productData.images?.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={productData.name}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full cursor-pointer border ${
                  image === item ? "border-black" : "border-transparent"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={productData.name} className="w-full" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="mt-2 font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 font-medium text-3xl">
            {currency} {productData.price}
          </p>
          <p className="mt-5 md:w-4/5 text-gray-500">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>{t.selectSize}</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => {
                return (
                  <button
                    key={index}
                    className={` cursor-pointer border py-2 px-4 bg-gray-100 ${size === selectedSize ? "border-orange-500" : ""} `}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => {
              if (!token) {
                toast.error(t.pleaseLogin);
                navigate("/login");
                return;
              }
              if (!selectedSize) {
                toast.error(t.selectSizeFirst);
                return;
              }
              addToCart(productData._id, selectedSize);
              toast.success(t.addedToCart);
            }}
            className="bg-black active:bg-gray-700 px-8 py-3 text-white text-sm cursor-pointer"
          >
            {t.addToCart.toUpperCase()}
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-gray-500 text-sm">
            <p className="">{t.originalProduct}</p>
            <p className="">{t.codAvailable}</p>
            <p className="">{t.returnPolicy}</p>
          </div>
        </div>
      </div>
      {/*  Description and review section */}
      <div className="mt-24 px-20">
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-8 py-4 text-sm font-semibold transition-all relative ${
              activeTab === "description" 
                ? "text-[#BC9355]" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.description}
            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#BC9355]"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-8 py-4 text-sm font-semibold transition-all relative ${
              activeTab === "reviews" 
                ? "text-[#BC9355]" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.reviews} ({comments.length})
            {averageRating > 0 && (
              <span className="ml-2 text-yellow-500">★ {averageRating}</span>
            )}
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#BC9355]"></span>
            )}
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="py-8">
          {activeTab === "description" ? (
            <div className="max-w-3xl">
              <p className="text-gray-600 leading-relaxed text-sm">
                {productData.description || t.noDescription}
              </p>
            </div>
          ) : (
            <div className="max-w-3xl">
              {/* Add Comment Form */}
              {token ? (
                <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="font-semibold text-lg text-[#1A1A1A] mb-4">{t.addReview}</h3>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{t.rating}:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button
                            key={r}
                            onClick={() => setNewRating(r)}
                            className="text-2xl transition-transform hover:scale-110"
                          >
                            <span className={newRating >= r ? "text-yellow-400" : "text-gray-300"}>
                              ★
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t.writeReview || "Write your review..."}
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#BC9355] focus:ring-2 focus:ring-[#BC9355]/20 transition-all text-sm resize-none h-28"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={isSubmitting}
                    className={`mt-4 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                      isSubmitting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-[#BC9355] hover:bg-[#A67D42] text-white hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : (t.submitReview || "Submit Review")}
                  </button>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-[#BC9355]/5 rounded-2xl border border-[#BC9355]/20 text-center">
                  <p className="text-gray-600 mb-3">
                    Please login to write a review
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 bg-[#BC9355] text-white rounded-full font-medium text-sm hover:bg-[#A67D42] transition-all"
                  >
                    Login
                  </button>
                </div>
              )}

              {/* Comments List */}
              {loadingComments ? (
                <div className="py-8 flex justify-center">
                  <div className="w-8 h-8 border-4 border-[#BC9355]/30 border-t-[#BC9355] rounded-full animate-spin"></div>
                </div>
              ) : comments.length === 0 ? (
                <div className="py-12 text-center">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-500">{t.noReviews || "No reviews yet. Be the first to review!"}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment, index) => (
                    <div key={index} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-luxury transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#BC9355]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#BC9355] font-bold">
                              {(comment.userName || "A").charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-[#1A1A1A]">{comment.userName || "Anonymous"}</span>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < (comment.rating || 5) ? "text-yellow-400" : "text-gray-300"}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-gray-400 text-xs">
                          {comment.date ? new Date(comment.date).toLocaleDateString() : ""}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Display Related Products */}
      <div className="">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
