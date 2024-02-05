import { RequestHandler } from 'express';
import prisma from '../../prisma';
import stream from 'stream';

// TODO: Generates a zip file with the user's stroke data
// The zip file will have files corresponding to room ids with the user's stroke data in InkML format

// Currently just returns raw json 
const getUserStrokeData: RequestHandler = async (req, res) => {
  const user = req.user;
  if(!user) throw Error('User not found');
  const userStrokeData = await prisma.strokeData.findMany({
    where: {
      userId: user.id,
    }
  });

  const fileBuffer = Buffer.from(JSON.stringify(userStrokeData));

  res.set('Content-disposition', 'attachment; filename=download.txt');
  res.set('Content-Type', 'text/plain');

  res.end(fileBuffer);
};

export { getUserStrokeData };