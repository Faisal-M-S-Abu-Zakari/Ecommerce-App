import { useState, useContext, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, register, token } = useContext(ShopContext);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentState === "Login") {
      const success = await login(email, password);
      if (success) navigate("/");
    } else {
      const success = await register(name, email, password);
      if (success) navigate("/");
    }
  };

  return (
    <div className="py-20 min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center gap-6 m-auto w-full max-w-md bg-white p-10 rounded-3xl shadow-lg"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">{currentState}</h1>
          <div className="w-8 h-[2px] bg-[#BC9355]"></div>
        </div>

        {currentState === "Login" ? (
          ""
        ) : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#BC9355]"
            placeholder={t.firstName}
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#BC9355]"
          placeholder={t.email}
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#BC9355]"
          placeholder="Password"
          required
        />

        <div className="flex justify-between w-full text-sm mt-2">
          {currentState === "Login" ? (
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className="text-[#BC9355] font-medium hover:underline"
            >
              Create account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentState("Login")}
              className="text-[#BC9355] font-medium hover:underline"
            >
              Login Here
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#BC9355] mt-4 px-10 py-3 rounded-full text-white font-bold w-full hover:bg-[#a67d40] transition-all hover:shadow-lg"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;