import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Ensure this exports a valid connection or pool

export async function POST(req: NextRequest) {
  try {
    const { hallTicket } = await req.json();

    if (!hallTicket) {
      return NextResponse.json({ success: false, error: 'Hall Ticket is required' }, { status: 400 });
    }

    const [rows]: any = await db.execute(
      `SELECT s.id, s.name AS studentName,  b.name AS branchName
       FROM students s
       LEFT JOIN branches b ON s.branch_id = b.id
       WHERE s.roll_number = ? LIMIT 1`,
      [hallTicket]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }

    const student = rows[0];

    return NextResponse.json({
      success: true,
      student: {
        id: student.id,
        name: student.studentName,
        branch: student.branchName,
        section: student.section ?? "",
      },
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json({ success: false, error: 'Server error while fetching student' }, { status: 500 });
  }
}

