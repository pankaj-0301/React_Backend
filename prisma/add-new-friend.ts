import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Find the existing user and the new user
  const existingUser = await prisma.user.findUnique({ where: { email: 'movieadda003@gmail.com' } });
  const newUser = await prisma.user.findUnique({ where: { email: 'bt21cse151@iiitn.ac.in' } });

  if (!existingUser || !newUser) {
    throw new Error('One or both users not found. Please ensure both users exist in the database.');
  }

  console.log('Found users:', existingUser.id, newUser.id);

  // Create friendship between existing user and new user
  await prisma.friendship.create({
    data: {
      userId: existingUser.id,
      friendId: newUser.id,
    },
  });

  console.log('Friendship created successfully!');

  // Create a transaction for the existing user that will be split later
  await prisma.transaction.create({
    data: {
      amount: 75,
      description: 'Movie tickets',
      userId: existingUser.id,
      // Not splitting yet - will be done from frontend
    },
  });

  // Create a transaction for the new user
  await prisma.transaction.create({
    data: {
      amount: 120,
      description: 'Groceries',
      userId: newUser.id,
      // Not splitting yet - will be done from frontend
    },
  });

  console.log('Transactions created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
