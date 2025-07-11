"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  const isLoginPage = pathname === "/login";

  return (
    <nav className="bg-gray-100 border-b border-gray-300 py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-60 h-15 rounded" />
        </div>

        <div className="flex-1"></div>

        <div className="relative">
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer border border-gray-400 bg-white hover:bg-gray-200 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-8 h-8"
            >
              <circle cx="256" cy="256" r="256" fill="url(#grad)" />
              <path
                d="M256 128c35.35 0 64 28.65 64 64s-28.65 64-64 64-64-28.65-64-64 28.65-64 64-64zm0 256c-52.94 0-99.53-25.88-128-65.23C139.1 286.7 195.1 272 256 272s116.9 14.7 128 46.8C355.5 358.1 308.9 384 256 384z"
                fill="#6B7280"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow p-2 border border-gray-300">
              {isLoginPage ? (
                <>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => router.push("/signup")}
                  >
                    Signup
                  </button>
                </>
              ) : (
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("role");
                    router.push("/login");
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

