import { Room } from '../models';
import { connections } from './';

/**
 *
 *  All socket.io listener callbacks will have a 'socket' argument bound to them
 *  due to a lack of lexical access to the original socket instance.
 *
 *  listeners are set up like this:
 *  socket.on(listenerName, listener.bind(null, socket));
 */

/**
 *
 *  connectTo
 *
 *  @param {OBJECT} socket - socket.io client instance
 *  @param {OBJECT} options
 *    - roomId: the room the user wants to join
 */
export const connectTo = async (socket, { roomId }) => {
  try {
    const user = connections.get(socket).user;
    const room = await Room.findById(roomId);
    if (room) {
      // join socket to server room
      socket.join(room.socketRoom);
      // store room instance in map for quick access later
      connections.get(socket).room = room;
      // create join table entry
      return room.addUser(user);
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

/**
 *
 *  leave
 *
 *  @param {OBJECT} socket - socket.io client instance
 */
export const leave = async (socket) => {
  try {
    const { user, room } = connections.get(socket);

    if (!room) {
      return socket.emit('leave.response', {
        success: false,
        message: 'this client is currently not in a room',
      });
    }

    // disconnect from socket room
    socket.leave(room.socketRoom);

    // update connections map
    delete connections.get(socket).room;

    // remove db associations asynchronously
    user.removeRoom(room);
    room.removeUser(user);

    // notify user
    socket.emit('leave.response', {
      success: true,
    });
  } catch (e) {
    socket.emit('err.response', {
      err: e.toString(),
    });
  }
};

/**
 *
 *  A disconnect handler
 */
export const disconnect = async (socket) => {
  connections.delete(socket);
};
