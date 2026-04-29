import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ products: 0, orders: 0, comments: 0 });
  const [admin, setAdmin] = useState({
    name: "Administrator",
    email: "",
    avatar: "",
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);

        let productsCount = 0;
        let ordersCount = 0;
        let commentsCount = 0;

        // products (GET)
        try {
          const pRes = await fetch(`${backendUrl}/api/product/list`);
          if (pRes.ok) {
            const pJson = await pRes.json();
            productsCount = Array.isArray(pJson.products)
              ? pJson.products.length
              : 0;
          }
        } catch (e) {
          console.log("Products fetch error", e);
        }

        // orders (GET /api/order/list) - adminAuth required
        try {
          const oRes = await fetch(`${backendUrl}/api/order/list`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (oRes.ok) {
            const oJson = await oRes.json();
            ordersCount = Array.isArray(oJson.orders) ? oJson.orders.length : 0;
          }
        } catch (e) {
          console.log("Orders fetch error", e);
        }

        // comments (GET /api/comment/all)
        try {
          const cRes = await fetch(`${backendUrl}/api/comment/all`);
          if (cRes.ok) {
            const cJson = await cRes.json();
            commentsCount = Array.isArray(cJson.comments)
              ? cJson.comments.length
              : 0;
          }
        } catch (e) {
          console.log("Comments fetch error", e);
        }

        setCounts({
          products: productsCount,
          orders: ordersCount,
          comments: commentsCount,
        });

        // fetch admin profile
        if (token) {
          try {
            const adminRes = await fetch(
              `${backendUrl}/api/user/admin/profile`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (adminRes.ok) {
              const adminJson = await adminRes.json();
              if (adminJson.success && adminJson.admin) {
                setAdmin({
                  name: adminJson.admin.name || "Admin",
                  email: adminJson.admin.email || "",
                  avatar: adminJson.admin.avatar || "",
                });
              }
            }
          } catch (e) {
            console.log("Admin profile fetch error", e);
          }
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [token]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${backendUrl}/api/user/admin/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const json = await res.json();

      if (json.success && json.avatar) {
        setAdmin((prev) => ({ ...prev, avatar: json.avatar }));
        toast.success("Avatar updated successfully");
      } else {
        toast.error(json.message || "Failed to upload avatar");
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error("Error uploading avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Admin Profile Section */}
      <div className="bg-white shadow-soft rounded-2xl p-8 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#BC9355]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <h2 className="mb-6 font-bold text-2xl text-[#1A1A1A] relative z-10">Admin Profile</h2>
        <div className="flex md:flex-row flex-col gap-8 relative z-10">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <label htmlFor="avatarInput" className="cursor-pointer group relative">
              {admin.avatar ? (
                <img
                  src={admin.avatar}
                  alt="admin"
                  className="rounded-full w-28 h-28 object-cover shadow-md group-hover:shadow-lg transition-all duration-300 ring-4 ring-gray-50"
                />
              ) : (
                <div className="flex justify-center items-center bg-gray-100 text-[#BC9355] rounded-full w-28 h-28 font-bold text-4xl shadow-sm group-hover:shadow-md transition-all duration-300 ring-4 ring-gray-50">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarUpload}
              disabled={uploadingAvatar}
            />
            <p className="mt-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
              {uploadingAvatar ? "Uploading..." : "Update Photo"}
            </p>
          </div>

          {/* Admin Info */}
          <div className="flex flex-col justify-center border-l border-gray-100 pl-8">
            <div className="mb-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Role</p>
              <p className="font-bold text-xl text-[#1A1A1A] flex items-center gap-2">
                Administrator
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Email</p>
              <p className="font-semibold text-lg text-gray-700">{admin.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Actions Section */}
      <div className="bg-white shadow-soft rounded-2xl p-8 border border-gray-100">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-bold text-2xl text-[#1A1A1A]">Dashboard Overview</h2>
            <p className="text-gray-500 text-sm mt-1">
              Your store's performance at a glance.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-[#BC9355]/30 border-t-[#BC9355] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-2xl border border-blue-100/50 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
              </div>
              <div className="text-blue-900/60 text-sm font-bold uppercase tracking-wider mb-1">Total Products</div>
              <div className="font-bold text-4xl text-blue-900 mb-4">{counts.products}</div>
              <Link to="/list" className="text-blue-600 text-sm font-semibold hover:text-blue-800 flex items-center gap-1 group">
                Manage Products <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-2xl border border-green-100/50 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
              </div>
              <div className="text-green-900/60 text-sm font-bold uppercase tracking-wider mb-1">Total Orders</div>
              <div className="font-bold text-4xl text-green-900 mb-4">{counts.orders}</div>
              <Link to="/orders" className="text-green-600 text-sm font-semibold hover:text-green-800 flex items-center gap-1 group">
                View Orders <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-[#BC9355]/10 to-[#BC9355]/5 p-6 rounded-2xl border border-[#BC9355]/20 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#BC9355]/20 text-[#BC9355] rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </div>
              </div>
              <div className="text-[#A67D42] text-sm font-bold uppercase tracking-wider mb-1">Total Comments</div>
              <div className="font-bold text-4xl text-[#1A1A1A] mb-4">{counts.comments}</div>
              <Link to="/comments" className="text-[#BC9355] text-sm font-semibold hover:text-[#A67D42] flex items-center gap-1 group">
                Review Comments <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-gray-100">
          <h3 className="mb-4 font-bold text-lg text-[#1A1A1A]">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/add"
              className="bg-[#1A1A1A] hover:bg-[#BC9355] px-6 py-3 rounded-xl text-white font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Product
            </Link>
            <Link to="/list" className="bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl text-gray-700 font-semibold transition-all flex items-center gap-2">
              Product List
            </Link>
            <Link to="/orders" className="bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl text-gray-700 font-semibold transition-all flex items-center gap-2">
              Orders
            </Link>
            <Link to="/comments" className="bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl text-gray-700 font-semibold transition-all flex items-center gap-2">
              Comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
