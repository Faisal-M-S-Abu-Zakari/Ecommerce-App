import { assets } from "./../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <img src={assets.logo} className="h-8 mb-6" alt="" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              Crafting modern fashion for the conscious consumer. Quality materials, sustainable practices, timeless design.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-black text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-black text-sm transition-colors">About</Link></li>
              <li><Link to="/collection" className="text-gray-500 hover:text-black text-sm transition-colors">Collection</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-black text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-500 text-sm">+1 (555) 123-4567</li>
              <li className="text-gray-500 text-sm">hello@store.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2026 Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
