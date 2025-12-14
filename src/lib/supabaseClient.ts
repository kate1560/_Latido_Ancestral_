import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente para el frontend (browser)
export const supabaseBrowserClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Cliente para AUTH público (signup / login) en el backend
export function createSupabaseAnonClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

// Cliente SERVICE ROLE para DB / admin
export function createSupabaseServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
    },
  });
}
