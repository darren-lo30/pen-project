import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { roomManager  } from '../lib/dataModels/RoomManager';
import Point from '../lib/dataModels/Points';
import prisma from '../prisma';

interface DrawPayload {
  roomId: string,
  isStrokeStart: boolean,
  prevPosition: Point,
  currPosition: Point 
}

const drawListener = (_ : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>, socket: Socket) => {
  socket.on('draw', async (payload: DrawPayload) => {
    const user = socket.request.user;

    // Destructuring assignment, get first element of set
    const {roomId} = payload;
    socket.to(roomId).emit('canvas-update', payload);    

    // Keep a local copy
    const room = roomManager.getOrCreateRoom(roomId);
    const canvas = room.getCanvas();
    canvas.draw(payload.prevPosition, payload.currPosition);

    // Update cache db
    if(user) {
      const userPreferences = await prisma.preferences.findFirst({
        where: {
          user,
        }
      });

      // Only store data if permission given
      if(userPreferences?.storeData) {
        const strokeCache = room.getStrokeCache();
        if(payload.isStrokeStart) {
          strokeCache.startStroke(user);
        }
        strokeCache.addPoint(user, payload.currPosition);
      }
    }
  });
};

export default drawListener;