import { verify } from 'jsonwebtoken';

import { jwtSecret } from '../config';
import { Room } from '../models';

/**
 *
 *  initSockets
 *
 *  @param {OBJECT} io - socket io server instance
 *
 *  Sets up the socket server instance with middleware & namespacing
 */
const initSockets = (io) => {
  console.log('initializing socket server');
  /**
   *
   *  Authentication middleware
   *
   *  client-side setup:
   *  @url https://goo.gl/7jMef1
   */
  io.use(async (socket, next) => {
    try {
      const { token } = socket.handshake.query;
      const decoded = await verify(token, jwtSecret);
      if (decoded) {
        console.log('decoded = ', decoded);
        return next();
      }
    } catch (e) {
      return next(new Error(`Invalid token. Err = ${e.toString()}`));
    }
  });

  io.on('connection', (socket) => {
    socket.on('connectTo', async ({ roomId }) => {
      try {
        console.log('roomId = ', roomId);
        // const userId = (await verify(token, jwtSecret)).id;
        const room = await Room.findById(roomId);
        if (room) {
          console.log('socket joining room.socketRoom = ', room.socketRoom);
          socket.join(room.socketRoom);
          return;
        }
        socket.emit('err', {
          err: `room with roomId ${roomId} not found`,
        });
      } catch (e) {
        socket.emit('err', {
          err: e.toString(),
        });
      }
    });
  });
};

export default initSockets;
