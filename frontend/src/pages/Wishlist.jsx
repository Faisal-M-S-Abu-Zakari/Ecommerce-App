import { useContext, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";

const Wishlist = () => {
  const { products, wishlist, toggleWishlist, token, navigate } = useContext(ShopContext);
  const { t } = useLanguage();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (!token) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p._id));

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">
            {t.wishlist}
          </span>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mt-2">{t.savedItems}</h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">{t.wishlistEmpty}</p>
            <p className="text-gray-400 text-sm mb-6">{t.wishlistEmptySub}</p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-[#BC9355] px-8 py-3 rounded-full text-white font-bold text-sm hover:bg-[#a67d40] transition-all"
            >
              {t.continueShopping}
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-8">{wishlistProducts.length} {t.savedProducts}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlistProducts.map((product) => (
                <div key={product._id} className="relative">
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-4 left-4 z-10 p-2.5 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                    title={t.removeFromWishlist}
                  >
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <ProductItem
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    image={product.images || product.image}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
