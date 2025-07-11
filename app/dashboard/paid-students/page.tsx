"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  name: string;
  rollNumber: string;
  department: string;
};

export default function PaidStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }

    // Simulated data
    setStudents([
      { id: 1, name: "John Doe", rollNumber: "123", department: "CSE" },
      { id: 2, name: "Jane Smith", rollNumber: "456", department: "ECE" },
      { id: 3, name: "Alice Johnson", rollNumber: "789", department: "EEE" }
    ]);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">Paid Students</h1>
        
        <div className="flex flex-col items-center space-y-3">
          {students.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded shadow w-full">
              <p className="font-semibold text-center">{s.name}</p>
              <p className="text-sm text-gray-500 text-center">
                Roll: {s.rollNumber} | Dept: {s.department}
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

