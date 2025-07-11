"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SidebarMenuPage() {
  const [showMakePayment, setShowMakePayment] = useState(false);
  const [showMakeExpenses, setShowMakeExpenses] = useState(false);
  const [showMakeSalaries, setShowMakeSalaries] = useState(false);
  const [username, setUsername] = useState("User");
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing localStorage, redirecting)
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e293b] shadow-md flex flex-col justify-between">
        <div>
          <div className="bg-[#1e293b] p-4 text-lg font-bold text-white">CJITS</div>
          <ul className="space-y-2 p-4">
            <li>
              <button
                onClick={() => setShowMakePayment(true)}
                className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
              >
                Make Payment
              </button>
              <hr className="my-1 border-slate-600" />
            </li>
            <li>
              <button
                onClick={() => setShowMakeExpenses(true)}
                className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
              >
                Add Expenses
              </button>
              <hr className="my-1 border-slate-600" />
            </li>
            <li>
              <button
                onClick={() => setShowMakeSalaries(true)}
                className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
              >
                Issue Salaries
              </button>
              <hr className="my-1 border-slate-600" />
            </li>
            <li>
              <button
                onClick={() => alert("Enable Privileges clicked")}
                className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
              >
                Enable Privileges
              </button>
              <hr className="my-1 border-slate-600" />
            </li>
            <li>
              <button
                onClick={() => alert("Settings clicked")}
                className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
              >
                Settings
              </button>
              <hr className="my-1 border-slate-600" />
            </li>
            <li>
              <button
                onClick={() => alert("Accounts clicked")}
                className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
              >
                Accounts
              </button>
              <hr className="my-1 border-slate-600" />
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="p-4 border-t border-slate-600 text-sm text-slate-400">
          User: {username}
        </div>
      </div>

    </div>
  );
}

