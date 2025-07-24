// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);
  await prisma.user.upsert({
    where: { email: 'vinay@livelearn.com' },
    update: {},
    create: {
      name: 'Margam Vinay',
      email: 'vinay@livelearn.com',
      password,
      role: Role.ADMIN,
    },
  });
  console.log('Admin user created!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());