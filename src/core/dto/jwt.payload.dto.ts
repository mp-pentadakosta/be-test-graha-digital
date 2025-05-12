import { JwtPayload } from 'jsonwebtoken';
import { Role } from '@prisma/client';

export class JwtPayloadData implements JwtPayload {
  id: number;
  name: string;
  email: string;
  role: Role;
  phoneNumber: string;
}
