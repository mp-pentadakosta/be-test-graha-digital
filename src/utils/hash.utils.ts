import { createHash } from 'crypto';
import * as bcrypt from 'bcrypt';
import { CustomHttpException } from '../core/custom.http.exception';

export const hashString = (input: string): string => {
  const hash = createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 8);
  } catch (e: any) {
    throw new CustomHttpException({
      code: '99',
      message: e,
      status: 500,
      description: e.message,
    });
  }
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (e) {
    throw new CustomHttpException({
      code: '99',
      message: e,
      status: 500,
      description: e.message,
    });
  }
};
