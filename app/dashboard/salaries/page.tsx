"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Salary = {
  id: number;
  name: string;
  position: string;
  amount: number;
};

export default function SalariesPage() {
  const router = useRouter();
  const [salaries, setSalaries] = useState<Salary[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }

    // Simulated data
    setSalaries([
      { id: 1, name: "Prof. Sharma", position: "Professor", amount: 50000 },
      { id: 2, name: "Mr. Kumar", position: "Accountant", amount: 30000 },
      { id: 3, name: "Ms. Patel", position: "Librarian", amount: 20000 }
    ]);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-purple-600 text-center">Salaries</h1>

        <div className="space-y-3">
          {salaries.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold">{s.name} - {s.position}</p>
              <p className="text-sm text-gray-500">₹{s.amount.toLocaleString()}</p>
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

