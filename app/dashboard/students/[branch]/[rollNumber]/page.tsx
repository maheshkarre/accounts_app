"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Payment = {
  id: number;
  date: string;
  amount: number;
};

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const branch = typeof params.branch === "string" ? params.branch : "";
  const roll = typeof params.rollNumber === "string" ? params.rollNumber : "";

  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (!branch || !roll) return;

    // Simulated payment history
    const allPayments: Record<string, Payment[]> = {
      "CSE123": [
        { id: 1, date: "2025-01-10", amount: 10000 },
        { id: 2, date: "2025-03-15", amount: 15000 }
      ],
      "CSE456": [
        { id: 1, date: "2025-02-05", amount: 12000 }
      ],
      "ECE789": [
        { id: 1, date: "2025-01-20", amount: 11000 }
      ]
    };

    setPayments(allPayments[roll] || []);
  }, [branch, roll]);

  if (!branch || !roll) {
    return <div className="p-6">Loading student details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Payment History - {roll}
        </h1>

        {payments.length === 0 ? (
          <p className="text-center">No payment records found.</p>
        ) : (
          <div className="space-y-3">
            {payments.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded shadow text-center">
                <p className="font-semibold">Date: {p.date}</p>
                <p className="text-sm text-gray-500">Amount: ₹{p.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            className="text-blue-500 underline"
            onClick={() => router.back()}
          >
            ← Back to Student List
          </button>
        </div>
      </div>
    </div>
  );
}

