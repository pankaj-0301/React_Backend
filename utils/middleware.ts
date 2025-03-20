import { NextApiRequest, NextApiResponse } from 'next';
import supabase from './supabase';

export async function verifySession(req: NextApiRequest): Promise<any> {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new Error('Unauthorized: No token provided');
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new Error('Unauthorized: Invalid token');
  }

  return user;
}
