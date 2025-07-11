"use client";

import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  return (
    <div className="bg-[#1e293b] p-4 flex justify-between items-center">
      <div className="flex gap-6">
        <button
          onClick={() => router.push("/")}
          className="text-white hover:underline text-lg"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-white hover:underline text-lg"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

