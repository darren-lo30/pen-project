import Canvas from "../components/canvas/Canvas";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import CanvasToolbar from "../components/canvas/CanvasToolbar";

const CanvasPage = () => {  
  const { roomId } = useParams<{roomId: string}>();
  const [imageData, setImageData] = useState<ImageData>();
  useEffect(() => {
    socket.emit('join-room', {
      roomId,
    });

    socket.on('on-join-room', (imageData) => {
      const imgData: ImageData = new ImageData(
        new Uint8ClampedArray(imageData.data),
        3000,
        3000,
      )
      setImageData(imgData);
    });
  }, [roomId]);
  
  return (
    <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"} flexDirection={'column'}>
      <CanvasToolbar />
      <div>
        <Canvas 
          roomId={roomId!}
          canvasProps={{
            width: '100%', height:'100%', 
          }} 
          renderingOptions={{
            lineCap: 'round',
            lineWidth: 2,
            strokeStyle: 'black'
          }}
          imageData={imageData}
          />
      </div>
    </Flex>
  );
}

export default CanvasPage;