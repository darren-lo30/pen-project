import { RequestHandler } from 'express';
import prisma from '../../prisma';
import { generateInkMLZip } from '../../lib/inkMl/inkMlWriter';
import archiver from 'archiver';

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
  
  res.set('Content-disposition', 'attachment; filename=download.zip');
  res.set('Content-Type', 'application/zip');

  const zipArchiver = archiver('zip');
  zipArchiver.pipe(res);
  zipArchiver.on('finish', () => { res.end(); });
  generateInkMLZip(zipArchiver, userStrokeData);
};

export { getUserStrokeData };