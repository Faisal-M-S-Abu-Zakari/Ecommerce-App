import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { assets } from "./../assets/assets";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Edit = ({ token }) => {
  const { id } = useParams();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  
  const [existingImages, setExistingImages] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(backendUrl + "/api/product/single", {
          id: id,
        });
        if (response.data.success) {
          const product = response.data.product;
          setName(product.name || "");
          setDescription(product.description || "");
          setPrice(product.price || "");
          setCategory(product.category || "Men");
          setSubCategory(product.subCategory || "Topwear");
          setBestseller(product.bestseller || false);
          setSizes(product.sizes || []);
          setExistingImages(product.images || []);
        } else {
          toast.error("Failed to load product");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("productId", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Only append images if they are new files
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.put(
        backendUrl + "/api/product/update",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (loading)
    return <div className="py-8 text-center">Loading product...</div>;

  return (
    <div>
      <div className="mb-4">
        <Link
          to="/list"
          className="inline-block bg-gray-100 px-3 py-1 border rounded text-gray-700 text-sm"
        >
          ← Back to Product List
        </Link>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-start gap-3 w-full"
      >
        <p className="mb-2">Product Images (click to change)</p>

        <div className="flex gap-2 flex-wrap">
          {[0, 1, 2, 3].map((index) => {
            const existingImage = existingImages[index];
            const newImage = [image1, image2, image3, image4][index];
            const displayImage = newImage ? URL.createObjectURL(newImage) : (existingImage || assets.upload_area);
            
            return (
              <label key={index} htmlFor={`image${index + 1}`}>
                <img 
                  className="w-20 h-20 object-cover border border-gray-300" 
                  src={displayImage} 
                  alt={`Image ${index + 1}`} 
                />
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (index === 0) setImage1(file);
                    if (index === 1) setImage2(file);
                    if (index === 2) setImage3(file);
                    if (index === 3) setImage4(file);
                  }}
                  type="file"
                  id={`image${index + 1}`}
                  hidden
                  accept="image/*"
                />
              </label>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-1">Click image to change. Leave as is to keep existing.</p>
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="px-3 py-2 w-full max-w-[500px]"
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="px-3 py-2 w-full max-w-[500px]"
            type="text"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="flex sm:flex-row flex-col gap-2 sm:gap-8 w-full">
          <div>
            <p className="mb-2">Product category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="px-3 py-2 w-full"
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
            <p className="mb-2">Sub category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="px-3 py-2 w-full"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
              <option value="Belts">Belts</option>
              <option value="Watches">Watches</option>
              <option value="Sunglasses">Sunglasses</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="px-3 py-2 w-full sm:w-[120px]"
              type="number"
              placeholder="25"
            />
          </div>
        </div>
        <div>
          <p className="mb-2">Product Sizes</p>
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
              >
                <p
                  className={`${
                    sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>

        <button type="submit" className="bg-black mt-4 py-3 w-28 text-white">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Edit;
