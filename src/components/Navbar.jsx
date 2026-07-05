import { Loader } from "lucide-react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoading(true);
    Cookies.remove("token");
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div onClick={() => navigate("/")} className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-600 tracking-tight cursor-pointer">
              Go Business
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="hidden sm:block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]">
              Try for free
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-400 bg-white px-5 py-2.5 text-sm font-bold text-red-700 transition-all duration-200 hover:bg-red-50 hover:border-red-300 active:scale-[0.98]"
            >
              {loading ? (
                <Loader className="mx-auto h-5 w-5 animate-spin text-red-700" />
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
