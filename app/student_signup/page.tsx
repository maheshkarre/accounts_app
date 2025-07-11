"use client";

import { useState } from "react";

export default function StudentRegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [branchId, setBranchId] = useState("1");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !name || !rollNumber || !branchId || !phone || !email) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await fetch('/api/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          name,
          rollNumber,
          branchId: Number(branchId),
          phone,
          email
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Registration failed");
      } else {
        setMessage("✅ Student registered successfully");
        setUsername("");
        setPassword("");
        setName("");
        setRollNumber("");
        setBranchId("1");
        setPhone("");
        setEmail("");
      }

    } catch (err) {
      console.error("Registration error:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register Student</h1>

        {message && <p className="text-center text-sm text-red-500">{message}</p>}

        <div>
          <label className="block mb-1">
            Student Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <p className="text-xs text-gray-500">Enter the full name of the student.</p>
        </div>

        <div>
          <label className="block mb-1">
            Roll Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <p className="text-xs text-gray-500">Unique roll number assigned to the student.</p>
        </div>

        <div>
          <label className="block mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <p className="text-xs text-gray-500">Enter a valid 10-digit phone number.</p>
        </div>

        <div>
          <label className="block mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <p className="text-xs text-gray-500">Example: student@example.com</p>
        </div>

        <div>
          <label className="block mb-1">
            Branch <span className="text-red-500">*</span>
          </label>
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="1">CSE</option>
            <option value="2">ECE</option>
            <option value="3">AI & ML</option>
            <option value="4">CIVIL</option>
            <option value="5">MECH</option>
          </select>
          <p className="text-xs text-gray-500">Select the student's branch.</p>
        </div>

        <div>
          <label className="block mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <p className="text-xs text-gray-500">This will be used for login.</p>
        </div>

        <div>
          <label className="block mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <p className="text-xs text-gray-500">Choose a strong password for login.</p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

