import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Find the user
  const user = await prisma.user.findUnique({ where: { email: 'movieadda003@gmail.com' } });

  if (!user) {
    throw new Error('User movieadda003@gmail.com not found. Please login via Google Auth first.');
  }

  console.log('Found user:', user.email);

  // Create only 3 transactions for movieadda003@gmail.com
  const transactions = [
    { amount: 2500, description: 'New Laptop' },
    { amount: 850, description: 'Weekend Getaway' },
    { amount: 1200, description: 'Electronics Shopping' }
  ];

  // Create all transactions
  for (const tx of transactions) {
    await prisma.transaction.create({
      data: {
        amount: tx.amount,
        description: tx.description,
        userId: user.id,
        // date field removed, will use default CURRENT_DATE from database
      },
    });
    console.log(`Created transaction: ${tx.description} - ₹${tx.amount}`);
  }

  console.log('🌱 Database seeded with 3 transactions for movieadda003@gmail.com successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
