// import { verify } from 'jsonwebtoken';

// import { jwtSecret } from '../config';
import { Room } from '../models';

/**
 *
 *  All socket.io listener callbacks will have a 'socket' argument bound to them
 *  due to a lack of lexical access to the original socket instance.
 *
 *  e.g.
 *  socket.on(listenerName, listener.bind(null, socket));
 */

/**
 *
 *  connectTo
 *
 *  @param {OBJECT} socket - socket.io client instance object
 *  @param {OBJECT} options
 *    - roomId: the room the user wants to join
 */
const connectTo = async (socket, { roomId }) => {
  try {
    // const userId = (await verify(token, jwtSecret)).id;
    const room = await Room.findById(roomId);
    if (room) {
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
};

export default {
  connectTo,
};
