import { isRequestInvalid } from '../services/validation';
import { Room } from '../models';

/**
 *
 *  @route /api/rooms
 *
 *  @method {GET}
 *
 *  @query {
 *
 *  }
 */
export const fetchRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    console.log('rooms = ', rooms);
    res.json({
      success: true,
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
  req.checkBody('gender', `provide a gender: 'male', 'female', or 'any'`).notEmpty().isGender();
  req.checkBody('minAge', 'provide a minimum age').notEmpty().isInt();
  req.checkBody('maxAge', 'provide a maximum age').notEmpty().isInt();
  if (await isRequestInvalid(req, res)) {
    return;
  }

  res.json({
    success: true,
  });
};
