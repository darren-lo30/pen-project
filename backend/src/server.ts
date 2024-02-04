import { Server } from 'socket.io';
import app, { sessionMiddleware } from './app';
import http from 'http';
import drawListener from './listeners/drawListener';
import roomListeners from './listeners/roomListeners';
import passport from 'passport';
import { RequestHandler, Request, Response, NextFunction } from 'express';


// Star the server on an environment defined port or default to 3000
const port = process.env.port || 3000;
const server = new http.Server(app);
const io = new Server(server, {
  cors: {
    origin: process.env.APP_URL,
    credentials: true,
  }
});

const onlyForHandshake = (middleware: RequestHandler) => {
  return (req: Request & { _query: Record<string, string> }, res: Response, next: NextFunction) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
      middleware(req, res, next);
    } else {
      next();
    }
  };
};

io.engine.use(onlyForHandshake(sessionMiddleware));
io.engine.use(onlyForHandshake(passport.session()));

server.listen(port, async() => {
  console.log(`Listening on port ${port}.`);
});

io.on('connection', (socket) => {
  drawListener(io, socket);
  roomListeners(io, socket);
});


export default server;
