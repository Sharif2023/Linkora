import 'dotenv/config';
import { prisma } from '@/lib/prisma';

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: npx tsx scripts/promote-admin.ts <email>');
    process.exit(1);
  }
  
  try {
    const user = await prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data: { role: 'ADMIN' },
      select: { id: true, email: true, role: true },
    });
    console.log('✔ Promoted to ADMIN:', user);
  } catch (e: any) {
    console.error('❌ ACTUAL ERROR:', e.message);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());