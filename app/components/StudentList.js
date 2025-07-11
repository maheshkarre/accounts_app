export default function StudentList({ students }) {
  return (
    <div>
      <h2 className="font-bold mb-2">Students</h2>
      {students.map(s => (
        <div key={s._id} className="border p-2 mb-1">
          {s.name} | {s.rollNumber} | {s.department} | ₹{s.feePaid}
        </div>
      ))}
    </div>
  )
}

