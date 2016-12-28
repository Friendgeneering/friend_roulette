import { verify } from 'jsonwebtoken';
import { each } from 'lodash';

import { jwtSecret } from '../config';
import listeners from './listeners';

/**
 *
 *  This weak map holds all active socket client instances & their user data
 *
 *  @url {https://goo.gl/nKzWJB}
 */
export const connections = new WeakMap();

/**
 *
 *  initSockets
 *
 *  @param {OBJECT} io - socket io server instance
 *
 *  Sets up the socket server instance with middleware & namespacing
 */
export const initSockets = (io) => {
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
        // if authorized, store the socket instance & user data in map:
        connections.set(socket, decoded);
        return next();
      }
    } catch (e) {
      return next(new Error(`Invalid token. Err = ${e.toString()}`));
    }
  });

  io.on('connection', (socket) => {
    /**
     *
     *  Event listeners
     */
    each(listeners, (listener, listenerName) => {
      socket.on(listenerName, listener.bind(null, socket));
    });
  });
};
