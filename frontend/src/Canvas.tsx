import React, { RefObject, useEffect, useRef } from "react";

const Canvas = (props: {
  className?: 'string',
  canvasProps: React.CanvasHTMLAttributes<HTMLCanvasElement>,
  renderingOptions: {
    lineWidth: number,
    lineCap: CanvasLineCap,
    strokeStyle: string,
  },
}) => {
  const canvasRef : RefObject<HTMLCanvasElement> = useRef(null);

  useEffect(() => {
    const mousePosition = { x: 0, y: 0 };

    const canvas = canvasRef.current;
    if(!canvas) throw Error("Error initializing canvas");
    const context = canvas.getContext('2d');
    if(!context) throw Error("Error initializing canvas context");

    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight
    const canvasPosition = canvas.getBoundingClientRect();

    // Set up listeners
    const setPosition = (e: MouseEvent) => {
      mousePosition.x = e.clientX - canvasPosition.x;
      mousePosition.y = e.clientY - canvasPosition.y;
    }

    const draw = (e: MouseEvent) => {
      if (e.buttons !== 1) return;
    
      context.beginPath();
    
      context.lineWidth = props.renderingOptions.lineWidth;
      context.lineCap = props.renderingOptions.lineCap;
      context.strokeStyle = 'black';
    
      context.moveTo(mousePosition.x, mousePosition.y); 
      setPosition(e);
      context.lineTo(mousePosition.x, mousePosition.y); 
    
      context.stroke(); 
    }

    document.addEventListener('mousemove', draw);
    document.addEventListener('mousedown', setPosition);
    document.addEventListener('mouseenter', setPosition);
  }, [props.renderingOptions.lineCap, props.renderingOptions.lineWidth]);

  return (
    <canvas id="canvas" {...props.canvasProps} ref={canvasRef} className={props.className} />
  )
}

export default Canvas;