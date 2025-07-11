"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Topbar";


import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

type DashboardData = {
  totalExpenses: number;
  totalStudents: number;
  paidStudents: number;
  unpaidStudents: number;
  totalSalaries: number;
  currentDayPayments: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMakePayment, setShowMakePayment] = useState(false);
  const [showMakeExpenses, setShowMakeExpenses] = useState(false);
  const [showMakeSalaries, setShowMakeSalaries] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.replace("/login");
      return;
    }
    setUsername(user);
    setData({
      totalExpenses: 120000,
      totalStudents: 250,
      paidStudents: 200,
      unpaidStudents: 50,
      totalSalaries: 80000,
      currentDayPayments: 15000
    });
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    router.replace("/login");
  };

  if (loading) {
    return <div className="p-4 text-center text-white">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
      
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-[#1e293b] p-4 flex justify-between items-center">
          <div className="flex gap-6">
            <button
              onClick={() => router.push("/")}
              className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full text-left p-2 rounded hover:bg-slate-700 font-medium"
            >
              Dashboard
            </button>
          </div>
        </div>

        <div className="p-4 flex-1">
          <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">Dashboard</h1>

          {showMakePayment ? (
            <div className="mb-8 flex justify-center">
              <MakePaymentInline onClose={() => setShowMakePayment(false)} />
            </div>
          ) : showMakeExpenses ? (
            <div className="mb-8 flex justify-center">
              <AddExpensesInline onClose={() => setShowMakeExpenses(false)} />
            </div>
           ) : showMakeSalaries ? (
            <div className="mb-8 flex justify-center">
              <AddSalariesInline onClose={() => setShowMakeSalaries(false)} />
            </div>
           ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card title="Total Expenses" value={`₹${data.totalExpenses}`} color="text-red-400" onClick={() => {}} />
                <Card title="Total Students" value={data.totalStudents} color="text-white" onClick={() => {}} />
                <Card title="Students Paid Fees" value={data.paidStudents} color="text-green-400" onClick={() => {}} />
                <Card title="Students Unpaid Fees" value={data.unpaidStudents} color="text-orange-400" onClick={() => {}} />
                <Card title="Total Salaries" value={`₹${data.totalSalaries}`} color="text-purple-400" onClick={() => {}} />
                <Card title="Current Day Payments" value={`₹${data.currentDayPayments}`} color="text-blue-400" onClick={() => {}} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartCard title="Fee Status">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Paid", value: data.paidStudents },
                          { name: "Unpaid", value: data.unpaidStudents }
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        <Cell fill="#34d399" />
                        <Cell fill="#f97316" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Expenses vs Salaries + Payments">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: "Expenses", value: data.totalExpenses },
                      { name: "Salaries", value: data.totalSalaries },
                      { name: "Today Payments", value: data.currentDayPayments }
                    ]}>
                      <XAxis dataKey="name" stroke="#cbd5e1" />
                      <YAxis stroke="#cbd5e1" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!studentId || !amount || !paymentType || !branch || !section) {
    setMessage("❗ Please fill all required fields");
    return;
  }

  setIsSubmitting(true); // start loading
  try {
    const res = await fetch("/api/add-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId,
        amount,
        paymentType,
        remarks,
      }),
    });

    const result = await res.json();
    if (result.success) {
      setMessage("✅ Payment submitted successfully");
      setHallTicket(""); setAmount(""); setPaymentType("");
      setBranch(""); setSection(""); setRemarks(""); setStudentId(null);
      setStudentValidated(false); setStudentName("");
    } else {
      setMessage("❌ Failed to submit payment");
    }
  } catch (err) {
    setMessage("❌ Server error while submitting");
  }
  setIsSubmitting(false); // stop loading
};


