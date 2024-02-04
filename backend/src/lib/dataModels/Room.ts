import Canvas from './Canvas';
import UserStrokeCache from './UserStrokeCache';
class Room {
  private id: string;
  private canvas: Canvas;
  private strokeCache: UserStrokeCache;

  constructor(id: string) {
    this.id = id;
    this.canvas = new Canvas();
    // For now we'll have a 1 to 1 mapping for canvas and room ids
    this.strokeCache = new UserStrokeCache(this.id);
  }

  getCanvas() {
    return this.canvas;
  }

  getStrokeCache() { return this.strokeCache; }

  
}

export default Room;