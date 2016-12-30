import { isRequestInvalid } from '../services/validation';
import { Room } from '../models';

/**
 *
 *  @route /api/rooms/:roomId:/users
 *
 *  @method {GET}
 *
 *  @params {
 *    roomId : STRING representing `id` primary key in room row
 *  }
 */
export const fetchUsersForRoom = async (req, res) => {
  const { roomId } = req.params;
  if (!roomId) {
    return res.status(400).json({
      success: false,
      err    : 'please provide a roomId in the URL: /api/rooms/:roomId/users',
    });
  }
  try {
    const room = await Room.findById(roomId);
    const users = await room.getUsers();
    if (!room) {
      return res.status(400).json({
        success: false,
        err    : 'room does not exist',
      });
    }
    return res.json({
      success: true,
      users  : users.map(user => user.getData),
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      err    : e.toString(),
    });
  }
};

/**
 *
 *  @route /api/rooms/user
 *  TOKEN required
 *
 *  @method {GET}
 */
export const fetchRoomsForUser = async (req, res) => {
  try {
    const { user } = req;
    const rooms = await user.getRooms();
    res.json({
      success: true,
      rooms  : rooms.map(room => room.toJSON()),
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      err    : e.toString(),
    });
  }
};

/**
 *
 *  @route /api/rooms/all
 *  TOKEN required
 *
 *  @method {GET}
 */
export const fetchAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json({
      success: true,
      rooms  : rooms.map(room => room.toJSON()),
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      err    : e.toString(),
    });
  }
};

/**
 *
 *  @route /api/rooms/find
 *  TOKEN required
 *
 *  @method {POST}
 *
 *  @body {
 *    location: STRING
 *    gender  : STRING ('male', 'female', 'any')
 *    minAge  : INT
 *    maxAge  : INT
 *  }
 */
export const fetchOrCreateRoom = async (req, res) => {
  req.checkBody('location', 'provide a location').notEmpty().isAscii();
  req.checkBody('gender', 'provide a gender: \'male\', \'female\', or \'any\'').notEmpty().isGender();
  req.checkBody('minAge', 'provide a minimum age').notEmpty().isInt();
  req.checkBody('maxAge', 'provide a maximum age').notEmpty().isInt();
  if (await isRequestInvalid(req, res)) {
    return;
  }

  try {
    const { user } = req;
    const { location, gender, minAge, maxAge } = req.body;
    const rooms = await Room.findAll({
      where: { location, gender, minAge, maxAge },
    });
    if (rooms && rooms.length) {
      // pick a random room
      const room = rooms[Math.floor(Math.random * rooms.length)];
      // create association
      await room.addUser(user);
      return res.json({
        newRoom: false,
        success: true,
        room   : room.toJSON(),
      });
    }
    const room = await Room.create({ location, gender, minAge, maxAge });
    // create association
    await room.addUser(user);
    return res.json({
      newRoom: true,
      success: true,
      room   : room.toJSON(),
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      err    : e.toString(),
    });
  }
};
