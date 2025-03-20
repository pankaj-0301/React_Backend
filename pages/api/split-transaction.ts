import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifySession } from '../../utils/middleware';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await verifySession(req); // Authenticate user

    const { transactionId, friendIds } = req.body;

    if (!transactionId || !friendIds || !Array.isArray(friendIds)) {
      return res.status(400).json({ error: 'transactionId and friendIds array required' });
    }

    // Update the transaction to split with the provided friends
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        splitWith: {
          connect: friendIds.map((id) => ({ id })),
        },
      },
    });

    res.status(200).json({ message: 'Transaction split successfully!' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
