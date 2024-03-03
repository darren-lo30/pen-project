import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  result: {
    user: {
      password: {
        needs: {},
        compute() {
          return undefined;
        },
      },
    },
  },
});


export default prisma;