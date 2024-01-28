import { Server } from 'socket.io';
import app from './app';
import http from 'http';
import drawListener from './listeners/drawListener';
import roomListeners from './listeners/roomListeners';

// Star the server on an environment defined port or default to 3000
const port = process.env.port || 3000;
const server = new http.Server(app);
const io = new Server(server, {
  cors: {
    origin: process.env.APP_URL
  }
});

server.listen(port, async() => {
  console.log(`Listening on port ${port}.`);
});

io.on('connection', (socket) => {
  drawListener(io, socket);
  roomListeners(io, socket);
});


export default server;
