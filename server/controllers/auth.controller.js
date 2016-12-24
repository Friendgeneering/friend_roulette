import { isRequestInvalid } from '../services/validation';
import { User } from '../models';

/**
 *
 *  @route /api/auth/signIn
 *
 *  @method {POST}
 *
 *  @body {
 *    username: STRING,
 *    password: STRING
 *  }
 */
export const signIn = async (req, res) => {
  req.checkBody('username', 'Please provide a username').notEmpty().isAlpha();
  req.checkBody('password', 'Please provide a password').notEmpty().isAlpha();
  if (await isRequestInvalid(req, res)) {
    return;
  }

  res.json({
    success: true,
  });
};

/**
 *
 *  @route /api/auth/signUp
 *
 *  @method {POST}
 *
 *  @body {
 *    username: STRING,
 *    password: STRING,
 *    email   : STRING,
 *    age     : INT,
 *    location: STRING,
 *    gender  : STRING,
 *  }
 */
export const signUp = async (req, res) => {
  req.checkBody('username', 'Please provide a username').notEmpty().isAlpha();
  req.checkBody('password', 'Please provide a password').notEmpty().isAlpha();
  req.checkBody('email', 'Please provide an email address').notEmpty().isEmail();
  req.checkBody('age', 'Please provide an age').notEmpty().isInt();
  req.checkBody('location', 'Please provide a location').notEmpty();
  req.checkBody('gender', 'Please provide a gender').notEmpty().isAlpha();
  if (await isRequestInvalid(req, res)) {
    return;
  }
  
  try {
    const { username, password, email, age, location, gender } = req.body;
    let user = await User.findOne({ where: { username } });
    if (user) {
      res.status(400).json({
        success: false,
        err    : 'username already exists',
      });
      return;
    }

    user = await User.create({
      username,
      password,
      email,
      age,
      location,
      gender,
    });

    res.json({
      success: true,
      token  : await user.getToken(),
    });
  } catch (e) {
    res.status(500).json({
      err: e.toString(),
    });
  }
};
