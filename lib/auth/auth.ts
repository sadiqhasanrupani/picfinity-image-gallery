import { compare } from "bcrypt";

export async function verifyPassword(password: string, hashedPassword: string) {
  const passIsValid = await compare(password, hashedPassword);

  return passIsValid;
}
