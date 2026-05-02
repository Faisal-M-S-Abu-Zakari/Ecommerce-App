import { useContext, useState, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, user, setUser, navigate, API_URL } = useContext(ShopContext);
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [profileForm, setProfileForm] = useState({ name: "", phone: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [addressForm, setAddressForm] = useState({
    firstName: "", lastName: "", street: "", city: "", state: "", zipcode: "", country: "", phone: "",
  });

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setProfileForm({ name: data.user.name || "", phone: data.user.phone || "" });
        setAddresses(data.user.addresses || []);
      }
    } catch (e) { console.error(e); }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t.profileUpdated);
        if (setUser) setUser((prev) => ({ ...prev, name: profileForm.name }));
      } else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
    setLoading(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(t.passwordMismatch); return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t.passwordUpdated);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
    setLoading(false);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/user/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(addressForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t.addressAdded);
        setAddresses((prev) => [...prev, data.address]);
        setAddressForm({ firstName: "", lastName: "", street: "", city: "", state: "", zipcode: "", country: "", phone: "" });
        setShowAddressForm(false);
      } else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
  };

  const handleRemoveAddress = async (addressId) => {
    try {
      const res = await fetch(`${API_URL}/api/user/address/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ addressId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t.addressRemoved);
        setAddresses((prev) => prev.filter((a) => a._id !== addressId));
      }
    } catch (e) { toast.error(e.message); }
  };

  if (!token) return null;

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#BC9355] text-sm";
  const tabs = [
    { id: "profile", label: t.personalInfo, icon: "👤" },
    { id: "password", label: t.changePassword, icon: "🔒" },
    { id: "addresses", label: t.myAddresses, icon: "📍" },
  ];

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[#BC9355] font-bold text-sm tracking-widest uppercase">{t.account}</span>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mt-2">{t.myProfile}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-60 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="w-16 h-16 bg-[#BC9355]/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-2xl font-bold text-[#BC9355]">
                  {(user?.name || profileForm.name || "U").charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-center font-semibold text-[#1A1A1A] mb-1">{user?.name || profileForm.name}</p>
              <p className="text-center text-xs text-gray-400 mb-4">{user?.email}</p>
              <nav className="flex flex-col gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-[#BC9355] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {activeTab === "profile" && (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <h2 className="text-lg font-semibold text-[#1A1A1A] mb-6">{t.personalInfo}</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.firstName}</label>
                    <input className={inputClass} value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} placeholder={t.firstName} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                    <input className={`${inputClass} bg-gray-50 cursor-not-allowed`} value={user?.email || ""} disabled />
                    <p className="text-xs text-gray-400 mt-1">{t.emailCannotChange}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                    <input className={inputClass} value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} placeholder={t.phone} type="tel" />
                  </div>
                  <button type="submit" disabled={loading} className="bg-[#BC9355] px-8 py-3 rounded-full text-white font-bold text-sm hover:bg-[#a67d40] transition-all disabled:opacity-60">
                    {loading ? t.saving : t.saveChanges}
                  </button>
                </form>
              )}

              {activeTab === "password" && (
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <h2 className="text-lg font-semibold text-[#1A1A1A] mb-6">{t.changePassword}</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.currentPassword}</label>
                    <input className={inputClass} type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} placeholder="••••••••" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.newPassword}</label>
                    <input className={inputClass} type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} placeholder="••••••••" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.confirmPassword}</label>
                    <input className={inputClass} type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} placeholder="••••••••" required />
                  </div>
                  <button type="submit" disabled={loading} className="bg-[#BC9355] px-8 py-3 rounded-full text-white font-bold text-sm hover:bg-[#a67d40] transition-all disabled:opacity-60">
                    {loading ? t.saving : t.updatePassword}
                  </button>
                </form>
              )}

              {activeTab === "addresses" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">{t.myAddresses}</h2>
                    <button
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="flex items-center gap-2 bg-[#BC9355] px-4 py-2 rounded-full text-white font-bold text-xs hover:bg-[#a67d40] transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {t.addAddress}
                    </button>
                  </div>

                  {showAddressForm && (
                    <form onSubmit={handleAddAddress} className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                      <h3 className="font-medium text-sm text-[#1A1A1A] mb-3">{t.newAddress}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <input required className={inputClass} value={addressForm.firstName} onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })} placeholder={t.firstName} />
                        <input required className={inputClass} value={addressForm.lastName} onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })} placeholder={t.lastName} />
                      </div>
                      <input required className={inputClass} value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} placeholder={t.street} />
                      <div className="grid grid-cols-2 gap-3">
                        <input required className={inputClass} value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} placeholder={t.city} />
                        <input required className={inputClass} value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} placeholder={t.state} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input required className={inputClass} value={addressForm.zipcode} onChange={(e) => setAddressForm({ ...addressForm, zipcode: e.target.value })} placeholder={t.zipcode} />
                        <input required className={inputClass} value={addressForm.country} onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })} placeholder={t.country} />
                      </div>
                      <input className={inputClass} value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} placeholder={t.phone} type="tel" />
                      <div className="flex gap-2">
                        <button type="submit" className="bg-[#BC9355] px-6 py-2 rounded-full text-white font-bold text-sm hover:bg-[#a67d40] transition-all">{t.save}</button>
                        <button type="button" onClick={() => setShowAddressForm(false)} className="border border-gray-200 px-6 py-2 rounded-full text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all">{t.cancel}</button>
                      </div>
                    </form>
                  )}

                  {addresses.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm">{t.noAddresses}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map((addr) => (
                        <div key={addr._id} className="flex justify-between items-start p-4 border border-gray-100 rounded-xl hover:border-[#BC9355]/30 transition-colors">
                          <div>
                            <p className="font-semibold text-[#1A1A1A] text-sm">{addr.firstName} {addr.lastName}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{addr.street}, {addr.city}, {addr.state} {addr.zipcode}</p>
                            <p className="text-gray-500 text-xs">{addr.country}</p>
                            {addr.phone && <p className="text-gray-400 text-xs mt-0.5">{addr.phone}</p>}
                          </div>
                          <button onClick={() => handleRemoveAddress(addr._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
