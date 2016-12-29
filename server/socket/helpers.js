import { map } from 'lodash';

/**
 *
 *  getClientsInRoom
 *
 *  @param {OBJECT} options
 *    - io: socket io server instance
 *    - roomId: room ID in database
 *
 *  @return {ARRAY<OBJ>} - array of socket.io client instances
 */
export const getClientsInRoom = ({ io, roomName }) => {
  // clients is an object with { clientId: true } pairings
  const clients = io.sockets.adapter.rooms[roomName].sockets;
  return map(clients, (_, clientId) => io.sockets.connected[clientId]);
};
