export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Engineering College Accounting</h1>
      <a href="/students" className="text-blue-500 underline">Manage Students</a>
      <a href="/expenses" className="text-green-500 underline">Manage Expenses</a>
    </div>
  )
}

