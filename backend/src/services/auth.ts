import prisma from '../prisma';
import bcrypt from 'bcrypt';

const saltRounds = 10;

// Authenticate a user
export const authenticateUser = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });
  // User with email not found
  if(!user) return null;

  const userPasswordRes = await prisma.$queryRaw<{password: string }[]>`SELECT password FROM "User" WHERE email = ${email} LIMIT 1`;
  const userPassword = userPasswordRes[0].password;
  
  // Check that password is correct
  if(!await bcrypt.compare(password, userPassword)) return null;

  return user;
};

// Initialize a user when they register
export const initializeUser = async (params: {
  email: string,
  firstName: string,
  lastName: string,
  rawPassword: string,
}) => {
  const { email, firstName, lastName, rawPassword} = params;
  await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      // Hash their password with a salt
      password: bcrypt.hashSync(rawPassword, saltRounds),
      // Default preferences for a user
      preferences: {
        create: {
          storeData: false
        }
      }
    }
  });
};