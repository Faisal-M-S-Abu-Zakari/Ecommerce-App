import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { backendUrl } from "../App";

const Comments = ({ token }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    setLoading(true);
    try {
      // Get all comments
      const res = await axios.get(backendUrl + "/api/comment/all");
      if (res.data.success) {
        const commentsData = res.data.comments || [];
        
        // Get all products to match product names
        const productsRes = await axios.get(backendUrl + "/api/product/list");
        const productsData = productsRes.data.products || [];
        // Map comments with product names
        const commentsWithProducts = commentsData.map(comment => {
          const product = productsData.find(p => p._id === comment.productId);
          return {
            ...comment,
            productName: product?.name || "Product not found"
          };
        });
        
        setComments(commentsWithProducts);
      }
    } catch (err) {
      console.error("Error loading comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleDelete = async (reviewId) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await axios.delete(
        `${backendUrl}/api/comment/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) loadComments();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader text="Loading comments..." />;

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-bold text-2xl text-[#1A1A1A]">All Comments</h2>
          <p className="text-gray-500 text-sm mt-1">Manage customer reviews</p>
        </div>
        <Link
          to="/"
          className="bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-gray-700 font-medium transition-all flex items-center gap-2 text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-[#BC9355]/30 border-t-[#BC9355] rounded-full animate-spin"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-gray-500">No comments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id || c.reviewId}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-luxury transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex justify-center items-center bg-[#BC9355]/10 rounded-full w-12 h-12 text-[#BC9355] font-bold">
                  {c.userName ? c.userName.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-[#1A1A1A]">
                        {c.userName || "Anonymous"}{" "}
                        <span className="text-gray-400 font-normal text-sm">
                          on {c.productName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < c.rating ? "text-yellow-400" : "text-gray-300"}>
                            ★
                          </span>
                        ))}
                        <span className="text-gray-400 text-xs ml-1">
                          {c.date ? new Date(c.date).toLocaleDateString() : ""}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(c._id || c.reviewId)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="mt-3 text-gray-600">{c.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
