import dbConnect from '@/utils/dbConnect';
import Expense from '@/models/expense';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    const expenses = await Expense.find({});
    res.json(expenses);
  } else if (req.method === 'POST') {
    const expense = await Expense.create(req.body);
    res.json(expense);
  } else {
    res.status(405).end();
  }
}

