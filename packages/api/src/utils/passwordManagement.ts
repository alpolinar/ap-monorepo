import { hash, compare } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const result = await hash(password, 10);
  return result;
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const result = await compare(password, hash);
  return result;
}
