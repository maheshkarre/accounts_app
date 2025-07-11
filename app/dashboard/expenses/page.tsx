"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

export default function ExpensesPage() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }

    // Simulated data
    setExpenses([
      { id: 1, title: "Lab Equipment", amount: 25000, date: "2025-07-01" },
      { id: 2, title: "Annual Fest", amount: 50000, date: "2025-06-15" },
      { id: 3, title: "Library Books", amount: 15000, date: "2025-05-20" }
    ]);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-red-600 text-center">Expenses</h1>

        <div className="space-y-3">
          {expenses.map((e) => (
            <div key={e.id} className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-gray-500">
                ₹{e.amount.toLocaleString()} | {e.date}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-blue-500 underline"
            onClick={() => router.back()}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

