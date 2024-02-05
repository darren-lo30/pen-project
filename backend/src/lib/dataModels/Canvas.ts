import { Canvas as CanvasImpl } from 'canvas';
import Point from './Points';
class Canvas {
  private canvasImpl: CanvasImpl;

  constructor() {
    this.canvasImpl = new CanvasImpl(3000, 3000);
  }

  draw(start: Point, end: Point) {
    const context = this.getContext();
    context.beginPath();

    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = 'black';

    context.moveTo(start.x, start.y); 
    context.lineTo(end.x, end.y); 

    context.stroke();
    this.getData();
  }

  getData() {
    const x = this.getContext().getImageData(0, 0, 3000, 3000);
    return x;
  }

  private getContext() {
    return this.canvasImpl.getContext('2d');
  }
}

export default Canvas;
