import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-bold text-2xl text-[#1A1A1A]">All Products</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your product inventory</p>
        </div>
        <Link
          to="/"
          className="bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-gray-700 font-medium transition-all flex items-center gap-2 text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow-soft rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-[#BC9355]/30 border-t-[#BC9355] rounded-full animate-spin"></div>
          </div>
        ) : list.length === 0 ? (
          <div className="py-20 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {list.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <img 
                        className="w-14 h-14 object-cover rounded-xl shadow-sm" 
                        src={item.images?.[0]} 
                        alt={item.name} 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#1A1A1A]">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.subCategory}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#BC9355]/10 text-[#BC9355]">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#1A1A1A]">
                        {currency}{item.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/edit/${item._id}`}
                          className="bg-[#1A1A1A] hover:bg-[#BC9355] px-4 py-2 rounded-xl text-white text-xs font-medium cursor-pointer transition-all hover:shadow-lg"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => removeProduct(item._id)}
                          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white text-xs font-medium transition-all hover:shadow-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {!loading && list.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-sm text-gray-500 text-center">
              Showing <span className="font-semibold text-gray-700">{list.length}</span> products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
