import { User as _User } from '@prisma/client';
// Update types 
declare global {
  namespace Express {
    interface User extends _User {}
  }
}

declare module 'http' {
  interface IncomingMessage {
    user: Express.User?,
  }
}