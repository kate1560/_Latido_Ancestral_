import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../../database/db';

export async function GET(request: NextRequest) {
  try {
    const userCookie = request.cookies.get('user')?.value;

    if (!userCookie) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    let userData;
    try {
      userData = JSON.parse(userCookie);
    } catch {
      return NextResponse.json(
        { message: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get full user data from database
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, is_active, email_verified FROM usuarios WHERE id = $1',
      [userData.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const user = result.rows[0];

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
        role: user.role,
        isActive: user.is_active,
        emailVerified: user.email_verified
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
