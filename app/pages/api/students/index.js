import dbConnect from '@/utils/dbConnect';
import Student from '@/models/student';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    const students = await Student.find({});
    res.json(students);
  } else if (req.method === 'POST') {
    const student = await Student.create(req.body);
    res.json(student);
  } else {
    res.status(405).end();
  }
}

