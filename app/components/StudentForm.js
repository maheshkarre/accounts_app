import { useState } from 'react';

export default function StudentForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', rollNumber: '', department: '', feePaid: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, feePaid: parseFloat(form.feePaid) })
    });
    const data = await res.json();
    onAdd(data);
    setForm({ name: '', rollNumber: '', department: '', feePaid: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input className="border p-2 w-full" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
      <input className="border p-2 w-full" placeholder="Roll Number" name="rollNumber" value={form.rollNumber} onChange={handleChange} />
      <input className="border p-2 w-full" placeholder="Department" name="department" value={form.department} onChange={handleChange} />
      <input className="border p-2 w-full" placeholder="Fee Paid" name="feePaid" value={form.feePaid} onChange={handleChange} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Student</button>
    </form>
  )
}
