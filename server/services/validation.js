import { Room } from '../models';

/**
 *
 *  roomExists @return Promise<Boolean>
 *
 *  Validation for checking if a requested roomId exists
 *
 *  @param {OBJECT} req - express request object
 *  @param {OBJECT} res - express resopnse object
 *  @param {INT}    roomId
 */
export const roomExists = async (req, res, roomId) => {
  const room = await Room.findById(roomId);
  if (!room) {
    res.status(400).json({
      success: false,
      err    : 'room does not exist',
    });
    return false;
  }
  return true;
};

/**
 *
 *  isRequestInvalid: @return Promise<Boolean>
 *
 *  Validation responder utility function
 *
 *  @param {OBJECT} req - express request object
 *  @param {OBJECT} res - express resopnse object
 */
export const isRequestInvalid = async (req, res) => {
  try {
    const result = await req.getValidationResult();
    if (!result.isEmpty()) {
      res.status(400).json({
        err: result.mapped(),
      });
      return true;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      err    : e.toString(),
    });
    return true;
  }
  return false;
};

/**
 *
 *  Custom request validators for express-validator
 *
 *  @url https://github.com/ctavan/express-validator
 */
export const customValidators = {
  isArray : value => Array.isArray(value),
  isGender: (value) => {
    return !!value && ['male', 'female', 'any'].reduce((accum, gender) => {
      return accum || gender === value.toLowerCase();
    }, false);
  },
};
