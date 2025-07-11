import { useState } from 'react';

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', amount: '', category: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount: parseFloat(form.amount) })
    });
    const data = await res.json();
    onAdd(data);
    setForm({ title: '', amount: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input className="border p-2 w-full" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
      <input className="border p-2 w-full" placeholder="Amount" name="amount" value={form.amount} onChange={handleChange} />
      <input className="border p-2 w-full" placeholder="Category" name="category" value={form.category} onChange={handleChange} />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Expense</button>
    </form>
  )
}

