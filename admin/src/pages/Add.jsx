import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const responcse = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (responcse.data.success) {
        toast.success(responcse.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
      } else {
        toast.error(responcse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-2xl text-[#1A1A1A]">Add New Product</h2>
        <Link
          to="/"
          className="bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-gray-700 font-semibold transition-all flex items-center gap-2 text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow-soft rounded-2xl p-8 border border-gray-100">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-6 w-full max-w-4xl"
        >
          {/* Images Section */}
          <div>
            <p className="mb-3 font-semibold text-[#1A1A1A]">Product Images <span className="text-gray-400 font-normal text-sm ml-1">(First image is primary)</span></p>
            <div className="flex gap-4 flex-wrap">
              {[
                { state: image1, set: setImage1, id: "image1" },
                { state: image2, set: setImage2, id: "image2" },
                { state: image3, set: setImage3, id: "image3" },
                { state: image4, set: setImage4, id: "image4" },
              ].map((img, index) => (
                <label key={img.id} htmlFor={img.id} className="cursor-pointer group relative">
                  <div className="w-28 h-32 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50 group-hover:border-[#BC9355] group-hover:bg-[#BC9355]/5 transition-all">
                    {!img.state ? (
                      <div className="text-gray-400 flex flex-col items-center gap-2">
                        <svg className="w-6 h-6 group-hover:text-[#BC9355] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </div>
                    ) : (
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(img.state)}
                        alt={`upload-${index}`}
                      />
                    )}
                  </div>
                  <input
                    onChange={(e) => img.set(e.target.files[0])}
                    type="file"
                    id={img.id}
                    hidden
                    accept="image/*"
                  />
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <p className="mb-2 font-semibold text-[#1A1A1A]">Product Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BC9355]/30 focus:border-[#BC9355] transition-all"
                type="text"
                placeholder="e.g. Luxury Leather Jacket"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <p className="mb-2 font-semibold text-[#1A1A1A]">Product Description</p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BC9355]/30 focus:border-[#BC9355] transition-all min-h-[120px]"
                placeholder="Detailed description of the product..."
                required
              />
            </div>
          </div>

          {/* Categorization & Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="mb-2 font-semibold text-[#1A1A1A]">Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BC9355]/30 focus:border-[#BC9355] transition-all appearance-none cursor-pointer"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Accessories">Accessories</option>
                <option value="Perfume">Perfume</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>
            <div>
              <p className="mb-2 font-semibold text-[#1A1A1A]">Sub Category</p>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BC9355]/30 focus:border-[#BC9355] transition-all appearance-none cursor-pointer"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
                <option value="Belts">Belts</option>
                <option value="Wallets">Wallets</option>
                <option value="Sunglasses">Sunglasses</option>
                <option value="Scarves">Scarves</option>
                <option value="Watches">Watches</option>
                <option value="Gloves">Gloves</option>
                <option value="Unisex">Unisex</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Formal">Formal</option>
                <option value="Sports">Sports</option>
                <option value="Casual">Casual</option>
                <option value="Heels">Heels</option>
                <option value="Boots">Boots</option>
                <option value="Sandals">Sandals</option>
              </select>
            </div>
            <div>
              <p className="mb-2 font-semibold text-[#1A1A1A]">Price</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BC9355]/30 focus:border-[#BC9355] transition-all"
                  type="number"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* Sizes */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-[#1A1A1A]">Available Sizes/Variants</p>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Select multiple</span>
            </div>
            <div className="flex gap-3 flex-wrap">
              {["S", "M", "L", "XL", "XXL", "One Size", "50ml", "100ml", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"].map((size) => (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                  className={`
                    px-4 py-2 rounded-xl border cursor-pointer font-medium text-sm transition-all
                    ${sizes.includes(size) 
                      ? "bg-[#BC9355] border-[#BC9355] text-white shadow-md shadow-[#BC9355]/20" 
                      : "bg-white border-gray-200 text-gray-600 hover:border-[#BC9355] hover:text-[#BC9355]"}
                  `}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center gap-3 mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <input
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
              type="checkbox"
              id="bestseller"
              className="w-5 h-5 rounded border-gray-300 text-[#BC9355] focus:ring-[#BC9355]"
            />
            <label className="cursor-pointer font-medium text-[#1A1A1A]" htmlFor="bestseller">
              Mark as Bestseller
              <p className="text-xs text-gray-500 font-normal mt-0.5">This product will be highlighted on the homepage.</p>
            </label>
          </div>

          {/* Submit */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full md:w-auto px-8 py-4 rounded-xl font-bold text-white transition-all
                ${loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#1A1A1A] hover:bg-[#BC9355] shadow-lg hover:shadow-xl hover:-translate-y-1"}
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Adding Product...
                </span>
              ) : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
