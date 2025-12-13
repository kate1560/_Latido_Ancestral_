import { Pool, QueryResult } from 'pg';

interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'vendor' | 'customer';
  status?: string;
}

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'tienda_virtual',
  user: 'postgres',
  password: 'Qwe.123*',
});

async function testUsers(): Promise<void> {
  try {
    console.log('Checking test users...\n');
    
    const result: QueryResult<User> = await pool.query(
      "SELECT id, email, password_hash, first_name, last_name, role FROM usuarios WHERE email LIKE '%@latido.com'"
    );
    
    console.log(`Found ${result.rows.length} users:\n`);
    result.rows.forEach((user: User) => {
      console.log(`Email: ${user.email}`);
      console.log(`Password Hash: ${user.password_hash}`);
      console.log(`Name: ${user.first_name} ${user.last_name}`);
      console.log(`Role: ${user.role}`);
      console.log('---');
    });
    
    // Test login with admin credentials
    console.log('\nTesting admin login query...');
    const loginTest: QueryResult<User> = await pool.query(
      'SELECT id, email, first_name, last_name, role FROM usuarios WHERE email = $1 AND password_hash = $2',
      ['admin@latido.com', 'admin123']
    );
    
    console.log(`Login test result: ${loginTest.rows.length} rows`);
    if (loginTest.rows.length > 0) {
      console.log('✓ Login query works!');
      console.log(loginTest.rows[0]);
    } else {
      console.log('✗ Login query failed - no matching user');
    }
    
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

testUsers();
