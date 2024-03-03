// A utility file to convert data into an InkML format

import { StrokeData } from '@prisma/client';
import { create } from 'xmlbuilder2';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import Points from '../dataModels/Points';
import { Archiver } from 'archiver';

// Generate an InkML zip file from stroke data
const generateInkMLZip = (zipArchiver: Archiver, strokeData: StrokeData[]) => {
  const sortedStrokeData = new Map<string, StrokeData[]>();
  strokeData.forEach(sd => {
    if(!sortedStrokeData.has(sd.canvasId)) {
      sortedStrokeData.set(sd.canvasId, [sd]);
    } else {
      sortedStrokeData.get(sd.canvasId)?.push(sd);
    }
  });

  // Generate zip file from buffers
  sortedStrokeData.forEach((strokeData, canvasId) => {
    const root = createInkMLDoc(strokeData);
    const buffer = Buffer.from(root.end({ prettyPrint: true }));

    zipArchiver.append(buffer, {
      name: canvasId
    });
  });

  zipArchiver.finalize();
  return zipArchiver;
};

// From a stroke path, generate an InkML formatted document
const createInkMLDoc = (strokeData: StrokeData[]) => {
  let root = create().ele('ink', { 'xmlns': 'http://www.w3.org/2003/InkML'});
  root = strokeData.reduce((updatedRoot, strokeData) => {
    return createTrace(updatedRoot, strokeData.strokePath.points);
  }, root);
  
  return root.up();
};

// From a list of points, generate a trace element in InkML
const createTrace = (root: XMLBuilder, points: Points[]) => {
  const generatePointsTxt = () => {
    return points.map(point => `${point.x} ${point.y}`).join(', ');
  };
  

  return root.ele('trace').txt(generatePointsTxt()).up();
};

export { createInkMLDoc, generateInkMLZip };