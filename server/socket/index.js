import { verify } from 'jsonwebtoken';

import { jwtSecret } from '../config';

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
        return next();
      }
    } catch (e) {
      return next(new Error(`Invalid token. Err = ${e.toString()}`));
    }
  });

  io.on('connection', (socket) => {
    socket.on('connectTo', ({ roomId }) => {
      console.log('roomId = ', roomId);
    });
  });
};

export default initSockets;
