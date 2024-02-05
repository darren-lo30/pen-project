import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { isRoomId } from './roomHelpers';
import { roomManager  } from '../lib/dataModels/RoomManager';
import Point from '../lib/dataModels/Points';

interface DrawPayload {
  isStrokeStart: boolean,
  prevPosition: Point,
  currPosition: Point 
}

const drawListener = (_ : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>, socket: Socket) => {
  socket.on('draw', (payload: DrawPayload) => {
    const user = socket.request.user;
    const rooms = new Array(...socket.rooms).filter(room => isRoomId(room));

    if(rooms.length != 1) {
      console.log('ERROR: A user should only be in a single room');
      return;
    }

    // Destructuring assignment, get first element of set
    const [roomId] = rooms;

    socket.to(roomId).emit('canvas-update', payload);    

    // Keep a local copy
    const room = roomManager.getOrCreateRoom(roomId);
    const canvas = room.getCanvas();
    canvas.draw(payload.prevPosition, payload.currPosition);

    // Update cache db
    if(user) {
      const strokeCache = room.getStrokeCache();
      if(payload.isStrokeStart) {
        strokeCache.startStroke(user);
      }
      strokeCache.addPoint(user, payload.currPosition);
    }
  });
};

export default drawListener;