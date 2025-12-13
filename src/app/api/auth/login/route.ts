import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Usuarios de demostración con contraseñas hasheadas
// Estas son las contraseñas de prueba hasheadas con bcrypt
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@latido.com',
    passwordHash: '$2b$10$7V9fVyAoa.2FdZhePs7ixudz.UzWSSBiG5vEwQiH.g4PxQgLlOrtK', // admin123
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true
  },
  {
    id: '2',
    email: 'manager@latido.com',
    passwordHash: '$2b$10$vNwZFRpCxA8Z62Km1VkaDeN.6lXDPVQQIGvH.MyEUY5WTXgHSbRh6', // manager123
    firstName: 'Store',
    lastName: 'Manager',
    role: 'store_manager',
    isActive: true
  },
  {
    id: '3',
    email: 'user@latido.com',
    passwordHash: '$2b$10$Dyq5mfRySUgGlFOOKBui5OqFEDm/yBWqQ0R/zy50yFKsmSdQ8dVwG', // user123
    firstName: 'Regular',
    lastName: 'User',
    role: 'customer',
    isActive: true
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Buscar usuario en la lista de demostración
    const user = DEMO_USERS.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verificar contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Account inactive' },
        { status: 403 }
      );
    }

    // Crear respuesta con cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
      },
      message: 'Login successful'
    });

    // Establecer cookie de sesión
    response.cookies.set('user', JSON.stringify({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
