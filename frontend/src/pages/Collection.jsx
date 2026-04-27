import { useContext, useMemo, useState } from "react";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");

  const toggleCategory = (event) => {
    // هل هذا الـ category مختار أصلًا؟
    // ✅ نعم → احذفه
    // ❌ لا → أضفه
    if (categories.includes(event.target.value)) {
      // هان راح يرجع مصفوفة جديدة بحيث يحذف الصنف يلي ضغط عليه
      setCategories((prev) =>
        prev.filter((item) => item !== event.target.value),
      );
    } else {
      // هان بحافظ على المصفوفة القديمة و بضيف الصنف يلي ضغط عليه المستخدم
      setCategories((prev) => [...prev, event.target.value]);
    }
  };
  const toggleSubCategory = (event) => {
    if (subCategories.includes(event.target.value)) {
      setSubCategories((prev) =>
        prev.filter((item) => item !== event.target.value),
      );
    } else {
      setSubCategories((prev) => [...prev, event.target.value]);
    }
  };

  const filteredProducts = useMemo(() => {
    // لان فنكشن السورت بتعدل على المصفوفة الاصلية لازم اعمل نسخة
    let result = [...products];

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    // category filter
    if (categories.length > 0) {
      // هان بحكيله لف على كل المنتجات و خلي فقط المنتج يلي صنفه موجود في مصفوفة الاصناف
      result = result.filter((p) => categories.includes(p.category));
    }

    // subCategory filter
    if (subCategories.length > 0) {
      // هان راح يمسك نتيجة الفلترة السابقة و برضو يرجع المنتجات يلي النوع تبعهم تم اختياره
      result = result.filter((p) => subCategories.includes(p.subCategory));
    }

    //  SORT LOGIC
    if (sortBy === "low-high") {
      // بيمسك اول منتجين وبيطرح سعرهم من بعض , اذا الناتج قيمة سالبة , يعني المنتج الاول هو ارخص فبيظل بالبداية
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, categories, subCategories, sortBy, search]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 shrink-0">
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-2"
              >
                <img
                  className={`h-5 transition-transform ${showFilter ? "rotate-180" : ""}`}
                  src={assets.dropdown_icon}
                  alt=""
                />
              </button>
            </div>

            <div
              className={`space-y-6 ${showFilter ? "block" : "hidden"} lg:block`}
            >
              <div className="pb-6 border-b border-gray-100">
                <h3 className="text-sm font-semibold mb-4">Category</h3>
                <div className="space-y-3">
                  {["Men", "Women", "Kids"].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        value={cat}
                        onChange={toggleCategory}
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-black">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pb-6 border-b border-gray-100">
                <h3 className="text-sm font-semibold mb-4">Type</h3>
                <div className="space-y-3">
                  {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        value={type}
                        onChange={toggleSubCategory}
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-black">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h1 className="text-3xl font-light">All Collection</h1>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
              >
                <option value="relevant">Relevance</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.images || item.image}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
