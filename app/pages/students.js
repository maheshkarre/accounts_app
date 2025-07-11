import { useEffect, useState } from 'react';
import StudentForm from '@/components/StudentForm';
import StudentList from '@/components/StudentList';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/api/students').then(res => res.json()).then(setStudents);
  }, []);

  const handleAdd = (student) => {
    setStudents(prev => [...prev, student]);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Students</h1>
      <StudentForm onAdd={handleAdd} />
      <StudentList students={students} />
    </div>
  )
}

