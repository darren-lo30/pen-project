import { RequestHandler } from 'express';
import prisma from '../../prisma';
import { z } from "zod";
import validate from '../../middleware/validation';
import { initializeUser } from '../../services/auth';

const signUp: RequestHandler[] = [
  validate(z.object({
    body: z.object({
      email: z.string({
        required_error: "Email is required"
      }),
      password: z.string({
        required_error: "Password is required."
      })
    })
  })),
  async (req, res) => {
    const duplicateUser = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    });

    if(duplicateUser) {
      return res.status(422).json({
        message: 'A user with that email already exists.'
      });
    }

    initializeUser({
      email: req.body.email,
      firstName: "test",
      lastName: "test",
      rawPassword: req.body.password,
    });

    res.sendStatus(200);
  }
]

export { signUp }