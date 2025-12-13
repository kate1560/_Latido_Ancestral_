import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

// Almacenamiento temporal de usuarios (en producción usar una BD)
let registeredUsers: any[] = [
  {
    id: '1',
    email: 'admin@latido.com',
    passwordHash: '$2b$10$fx5UYY5n6rbwxSLad.E5BuN1gjrFePoYxirQ6Uxvpr5hYPWjhZwBa',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true
  }
];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword, firstName, lastName } = await request.json();

    // Aceptar tanto 'name' como 'firstName' y 'lastName'
    let first = firstName || '';
    let last = lastName || '';
    
    if (!first && !last && name) {
      // Si solo viene 'name', dividirlo
      const nameParts = name.trim().split(' ');
      first = nameParts[0];
      last = nameParts.slice(1).join(' ') || 'User';
    }

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!first) {
      return NextResponse.json(
        { message: 'First name is required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    if (registeredUsers.find(u => u.email === email)) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear nuevo usuario
    const newUser = {
      id: String(Date.now()),
      email,
      passwordHash,
      firstName: first,
      lastName: last || 'User',
      role: 'customer',
      isActive: true
    };

    // Agregar a la lista de usuarios (en producción guardar en BD)
    registeredUsers.push(newUser);

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: `${newUser.firstName} ${newUser.lastName}`,
        role: newUser.role,
      },
      message: 'Registration successful'
    }, { status: 201 });

    // Set session cookie
    response.cookies.set('user', JSON.stringify({
      id: newUser.id,
      email: newUser.email,
      name: `${newUser.firstName} ${newUser.lastName}`,
      role: newUser.role,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
