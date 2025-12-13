import { NextRequest, NextResponse } from 'next/server';
import { findUserById, db, getOrdersByUserId } from '../../../../../database/data';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user = findUserById(id);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove password
    const { password: _, ...userWithoutPassword } = user;

    // Get user orders
    const orders = getOrdersByUserId(id);

    return NextResponse.json({
      ...userWithoutPassword,
      orders
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updates = await request.json();
    
    const userIndex = db.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Don't allow email changes
    if (updates.email) {
      delete updates.email;
    }

    db.users[userIndex] = {
      ...db.users[userIndex],
      ...updates
    };

    const { password: _, ...userWithoutPassword } = db.users[userIndex];

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
