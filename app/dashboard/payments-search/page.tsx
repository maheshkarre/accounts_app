"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchPaymentsPage() {
  const router = useRouter();
  const [hallTicket, setHallTicket] = useState("");
  const [selectedFeeType, setSelectedFeeType] = useState<string | null>(null);
  const [username] = useState<string>("Faculty");

  const [studentName, setStudentName] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [feeStatus, setFeeStatus] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) router.replace("/login");

    history.pushState(null, "", window.location.href);
    const handlePopState = () => history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleFeeTypeClick = (type: string) => setSelectedFeeType(type);

  const handleSearch = async () => {
    if (!hallTicket.trim() || !selectedFeeType) {
      alert("Please select a fee type and enter a valid Hall Ticket number");
      return;
    }

    try {
      const res = await fetch("/api/student-fee-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hallTicket, feeType: selectedFeeType }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        alert("Unexpected server response. Please try again later.");
        return;
      }

      if (res.ok) {
        setStudentName(data.studentName || "");
        setBranch(data.branch || "");
        setSection(data.section || "");
        setFeeStatus(data.feeStatus || "");
      } else {
        alert(data.error || "Student not found");
        setStudentName("");
        setBranch("");
        setSection("");
        setFeeStatus("");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("An error occurred while contacting the server.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 hidden md:flex flex-col justify-between border-r border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-10">CJITS</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => router.push("/dashboard/payments-search")}
                className="text-white hover:text-blue-400 transition w-full text-left"
              >
                💳 Payments
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/dashboard/settings")}
                className="text-white hover:text-blue-400 transition w-full text-left"
              >
                ⚙️ Settings
              </button>
            </li>
          </ul>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-4">
          <div className="text-white text-sm mb-2">👤 {username}</div>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.replace("/login");
            }}
            className="text-red-400 hover:text-red-300 transition w-full text-left text-sm"
          >
            🔓 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 px-6 py-4 flex gap-4 border-b border-gray-700">
          <button
            onClick={() => router.push("/home")}
            className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Dashboard
          </button>
        </div>

        <div className="p-6 md:p-10 flex-1">
          <h1 className="text-3xl font-bold text-blue-400 mb-10 text-center">
            Search Payments
          </h1>

          {/* Fee Type Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {["College Fee", "Bus Fee", "Hostel Fee", "Others"].map((type) => {
              const bgColor =
                type === "College Fee"
                  ? "bg-blue-600"
                  : type === "Bus Fee"
                  ? "bg-green-600"
                  : type === "Hostel Fee"
                  ? "bg-purple-600"
                  : "bg-gray-600";
              const isSelected = selectedFeeType === type;

              return (
                <button
                  key={type}
                  onClick={() => handleFeeTypeClick(type)}
                  className={`h-20 w-full rounded text-white font-semibold transition ${
                    isSelected ? `${bgColor}` : `${bgColor} opacity-70 hover:opacity-100`
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Hall Ticket Input */}
          <div className="bg-gray-800 rounded-lg shadow p-6 max-w-xl mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Student Hall Ticket Number
              </label>
              <input
                type="text"
                value={hallTicket}
                onChange={(e) => setHallTicket(e.target.value)}
                placeholder="Enter Hall Ticket Number"
                className="w-full border border-gray-600 rounded px-3 py-2 text-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Display Student Info */}
            <div className="text-sm text-gray-300 space-y-2 mb-4">
              {studentName && <p>Name: <span className="text-white font-medium">{studentName}</span></p>}
              {branch && <p>Branch: <span className="text-white font-medium">{branch}</span></p>}
              {section && <p>Section: <span className="text-white font-medium">{section}</span></p>}
              {selectedFeeType && <p>Fee Type: <span className="text-white font-medium">{selectedFeeType}</span></p>}
              {feeStatus && <p>Status: <span className="text-white font-medium">{feeStatus}</span></p>}
            </div>

            <div className="text-center">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white min-w-[200px] h-12 text-lg rounded hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.back()}
              className="text-blue-400 hover:underline text-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

