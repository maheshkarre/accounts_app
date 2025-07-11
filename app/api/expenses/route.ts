import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, amount, date, remarks } = body;

    // Validate required fields
    if (!title || !category || !amount || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: title, category, amount, or date' },
        { status: 400 }
      );
    }

    // Insert into the database
    const [result]: any = await db.query(
      `INSERT INTO expenses (title, category, amount, date, remarks) VALUES (?, ?, ?, ?, ?)`,
      [title, category, amount, date, remarks || null]
    );

    return NextResponse.json({
      message: '✅ Expense saved successfully',
      expenseId: result.insertId
    });

  } catch (err: any) {
    console.error("❌ Error inserting expense:", err);
    return NextResponse.json(
      { error: 'Internal server error', detail: err.message },
      { status: 500 }
    );
  }
}

