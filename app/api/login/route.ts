import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, role } = body;

    if (!username || !password || !role) {
      return NextResponse.json({ error: 'Username, password, and role are required' }, { status: 400 });
    }

    // Fetch user by username + role
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE username = ? AND role = ? LIMIT 1',
      [username, role]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Invalid username, role, or password' }, { status: 401 });
    }

    const user = rows[0];

    if (!user.password_hash) {
      console.error('❌ No password hash for user:', user.username);
      return NextResponse.json({ error: 'Password not configured' }, { status: 500 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid username, role, or password' }, { status: 401 });
    }

    // Success
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        created_at: user.created_at
      }
    });

  } catch (err: any) {
    console.error('❌ Login error:', err.message);
    console.error('❌ Stack trace:', err.stack);
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 });
  }
}

