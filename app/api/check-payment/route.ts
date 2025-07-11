import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // ✅ Adjust this if needed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { hallTicket } = body;

    if (!hallTicket) {
      return NextResponse.json({ error: 'Missing hallTicket' }, { status: 400 });
    }

    // Step 1: Get student details with branch name
    const [studentRows]: any = await db.query(
      `SELECT s.id AS student_id, s.name AS studentName, s.section,
              b.name AS branchName
       FROM students s
       LEFT JOIN branches b ON s.branch_id = b.id
       WHERE s.roll_number = ?`,
      [hallTicket]
    );

    if (!studentRows.length) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const student = studentRows[0];

    // Step 2: Fetch all fee payment statuses for the student
    const [paymentRows]: any = await db.query(
      `SELECT payment_type FROM payments WHERE student_id = ?`,
      [student.student_id]
    );

    const paidFees = new Set(paymentRows.map((row: any) => row.payment_type));

    const feeTypes = ["College Fee", "Bus Fee", "Hostel Fee", "Others"];

    const fees = feeTypes.map((type) => ({
      type,
      status: paidFees.has(type) ? "Fee already paid" : "Fee not paid yet",
      paid: paidFees.has(type),
    }));

    return NextResponse.json({
      studentName: student.studentName,
      branch: student.branchName,
      section: student.section,
      fees,
    });

  } catch (error) {
    console.error("Error fetching student details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

