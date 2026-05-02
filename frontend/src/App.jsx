import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import BestSellerPage from "./pages/BestSellerPage";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import BackToTop from "./components/BackToTop";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "./context/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FDFCFB]">
        <ToastContainer />
        <BackToTop />
        <NavBar />
        <div className="pt-16">
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/bestseller" element={<BestSellerPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
