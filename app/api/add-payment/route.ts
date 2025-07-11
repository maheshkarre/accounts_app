import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // your shared DB connection utility

export async function POST(req: NextRequest) {
  try {
    const { studentId, amount, paymentType, remarks } = await req.json();

    if (!studentId || !amount || !paymentType) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const date = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD

    const [result]: any = await db.execute(
      'INSERT INTO payments (student_id, date, amount, payment_type) VALUES (?, ?, ?, ?)',
      [studentId, date, amount, paymentType]
    );

    return NextResponse.json({ success: true, paymentId: result.insertId });
  } catch (error) {
    console.error('Error inserting payment:', error);
    return NextResponse.json({ success: false, error: 'Server error while inserting payment' }, { status: 500 });
  }
}

