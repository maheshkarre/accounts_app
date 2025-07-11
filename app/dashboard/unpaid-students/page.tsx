"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  name: string;
  rollNumber: string;
  department: string;
};

export default function UnpaidStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }

    // Simulate fetching unpaid students
    const demoUnpaid: Student[] = [
      { id: 1, name: "John Doe", rollNumber: "123", department: "CSE" },
      { id: 2, name: "Jane Smith", rollNumber: "456", department: "ECE" },
      { id: 3, name: "Alice Johnson", rollNumber: "789", department: "EEE" }
    ];
    setStudents(demoUnpaid);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-orange-600 text-center">
          Unpaid Students
        </h1>

        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="border rounded p-4 shadow-sm bg-white text-center"
            >
              <p className="font-semibold">{student.name}</p>
              <p className="text-sm text-gray-500">
                Roll: {student.rollNumber} | Dept: {student.department}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.back()}
            className="text-blue-500 underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

