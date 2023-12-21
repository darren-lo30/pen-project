import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { authenticateUser } from '../services/auth';
import { User } from '@prisma/client';
import prisma from '../prisma';

// Update Express User type
type _User = User;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends _User {}
  }
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  const authenticatedUser = await authenticateUser(email, password);
  if(!authenticatedUser) return done(null, false);

  return done(null, authenticatedUser); 
}));

passport.serializeUser((userObject, done) => {
  // Serialize with user id
  done(null, userObject.id);
});

passport.deserializeUser(async (userId: string, done) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }
  });
  done(null, user);
});

export default passport;