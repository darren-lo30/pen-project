import { RequestHandler } from 'express';
import validate from '../../middleware/validation';
import { z } from 'zod';
import prisma from '../../prisma';

const updatePreferences: RequestHandler[] = [
  validate(z.object({
    body: z.object({
      storeData: z.boolean({
        invalid_type_error: 'storeData must be a boolean',
      })
    })
  })),
  async (req, res) => {
    await prisma.preferences.update({
      where: {
        id: req.user!.preferencesId
      },
      data: {
        storeData: req.body.storeData,
      }
    });
    res.sendStatus(200);
  }
];

export { updatePreferences };