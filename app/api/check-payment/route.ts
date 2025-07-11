import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db'; // ✅ Adjust this path to your DB connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hallTicket } = req.body;

  if (!hallTicket) {
    return res.status(400).json({ error: 'Missing hallTicket' });
  }

  try {
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
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = studentRows[0];

    // Step 2: Fetch all fee payment statuses for the student
    const [paymentRows]: any = await db.query(
      `SELECT payment_type FROM payments WHERE student_id = ?`,
      [student.student_id]
    );

    // Convert paid fee types to a set for easy lookup
    const paidFees = new Set(paymentRows.map((row: any) => row.payment_type));

    // Define all expected fee types (you can update this list)
    const feeTypes = ["College Fee", "Bus Fee", "Hostel Fee", "Others"];

    const fees = feeTypes.map((type) => ({
      type,
      status: paidFees.has(type) ? "Fee already paid" : "Fee not paid yet",
      paid: paidFees.has(type),
    }));

    // Final Response
    return res.status(200).json({
      studentName: student.studentName,
      branch: student.branchName,
      section: student.section,
      fees,
    });

  } catch (error) {
    console.error("Error fetching student details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

