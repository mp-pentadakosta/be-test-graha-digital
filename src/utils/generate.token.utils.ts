import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from '@prisma/client';

dotenv.config();

const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || '';

export const generateTokenUtils = (data: User): { token: string } => ({
  token: sign(
    {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      phoneNumber: data.phoneNumber,
    },
    JWT_PUBLIC_KEY,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  ),
});
