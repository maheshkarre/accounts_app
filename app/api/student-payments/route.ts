import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { student_id, amount, date } = await req.json();

    if (!student_id || !amount || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.query(
      'INSERT INTO payments (student_id, amount, date) VALUES (?, ?, ?)',
      [student_id, amount, date]
    );

    return NextResponse.json({ message: "Payment added successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to insert payment", detail: err.message }, { status: 500 });
  }
}

