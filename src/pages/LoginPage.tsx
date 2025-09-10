import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);

const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  const success = await login(email, password);
  setLoading(false);

  if (success) {
    navigate("/dashboard");
  }
  else {
    alert("Invalid credentials, please try again.");
  }
};


  return (
    // <div className="flex h-screen items-center justify-center bg-gray-100">
    //   <form
    //     onSubmit={handleLogin}
    //     className="bg-white shadow-md rounded-xl p-8 w-96"
    //   >
    //     <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       className="w-full mb-4 p-2 border rounded"
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       className="w-full mb-4 p-2 border rounded"
    //       required
    //     />
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
    //     >
    //       Login
    //     </button>
    //   </form>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left side (image / decoration) */}
        <div className="hidden md:block bg-gradient-to-br from-blue-500 to-purple-600">
          {/* You can place an image here if you want */}
        </div>

        {/* Right side (form) */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            <span className="flex items-center space-x-2">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-15 h-20 object-contain"
              />
              <span className="text-black">SS ENTERPSISES</span>
            </span>
          </h1>
          <p className="text-gray-500 mb-6">
            Welcome back! Log in to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="userEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="userEmail"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="userPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="userPassword"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me */}
            {/* <div className="flex items-center">
              <input
                type="checkbox"
                id="authCheck"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label
                htmlFor="authCheck"
                className="ml-2 block text-sm text-gray-600"
              >
                Remember me
              </label>
            </div> */}

            {/* Buttons */}
            <button
  type="submit"
  disabled={loading}
  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
>
  {loading ? "Logging in..." : "Login"}
</button>
          </form>
        </div>
      </div>
    </div>
  );
}
