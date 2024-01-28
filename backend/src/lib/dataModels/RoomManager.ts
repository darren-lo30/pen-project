import Room from './Room';

class RoomManager {
  private roomMap: Map<string, Room>;

  constructor() {
    this.roomMap = new Map();
  }
  
  getRoom(roomId: string) {    
    const room = this.roomMap.get(roomId);
    if(!room) throw Error('Room not found');
    return room;
  }

  getOrCreateRoom(roomId: string) {
    if(this.hasRoom(roomId)) return this.getRoom(roomId);
    return this.createRoom(roomId);
  }

  hasRoom(roomId: string) {
    return this.roomMap.has(roomId);
  }

  createRoom(roomId: string) {
    const room = new Room(roomId);
    this.roomMap.set(roomId, room);
    return room;
  }
}

const roomManager = new RoomManager();
export { roomManager };

