import { useContext, useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, token, user, getUserId, navigate } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const fetchComments = async () => {
    try {
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
      toast.error("Please login to add a comment");
      navigate("/login");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    try {
      const userId = getUserId();
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/comment/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userId: userId,
          userName: user?.name || "Anonymous",
          rating: newRating,
          comment: newComment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewComment("");
        setNewRating(5);
        fetchComments();
        toast.success("Comment added successfully!");
      } else {
        toast.error(data.message || "Failed to add comment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
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

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  if (!image && productData.images?.length > 0) {
    setImage(productData.images[0]);
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
            <p>Select Size</p>
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
              if (!selectedSize) {
                toast.error("Please select a size");
                return;
              }
              addToCart(productData._id, selectedSize);
              toast.success("Added to cart!");
            }}
            className="bg-black active:bg-gray-700 px-8 py-3 text-white text-sm cursor-pointer"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-gray-500 text-sm">
            <p className="">100% Original product.</p>
            <p className="">Cash on delivery is available on this product.</p>
            <p className="">Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/*  Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-5 py-3 border text-sm ${activeTab === "description" ? "bg-black text-white" : ""}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-3 border text-sm ${activeTab === "reviews" ? "bg-black text-white" : ""}`}
          >
            Reviews ({comments.length}) {averageRating > 0 && `★ ${averageRating}`}
          </button>
        </div>
        <div className="border p-6">
          {activeTab === "description" ? (
            <div className="flex flex-col gap-4 text-gray-500 text-sm">
              <p>{productData.description || "No description available."}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Add Comment Form */}
              {token && (
                <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded">
                  <h3 className="font-medium">Add Your Review</h3>
                  <div className="flex items-center gap-2">
                    <span>Rating:</span>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="border p-1"
                    >
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r} ★</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your review..."
                    className="border p-2 w-full h-20"
                  />
                  <button
                    onClick={handleAddComment}
                    className="bg-black text-white px-4 py-2 self-start"
                  >
                    Submit Review
                  </button>
                </div>
              )}

              {/* Comments List */}
              {loadingComments ? (
                <p className="text-gray-500">Loading reviews...</p>
              ) : comments.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{comment.userName}</span>
                      <span className="text-yellow-500">{"★".repeat(comment.rating || 5)}</span>
                      <span className="text-gray-400 text-xs">
                        {comment.date ? new Date(comment.date).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.comment}</p>
                  </div>
                ))
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
