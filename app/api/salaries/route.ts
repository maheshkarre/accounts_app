import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust this path to where your MySQL connection is exported

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, position, amount, date_paid } = body;

    // Validate required fields
    if (!name || !position || !amount || !date_paid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into the database
    const [result]: any = await db.query(
      `INSERT INTO salaries (name, position, amount, date_paid) VALUES (?, ?, ?, ?)`,
      [name, position, amount, date_paid]
    );

    return NextResponse.json({
      message: "✅ Salary entry added successfully",
      salaryId: result.insertId
    });
  } catch (error: any) {
    console.error("❌ Error inserting salary:", error);
    return NextResponse.json(
      { error: "Internal server error", detail: error.message },
      { status: 500 }
    );
  }
}

