// import { User } from '@prisma/client';

import { User } from '@prisma/client';
import Point from './Points';
import prisma from '../../prisma';

interface StrokeData {
  points: Point[]    
}

// In ms
const dbUpdateInterval = 5 * 1000;

// Cache user stroke data in memory to avoid updating the db frequently
class UserStrokeCache {
  userStrokeData: Map<string, StrokeData[]>;
  canvasId: string;

  constructor(canvasId: string) {
    this.canvasId = canvasId;
    this.userStrokeData = new Map();
    setInterval(async () => {
      // A list of async functions 
      const saveData = [...this.userStrokeData.entries()].map(async ([userId, strokeData]) => {
        // Always leave 
        const savedStrokeData = strokeData.length <= 1 ? [] : strokeData.slice(0, -1);
        const remainingStrokeData = strokeData.length <= 1 ? strokeData : strokeData.slice(-1);
        console.log(`Saving ${savedStrokeData.length} strokes for canvas ${canvasId} for user ${userId}`);
        const save = await prisma.strokeData.createMany({
          data: savedStrokeData.map(data => ({
            canvasId: canvasId,
            strokePath: { points: JSON.parse(JSON.stringify(data.points)) },
            userId: userId,
          })),
        });
        
        // Remove all saved strokes
        this.userStrokeData.set(userId, remainingStrokeData);
        return save;
      });

      await Promise.all(saveData);
    }, dbUpdateInterval);
  }

  

  startStroke(user: User) {
    const strokeData = this.getUserStrokeData(user);
    strokeData.push({ points: [] });
  }
  
  getUserStrokeData(user: User) {
    const data = this.userStrokeData.get(user.id);
    if(!data) {
      this.userStrokeData.set(user.id, []);
    }

    return this.userStrokeData.get(user.id)!;
  }


  addPoint(user: User, point: Point) {
    const userStrokeData = this.getUserStrokeData(user);
    if(userStrokeData.length === 0) {
      this.startStroke(user);
    }

    userStrokeData[userStrokeData.length - 1].points.push(point);
  }
  
}

export default UserStrokeCache;