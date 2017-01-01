import { Room } from '../models';
import { connections } from './';
import { getClientsInRoom } from './helpers';

/**
 *
 *  All socket.io listener callbacks will have a 'socket' argument bound to them
 *  due to a lack of lexical access to the original socket instance.
 *
 *  listeners are set up like this:
 *  socket.on(listenerName, listener.bind(null, { io, socket }));
 */

/**
 *
 *  connectTo
 *
 *  @param {OBJECT} socket - socket.io client instance
 *  @param {OBJECT} options
 *    - roomId: the room the user wants to join
 */
export const connectTo = async ({ io, socket }, { roomId }) => {
  if (!roomId) {
    socket.emit('connectTo.response', {
      success: false,
      err    : 'please provide a roomId',
    });
  }
  try {
    const room = await Room.findById(roomId);
    if (room) {
      // join socket to server room
      socket.join(room.socketRoom);
      
      // store room instance in map for quick access later
      connections.get(socket).room = room;

      // find users in the room
      const clients = getClientsInRoom({
        io,
        roomName: room.socketRoom,
      });
      const users = clients.map(socketInstance => connections.get(socketInstance).user);

      // send client a success response with current list of users
      socket.emit('connectTo.response', {
        success: true,
        users  : users.map(userInstance => userInstance.getData),
      });
    }
    socket.emit('connectTo.response', {
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
export const leave = async ({ socket }) => {
  try {
    const { user, room } = connections.get(socket);

    if (!room) {
      return socket.emit('leave.response', {
        success: false,
        message: 'this client is currently not in a room',
      });
    }

    // notify socket & all user's in room
    socket.emit('leave.response', {
      success: true,
    });
    socket.broadcast.to(room.socketRoom).emit('user leave', {
      user: user.getData,
    });

    // update connections map
    delete connections.get(socket).room;

    // disconnect from socket room
    socket.leave(room.socketRoom);
  } catch (e) {
    socket.emit('err.response', {
      err: e.toString(),
    });
  }
};

/**
 *
 *  message
 *
 *  @param {OBJECT} socket - socket.io client instance
 *
 *  Incoming message handler, this listener should trigger an emit to
 *  all other clients in the room the socket belongs to
 */
export const newMessage = async ({ socket }, { message }) => {
  const { room, user } = connections.get(socket);
  // send success response to sender
  socket.emit('newMessage.response', {
    success: true,
    message,
    user: user.getData,
  });
  // send message to all clients in room
  socket.broadcast.to(room.socketRoom).emit('incomingMessage', {
    message,
    user: user.getData,
  });
};

/**
 *
 *  A disconnect handler
 */
export const disconnect = async (socket) => {
  const { user, room } = connections.get(socket);
  connections.delete(socket);
};
