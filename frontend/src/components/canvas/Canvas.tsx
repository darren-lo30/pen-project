import React, { RefObject, useEffect, useRef } from "react";
import { socket } from "../../socket";

const Canvas = (props: {
  className?: string,
  roomId: string,
  canvasProps: React.CanvasHTMLAttributes<HTMLCanvasElement>,
  renderingOptions: {
    lineWidth: number,
    lineCap: CanvasLineCap,
    strokeStyle: string,
  },
  imageData?: ImageData,
}) => {
  const canvasRef : RefObject<HTMLCanvasElement> = useRef(null);

  const getCanvasContext = () => {  
    const canvas = canvasRef.current;
    if(!canvas) throw Error("Error initializing canvas");
    const context = canvas.getContext('2d');
    if(!context) throw Error("Error initializing canvas context");

    return {canvas, context};
  }

  useEffect(() => {
    if(props.imageData) {
      const { context } = getCanvasContext();
      context.putImageData(props.imageData, 0, 0);
    }
  }, [props.imageData]);

  useEffect(() => {
    let mousePosition = { x: 0, y: 0 };

    const {canvas, context} = getCanvasContext();
    
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight
    const canvasPosition = canvas.getBoundingClientRect();


    const getNewMousePosition = (e: MouseEvent) => {
      return {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y
      };
    }

    let isStrokeStart = false;
    const onMouseDown = (e: MouseEvent) => {
      setPosition(e);
      isStrokeStart = true;
    }

    const setPosition = (e: MouseEvent) => {
      mousePosition = getNewMousePosition(e);
    }

    const draw = (e: MouseEvent) => {
      if (e.buttons !== 1) return;
      socket.emit('draw', {
        roomId: props.roomId,
        prevPosition: mousePosition,
        currPosition: getNewMousePosition(e),
        isStrokeStart,
      });

      if(isStrokeStart) {
        isStrokeStart = false;
      }
    
      context.beginPath();
    
      context.lineWidth = props.renderingOptions.lineWidth;
      context.lineCap = props.renderingOptions.lineCap;
      context.strokeStyle = 'black';
    
      context.moveTo(mousePosition.x, mousePosition.y); 
      setPosition(e);
      context.lineTo(mousePosition.x, mousePosition.y); 
    
      context.stroke(); 
    }

    // Add event listeners
    document.addEventListener('mousemove', draw);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseenter', setPosition);

    return () => {
      // Remove event listeners
      document.removeEventListener('mousemove', draw);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseenter', setPosition);
    }
  }, [props.renderingOptions.lineCap, props.renderingOptions.lineWidth, props.roomId]);

  useEffect(() => {
    const {context} = getCanvasContext();

    socket.on('canvas-update', (payload) => {
      context.beginPath();
      context.lineWidth = props.renderingOptions.lineWidth;
      context.lineCap = props.renderingOptions.lineCap;
      context.strokeStyle = 'black';
    
      context.moveTo(payload.prevPosition.x, payload.prevPosition.y); 
      context.lineTo(payload.currPosition.x, payload.currPosition.y); 
    
      context.stroke(); 
    });
  }, [props.renderingOptions.lineCap, props.renderingOptions.lineWidth]);

  return (
    <canvas id="canvas" {...props.canvasProps} ref={canvasRef} className={props.className} />
  )
}

export default Canvas;