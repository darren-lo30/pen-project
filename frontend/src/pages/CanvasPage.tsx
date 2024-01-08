import Navbar from "../Navbar";
import Canvas from "../Canvas";

const CanvasPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <Canvas canvasProps={{
            width: '100vw', height:'100%', 
          }} renderingOptions={{
            lineCap: 'round',
            lineWidth: 2,
            strokeStyle: 'black'
          }}/>
      </div>
    </>
  );
}

export default CanvasPage;