export default function ExpenseList({ expenses }) {
  return (
    <div>
      <h2 className="font-bold mb-2">Expenses</h2>
      {expenses.map(e => (
        <div key={e._id} className="border p-2 mb-1">
          {e.title} | ₹{e.amount} | {e.category}
        </div>
      ))}
    </div>
  )
}

