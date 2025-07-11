"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Student = {
  id: number;
  name: string;
  rollNumber: string;
};

export default function BranchStudentsPage() {
  const params = useParams();
  const router = useRouter();
  const branch = typeof params.branch === "string" ? params.branch : null;
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (!branch) return;

    const allStudents: Record<string, Student[]> = {
      cse: [
        { id: 1, name: "John Doe", rollNumber: "CSE123" },
        { id: 2, name: "Alice Smith", rollNumber: "CSE456" }
      ],
      ece: [{ id: 3, name: "Bob Brown", rollNumber: "ECE789" }],
      aiml: [{ id: 4, name: "Charlie Green", rollNumber: "AI123" }],
      civil: [{ id: 5, name: "David White", rollNumber: "CIV456" }],
      mech: [{ id: 6, name: "Eva Black", rollNumber: "MECH789" }]
    };

    setStudents(allStudents[branch.toLowerCase()] || []);
  }, [branch]);

  if (!branch) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Students - {branch.toUpperCase()}
        </h1>

        {students.length === 0 ? (
          <p className="text-center">No students found in this branch.</p>
        ) : (
          <div className="space-y-3">
            {students.map((s) => (
              <div key={s.id} className="bg-white p-4 rounded shadow text-center">
                <p
                  className="font-semibold text-blue-600 cursor-pointer hover:underline"
                  onClick={() => router.push(`/dashboard/students/${branch}/${s.rollNumber}`)}
                >
                  {s.name}
                </p>
                <p className="text-sm text-gray-500">Roll: {s.rollNumber}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            className="text-blue-500 underline"
            onClick={() => router.back()}
          >
            ← Back to Branches
          </button>
        </div>
      </div>
    </div>
  );
}