function MakePaymentInline({ onClose }: { onClose: () => void }) {
  const [hallTicket, setHallTicket] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [remarks, setRemarks] = useState("");
  const [studentName, setStudentName] = useState("");
  const [message, setMessage] = useState("");
  const [studentId, setStudentId] = useState<number | null>(null);
  const [studentValidated, setStudentValidated] = useState(false);

  const sectionOptions = ["A", "B", "C"];

  const fetchStudentDetails = async () => {
    if (!hallTicket) return;
    try {
      const res = await fetch("/api/get-student-by-hallticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hallTicket }),
      });
      const result = await res.json();
      if (result.success && result.student) {
        setStudentId(result.student.id);
        setStudentName(result.student.name);
        setBranch(result.student.branch);
        setSection(result.student.section);
        setStudentValidated(true);
        setMessage("");
      } else {
        setMessage("❗ Student not found");
        setStudentId(null);
        setStudentValidated(false);
        setBranch(""); setSection(""); setStudentName("");
      }
    } catch (err) {
      setMessage("❗ Error fetching student");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !amount || !paymentType || !branch || !section) {
      setMessage("❗ Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("/api/add-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          amount,
          paymentType,
          remarks,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setMessage("✅ Payment submitted successfully");
        setHallTicket(""); setAmount(""); setPaymentType("");
        setBranch(""); setSection(""); setRemarks(""); setStudentId(null);
        setStudentValidated(false); setStudentName("");
      } else {
        setMessage("❌ Failed to submit payment");
      }
    } catch (err) {
      setMessage("❌ Server error while submitting");
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded shadow w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-blue-400 text-lg">Make Payment</h2>
        <button onClick={onClose} className="text-sm text-blue-400 hover:underline">Close</button>
      </div>

      {message && (
        <p className={`text-center text-sm ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hall Ticket Input */}
        <input
          type="text"
          value={hallTicket}
          onChange={e => setHallTicket(e.target.value)}
          onBlur={fetchStudentDetails}
          className="border p-2 w-full rounded bg-slate-700 border-slate-600 placeholder:text-slate-400 text-sm"
          placeholder="Enter Hall Ticket *"
        />

        {studentValidated && (
          <>
            {/* Name (read-only, bold) */}
            <input
              type="text"
              value={studentName}
              readOnly
              className="border p-2 w-full rounded bg-slate-600 text-slate-100 text-sm font-bold"
              placeholder="Student Name"
            />

            {/* Branch (read-only, bold) */}
            <input
              type="text"
              value={branch}
              readOnly
              className="border p-2 w-full rounded bg-slate-600 text-slate-100 text-sm font-bold"
              placeholder="Branch"
            />

            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="border p-2 w-full rounded bg-slate-700 border-slate-600 placeholder:text-slate-400 text-sm"
              placeholder="Amount *"
            />

            <select
              value={paymentType}
              onChange={e => setPaymentType(e.target.value)}
              className="border p-2 w-full rounded bg-slate-700 border-slate-600 text-white text-sm"
            >
              <option value="">Select Payment Type *</option>
              <option>College Fee</option>
              <option>Bus Fee</option>
              <option>Hostel Fee</option>
              <option>Others</option>
            </select>

            {/* Section Dropdown */}
            <select
              value={section}
              onChange={e => setSection(e.target.value)}
              className="border p-2 w-full rounded bg-slate-700 border-slate-600 text-white text-sm"
            >
              <option value="">Select Section *</option>
              {sectionOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <textarea
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              className="border p-2 w-full rounded bg-slate-700 border-slate-600 placeholder:text-slate-400 text-sm"
              placeholder="Remarks (optional)"
              rows={2}
            />

            <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
              Submit Payment
            </button>
          </>
        )}
      </form>
    </div>
  );
}



function AddExpensesInline({ onClose }: { onClose: () => void }) {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseName || !amount || !category) {
      setMessage("❗ Please fill all required fields");
      return;
    }

    const expenseData = {
      title: expenseName,
      amount: parseFloat(amount),
      category,
      remarks,
      date: new Date().toISOString().split("T")[0], // current date in YYYY-MM-DD
    };

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ Expense added successfully");
        setExpenseName(""); setAmount(""); setCategory(""); setRemarks("");
      } else {
        setMessage(`❌ ${result.error || "Something went wrong"}`);
      }
    } catch (err) {
      setMessage("❌ Failed to connect to server");
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded shadow w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-blue-400 text-lg">Add Expenses</h2>
        <button onClick={onClose} className="text-sm text-blue-400 hover:underline">Close</button>
      </div>
      {message && (
        <p className={`text-center text-sm ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" value={expenseName} onChange={e => setExpenseName(e.target.value)} className="border p-2 w-full rounded bg-slate-700 border-slate-600 placeholder:text-slate-400 text-sm" placeholder="Expenses Name *" />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="border p-2 w-full rounded bg-slate-700 border-slate-600 placeholder:text-slate-400 text-sm" placeholder="Amount *" />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 w-full rounded bg-slate-700 border-slate-600 text-white text-sm">
          <option value="">Select Category *</option>
          <option>Infrastructure</option>
          <option>Salary</option>
          <option>Utilities</option>
          <option>Miscellaneous</option>
        </select>
        <textarea value={remarks} onChange={e => setRemarks(e.target.value)} className="border p-2 w-full rounded bg-slate-700 border-slate-600 placeholder:text-slate-400 text-sm" placeholder="Remarks (optional)" rows={2}></textarea>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">Submit Expense</button>
      </form>
    </div>
  );
}

function AddSalariesInline({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [amount, setAmount] = useState("");
  const [datePaid, setDatePaid] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !position || !amount || !datePaid) {
      setMessage("❗ Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("/api/salaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          position,
          amount,
          date_paid: datePaid,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${result.error || "Failed to add salary"}`);
      } else {
        setMessage("✅ Salary added successfully");
        setName("");
        setPosition("");
        setAmount("");
        setDatePaid("");
      }
    } catch (err) {
      setMessage("❌ Server error while adding salary");
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded shadow w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-blue-400 text-lg">Add Salary</h2>
        <button onClick={onClose} className="text-sm text-blue-400 hover:underline">Close</button>
      </div>
      {message && (
        <p className={`text-center text-sm ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full rounded bg-slate-700 border-slate-600 placeholder:text-slate-400 text-sm"
          placeholder="Employee Name *"
        />
         <select
          value={position}
          onChange={e => setPosition(e.target.value)}
          className="border p-2 w-full rounded bg-slate-700 border-slate-600 text-white text-sm"
        >
          <option value="">Select Position *</option>
          <option>Director</option>
          <option>Principal</option>
          <option>Vice Principal</option>
          <option>Professor</option>
          <option>Assistant Professor</option>
          <option>Lab Assistant</option>
          <option>Assistant</option>
          <option>Attenders</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border p-2 w-full rounded bg-slate-700 border-slate-600 placeholder:text-slate-400 text-sm"
          placeholder="Amount *"
        />
        <input
          type="date"
          value={datePaid}
          onChange={e => setDatePaid(e.target.value)}
          className="border p-2 w-full rounded bg-slate-700 border-slate-600 text-white text-sm"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
          Submit Salary
        </button>
      </form>
    </div>
  );
}




function Card({ title, value, color, onClick }: { title: string, value: string | number, color: string, onClick: () => void }) {
  return (
    <div className="bg-slate-800 rounded shadow p-4 cursor-pointer hover:shadow-lg transition" onClick={onClick}>
      <h2 className="text-sm text-slate-400">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-slate-800 p-4 rounded shadow">
      <h2 className="font-bold mb-4 text-center text-blue-400">{title}</h2>
      {children}
    </div>
  );
}

