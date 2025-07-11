"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function MakePaymentPage() {
  const router = useRouter();
  const [hallTicket, setHallTicket] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hallTicket || !amount || !paymentType || !branch || !section) {
      setMessage("❗ Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("/api/make-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hallTicket,
          amount,
          paymentType,
          branch,
          section,
          remarks,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || "Payment submission failed"}`);
      } else {
        setMessage("✅ Payment submitted successfully");
        setHallTicket("");
        setAmount("");
        setPaymentType("");
        setBranch("");
        setSection("");
        setRemarks("");
      }
    } catch (err) {
      console.error("Error submitting payment:", err);
      setMessage("❌ Payment submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4 text-white">
      {/* Payment Logo */}
      <div className="mb-4 p-3 rounded-2xl bg-blue-600/20 border border-blue-500/20">
        <BookOpen className="w-12 h-12 text-blue-400" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-6 rounded shadow max-w-lg w-full space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-blue-400">Make Payment</h1>

        {message && (
          <p
            className={`text-center text-sm ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium">
            Hall Ticket Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={hallTicket}
            onChange={(e) => setHallTicket(e.target.value)}
            className="border p-2 w-full rounded bg-slate-800 border-slate-600 text-white"
            placeholder="Enter Hall Ticket Number"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Amount to Pay <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full rounded bg-slate-800 border-slate-600 text-white"
            placeholder="Enter Amount"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Payment Type <span className="text-red-500">*</span>
          </label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="border p-2 w-full rounded bg-slate-800 border-slate-600 text-white"
          >
            <option value="">Select Payment Type</option>
            <option value="College Fee">College Fee</option>
            <option value="Bus Fee">Bus Fee</option>
            <option value="Hostel Fee">Hostel Fee</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Branch <span className="text-red-500">*</span>
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="border p-2 w-full rounded bg-slate-800 border-slate-600 text-white"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
            <option value="AI & ML">AI & ML</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Section <span className="text-red-500">*</span>
          </label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border p-2 w-full rounded bg-slate-800 border-slate-600 text-white"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="border p-2 w-full rounded bg-slate-800 border-slate-600 text-white"
            rows={3}
            placeholder="Optional remarks..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition"
        >
          Submit Payment
        </button>
      </form>

      {/* Back to Home */}
      <div className="mt-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-blue-400 hover:underline text-sm"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

