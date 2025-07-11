import dbConnect from '@/utils/dbConnect';
import Expense from '@/models/expense';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  if (req.method === 'PUT') {
    const expense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.json(expense);
  } else if (req.method === 'DELETE') {
    await Expense.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } else {
    res.status(405).end();
  }
}

