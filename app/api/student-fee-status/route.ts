import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust path based on your project

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hallTicket, feeType } = body;

    if (!hallTicket || !feeType) {
      return NextResponse.json({ error: 'Missing hallTicket or feeType' }, { status: 400 });
    }

    console.log("hallTicket:", hallTicket, "feeType:", feeType);

    // Get student details
    const [studentRows]: any = await db.query(
      `SELECT s.id AS student_id, s.name AS studentName, b.name AS branchName
       FROM students s
       LEFT JOIN branches b ON s.branch_id = b.id
       WHERE s.roll_number = ?`,
      [hallTicket]
    );

    if (!studentRows || studentRows.length === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const student = studentRows[0];

    // Check payment status
    const [paymentRows]: any = await db.query(
      `SELECT id FROM payments 
       WHERE student_id = ? AND payment_type = ? LIMIT 1`,
      [student.student_id, feeType]
    );

    const paid = paymentRows.length > 0;
    const feeStatus = paid ? 'Fee already paid' : 'Fee not paid yet';

    return NextResponse.json({
      studentName: student.studentName,
      branch: student.branchName,
      section: "", // optional
      feeStatus,
      paid,
    });
  } catch (err) {
    console.error("API SQL Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

