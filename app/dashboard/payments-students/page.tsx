"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentsStudentsPage() {
  const searchParams = useSearchParams();
  const feeType = searchParams.get("feeType") || "Unknown Fee";
  const branch = searchParams.get("branch") || "Unknown Branch";
  const router = useRouter();

  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!year || !section) {
      alert("Please select both year and section");
      return;
    }
    setShowResults(true);
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e293b] p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-400 mb-6">CJITS</h1>
          <nav className="space-y-4">
            <button
              onClick={() => router.push("/dashboard/settings")}
              className="text-white w-full text-left hover:text-blue-400"
            >
              ⚙️ Settings
            </button>
            <hr className="border-gray-600" />
            <button
              onClick={() => router.push("/dashboard/payments-search")}
              className="text-white w-full text-left hover:text-blue-400"
            >
              💸 Payments
            </button>
          </nav>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-4">
          <div className="text-white text-sm mb-2">👤 admin_user</div>
          <button
            onClick={() => router.push("/logout")}
            className="text-red-400 hover:text-red-300 transition w-full text-left text-sm"
          >
            Logout
          </button>
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

        {/* Page Content */}
        <div className="flex justify-center items-start p-6">
          <div className="bg-slate-900 shadow rounded p-6 w-full max-w-2xl border border-gray-700">
            <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">
              {feeType} - {branch} Payments
            </h1>

            <div className="space-y-4 mb-6">
              {/* Year Selector */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Select Year
                </label>
                <select
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setSection("");
                    setShowResults(false);
                  }}
                  className="w-full border rounded px-3 py-2 bg-slate-800 text-white border-slate-600"
                >
                  <option value="">-- Select Year --</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              {/* Section Selector */}
              {year && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Select Section
                  </label>
                  <select
                    value={section}
                    onChange={(e) => {
                      setSection(e.target.value);
                      setShowResults(false);
                    }}
                    className="w-full border rounded px-3 py-2 bg-slate-800 text-white border-slate-600"
                  >
                    <option value="">-- Select Section --</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              )}
            </div>

            {/* Search Button */}
            {year && section && (
              <div className="text-center mb-6">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Search
                </button>
              </div>
            )}

            {/* Payment Results */}
            {showResults && (
              <div>
                <h2 className="text-lg font-bold mb-2 text-center text-white">
                  Payment Details
                </h2>
                <table className="w-full border text-sm text-white">
                  <thead className="bg-slate-700 text-gray-200">
                    <tr>
                      <th className="border border-slate-600 px-2 py-1">Student Name</th>
                      <th className="border border-slate-600 px-2 py-1">Hall Ticket</th>
                      <th className="border border-slate-600 px-2 py-1">Amount Paid</th>
                      <th className="border border-slate-600 px-2 py-1">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-slate-800">
                      <td className="border border-slate-600 px-2 py-1">John Doe</td>
                      <td className="border border-slate-600 px-2 py-1">HT1234</td>
                      <td className="border border-slate-600 px-2 py-1">₹50,000</td>
                      <td className="border border-slate-600 px-2 py-1 text-green-400">Paid</td>
                    </tr>
                    <tr className="bg-slate-800">
                      <td className="border border-slate-600 px-2 py-1">Jane Smith</td>
                      <td className="border border-slate-600 px-2 py-1">HT5678</td>
                      <td className="border border-slate-600 px-2 py-1">₹45,000</td>
                      <td className="border border-slate-600 px-2 py-1 text-red-400">Unpaid</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

