import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifySession } from '../../utils/middleware';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await verifySession(req); // Authenticate user

    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id }, // Use authenticated user's ID
      include: { splitWith: true },
    });

    // Debug: Log the raw transaction data
    console.log('Raw transaction data:', JSON.stringify(transactions[0], null, 2));

    // Check if date property exists and format it properly
    const formattedTransactions = transactions.map(transaction => {
      // Create a new object with all existing properties
      const formattedTransaction = { ...transaction };
      
      // Debug each transaction's date
      console.log(`Transaction ID: ${transaction.id}, Date: ${transaction.date}`);
      
      // Only try to format the date if it exists
      if (transaction.date) {
        try {
          formattedTransaction.date = new Date(transaction.date).toISOString().split('T')[0];
          console.log(`Formatted date: ${formattedTransaction.date}`);
        } catch (e) {
          console.error(`Error formatting date for transaction ${transaction.id}:`, e);
          formattedTransaction.date = null;
        }
      } else {
        // If date doesn't exist, add it with a default value
        console.log(`No date for transaction ${transaction.id}, using current date`);
        formattedTransaction.date = new Date().toISOString().split('T')[0];
      }
      
      return formattedTransaction;
    });

    console.log('Sending formatted transactions to frontend');
    res.status(200).json(formattedTransactions);
  } catch (error) {
    console.error('API error:', error);
    res.status(401).json({ error: error.message });
  }
}
