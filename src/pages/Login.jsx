import React, { useState } from "react";
import Cookies from "js-cookie";
import { api } from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { Loader, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await api.post("auth/signin", {
        email,
        password,
      });

      const response = res.data;
      const token = response?.data?.token ?? response?.token;

      if (response?.success && token) {
        Cookies.set("jwt_token", token, { expires: 7 });
        navigate("/", { replace: true });
      } else {
        setError(
          response?.message || "Unable to sign in. Please check your credentials."
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_30px_50px_-30px_rgba(15,23,42,0.25)]">
        
        <div className="mb-7">
          <h1 className="m-0 text-3xl font-extrabold text-indigo-600 tracking-tight">
            Go Business
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to open your referral dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              name="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                name="password"
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-12 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message Container (keeps layout stable) */}
          <div className="min-h-[24px]">
            {error && (
              <p className="text-sm font-medium text-red-500 text-center animate-pulse">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader className="mx-auto h-5 w-5 animate-spin text-white" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;