"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentsBranchesPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const branches = [
    { code: "cse", name: "CSE" },
    { code: "ece", name: "ECE" },
    { code: "aiml", name: "AI & ML" },
    { code: "civil", name: "CIVIL" },
    { code: "mech", name: "MECH" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Branch</h1>

        <div className="space-y-3">
          {branches.map((b) => (
            <div
              key={b.code}
              className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition text-center"
              onClick={() => router.push(`/dashboard/students/${b.code}`)}
            >
              <p className="font-semibold">{b.name}</p>
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

