import { Pool, QueryResult } from 'pg';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'vendor' | 'customer' | 'store_manager';
  is_active: boolean;
  first_name?: string;
  last_name?: string;
}

interface InsertUserParams {
  id: string;
  email: string;
  password_hash: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'vendor' | 'customer' | 'store_manager';
}

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'tienda_virtual',
  user: 'postgres',
  password: 'Qwe.123*',
});

async function insertTestUsers(): Promise<void> {
  try {
    console.log('Inserting test users...\n');
    
    const users: InsertUserParams[] = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        email: 'admin@latido.com',
        password_hash: '$2b$10$zCRJ9U7Mq8CcALIKzhq4Pehjp6nMwLqvuAaBueiTgoCQm/TXo07vS',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        email: 'manager@latido.com',
        password_hash: '$2b$10$icQIFNIljSQvrk4sduwOe.mVYRK1oVR34AIfd8TD9/IK8RrYlEpW2',
        firstName: 'Store',
        lastName: 'Manager',
        role: 'store_manager',
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        email: 'user@latido.com',
        password_hash: '$2b$10$XCB4TuHeH5N7hGQMqWIV1ORvbGrO3uLqUVmbn5KhQ6vBxDZYhQQIq',
        firstName: 'Regular',
        lastName: 'User',
        role: 'customer',
      },
    ];
    
    for (const user of users) {
      await pool.query(
        `INSERT INTO usuarios (id, email, password_hash, first_name, last_name, role, is_active, email_verified, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, true, true, NOW())
         ON CONFLICT (id) DO UPDATE 
         SET password_hash = $3, is_active = true`,
        [user.id, user.email, user.password_hash, user.firstName, user.lastName, user.role]
      );
      console.log(`✓ Inserted/Updated ${user.email}`);
    }
    
    // Verify insertion
    const result: QueryResult<User> = await pool.query(
      "SELECT id, email, first_name, last_name, role, is_active FROM usuarios WHERE email LIKE '%@latido.com'"
    );
    
    console.log(`\nVerification - Found ${result.rows.length} users:`);
    result.rows.forEach((user: User) => {
      console.log(`- ${user.email} (${user.role}) - ${user.is_active ? 'active' : 'inactive'}`);
    });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  } finally {
    await pool.end();
  }
}

insertTestUsers();
