import { useEffect, useState } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch('/api/expenses').then(res => res.json()).then(setExpenses);
  }, []);

  const handleAdd = (expense) => {
    setExpenses(prev => [...prev, expense]);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Expenses</h1>
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} />
    </div>
  )
}

