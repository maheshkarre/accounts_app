"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentsBranchesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const feeType = searchParams.get("feeType") || "Unknown Fee";

  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || "User");
      } catch (e) {}
    }
  }, []);

  const handleBranchClick = (branch: string) => {
    router.push(
      `/dashboard/payments-students?feeType=${encodeURIComponent(
        feeType
      )}&branch=${encodeURIComponent(branch)}`
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">CJITS</h2>
          <nav className="space-y-4">
            <button
              onClick={() => router.push("/dashboard/settings")}
              className="block text-left w-full text-sm hover:text-blue-400"
            >
              ⚙️ Settings
            </button>
            <hr className="border-slate-700" />
            <button
              onClick={() => router.push("/logout")}
              className="block text-left w-full text-sm hover:text-red-400"
            >
              🔒 Logout
            </button>
            <hr className="border-slate-700" />
          </nav>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-4">
          <div className="text-white text-sm mb-2">👤 {userName}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Nav */}
        <div className="flex items-center justify-start bg-[#0f172a] h-16 px-6 border-b border-gray-700 space-x-10">
          <button
            onClick={() => router.push("/dashboard/payments-search")}
            className="text-white hover:text-blue-400"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-white hover:text-blue-400"
          >
            Dashboard
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-blue-400 my-6">
          {feeType} - Select Branch
        </h1>

        {/* Branch Buttons */}
	<div className="flex flex-wrap gap-4 justify-center mb-8 px-6">
	  {["CSE", "ECE", "AI & ML", "CIVIL", "MECH"].map((branch) => (
	    <button
	      key={branch}
	      onClick={() => handleBranchClick(branch)}
	      className="px-6 py-3 bg-slate-700 text-white rounded hover:bg-blue-600 transition whitespace-nowrap"
	    >
	      {branch}
	    </button>
	  ))}
	</div>


        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => router.back()}
            className="text-blue-400 hover:underline text-sm"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

