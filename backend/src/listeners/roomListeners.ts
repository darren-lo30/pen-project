import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { roomManager } from '../lib/dataModels/RoomManager';

interface JoinRoomPayload {
  roomId: string
}


const roomListeners = (io : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>, socket: Socket) => {
  socket.on('join-room', (payload: JoinRoomPayload) => {
    console.log(`Someone joined room: ${payload.roomId}`);
    socket.join(payload.roomId);
    const room = roomManager.getOrCreateRoom(payload.roomId);
    const canvas = room.getCanvas();
    
    io.to(socket.id).emit('on-join-room', canvas.getData());
  });
};

export default roomListeners;