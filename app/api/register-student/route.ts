import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, name, rollNumber, branchId, phone, email } = body;

  if (!username || !password || !name || !rollNumber || !branchId || !phone || !email) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Start a transaction
    const conn = await db.getConnection();
    await conn.beginTransaction();

    // Insert into users
    const [userRes]: any = await conn.query(
      'INSERT INTO users (username, password_hash, role, phone, email) VALUES (?, ?, ?, ?, ?)',
      [username, hash, 'student', phone, email]
    );

    const userId = userRes.insertId;

    // Insert into students
    await conn.query(
      'INSERT INTO students (name, roll_number, branch_id, user_id) VALUES (?, ?, ?, ?)',
      [name, rollNumber, branchId, userId]
    );

    await conn.commit();
    conn.release();

    return NextResponse.json({ success: true, message: 'Student registered successfully' });

  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Registration failed', details: err.message }, { status: 500 });
  }
}

