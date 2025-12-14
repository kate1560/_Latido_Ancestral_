import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/lib/auth';
import {
  createSupabaseAnonClient,
  createSupabaseServiceClient,
} from '@/lib/supabaseClient';
import { findUserByIdForAuth } from '@/lib/repositories/userRepository';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    /* --------------------------------------------------
       1) LOGIN CONTRA SUPABASE AUTH (ANON CLIENT)
    -------------------------------------------------- */
    const supabaseAuth = createSupabaseAnonClient();

    const { data: signInData, error: signInError } =
      await supabaseAuth.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError || !signInData.user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const authUser = signInData.user;
    const userId = authUser.id;

    /* --------------------------------------------------
       2) BUSCAR PERFIL EN TABLA `usuarios`
          (SI NO EXISTE, CREARLO)
    -------------------------------------------------- */
    let user = await findUserByIdForAuth(userId);

    if (!user) {
      const supabaseService = createSupabaseServiceClient();

      const { error: insertError } = await supabaseService
        .from('usuarios')
        .insert({
          id: userId,
          email: authUser.email,
          first_name: '',
          last_name: '',
          role: 'customer',
          is_active: true,
          status: 'active',
        });

      if (insertError) {
        console.error('Error creating user profile on login:', insertError);
        return NextResponse.json(
          { message: 'Failed to initialize user profile' },
          { status: 500 },
        );
      }

      // Volver a buscar el perfil recién creado
      user = await findUserByIdForAuth(userId);

      if (!user) {
        return NextResponse.json(
          { message: 'User profile could not be loaded' },
          { status: 500 },
        );
      }
    }

    /* --------------------------------------------------
       3) VALIDACIONES DE NEGOCIO
    -------------------------------------------------- */
    if (!user.is_active) {
      return NextResponse.json(
        { message: 'Account inactive' },
        { status: 403 },
      );
    }

    /* --------------------------------------------------
       4) RESPUESTA + COOKIE PROPIA
    -------------------------------------------------- */
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        name: `${user.first_name} ${user.last_name}`.trim(),
        role: user.role,
      },
      message: 'Login successful',
    });

    setAuthCookie(response, {
      sub: user.id,
      email: user.email,
      role: user.role,
      vendorId: user.vendor_id,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
