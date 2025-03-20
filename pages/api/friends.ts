import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifySession } from '../../utils/middleware';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  try {
    const user = await verifySession(req); // Authenticate user
    const { userId } = req.query;
  
    console.log("Authenticated user:", user.id);
    console.log("Requested userId:", userId);

    if (!userId || user.id !== userId) {
      return res.status(403).json({ error: 'Forbidden: Invalid user' });
    }

    const friendships = await prisma.friendship.findMany({
      where: { userId: String(userId) },
      include: { friend: true },
    });
   
    console.log("Found friendships:", JSON.stringify(friendships));

    const friends = friendships.map((f) => f.friend);
    console.log("Returning friends:", JSON.stringify(friends));

    res.status(200).json(friends);
  } catch (error) {
    console.error("Error in friends API:", error);

    res.status(401).json({ error: error.message });
  }
}
