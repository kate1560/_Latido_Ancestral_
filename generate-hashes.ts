import bcryptjs from 'bcryptjs';

interface PasswordEntry {
  [key: string]: string;
}

/**
 * Genera hashes bcrypt para las credenciales de prueba
 * Uso: npx ts-node generate-hashes.ts
 */
async function generateHashes(): Promise<void> {
  const passwords: PasswordEntry = {
    'admin@latido.com/admin123': 'admin123',
    'manager@latido.com/manager123': 'manager123',
    'user@latido.com/user123': 'user123'
  };

  console.log('🔐 Generando hashes bcrypt para credenciales de prueba...\n');
  console.log('====================================================\n');

  for (const [credential, password] of Object.entries(passwords)) {
    const hash = await bcryptjs.hash(password, 10);
    console.log(`📧 ${credential}`);
    console.log(`🔒 Hash: "${hash}"`);
    console.log('');
  }

  console.log('====================================================');
  console.log('✅ Hashes generados exitosamente');
  console.log('\n📝 Usa estos hashes en la BD para las credenciales de prueba');
}

generateHashes().catch((error: Error) => {
  console.error('❌ Error generando hashes:', error.message);
  process.exit(1);
});
