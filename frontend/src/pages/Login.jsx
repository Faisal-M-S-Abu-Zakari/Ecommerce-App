import { useState } from "react";

const Login = () => {
  // if i in login page then the name input will not appear , it will apear only in register
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center gap-4 m-auto mt-14 w-[90%] sm:max-w-96 text-text"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="bg-border border-none w-8 h-[1.5px]" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="px-3 py-2 border border-border w-full"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="px-3 py-2 border border-border w-full"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="px-3 py-2 border border-border w-full"
        placeholder="Password"
        required
      />
      <div className="flex justify-between -mt-2 w-full text-sm">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black mt-4 px-8 py-2 font-light text-white">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
