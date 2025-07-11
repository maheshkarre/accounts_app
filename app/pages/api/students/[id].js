import dbConnect from '@/utils/dbConnect';
import Student from '@/models/student';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  if (req.method === 'PUT') {
    const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.json(student);
  } else if (req.method === 'DELETE') {
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } else {
    res.status(405).end();
  }
}

