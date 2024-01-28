import Canvas from './Canvas';
class Room {
  private id: string;
  private canvas: Canvas;
  
  constructor(id: string) {
    this.id = id;
    this.canvas = new Canvas();
  }

  getCanvas() {
    return this.canvas;
  }

  
}

export default Room;