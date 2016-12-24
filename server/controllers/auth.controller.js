import { inspect } from 'util';

/**
 *
 *  @route /api/auth/signIn
 *
 *  @method {POST}
 */
const signIn = async (req, res) => {
  console.log('req = ', req.body);
  req.checkBody('username', 'Invalid username').notEmpty().isAlpha();
  
  const result = await req.getValidationResult();
  if (!result.isEmpty()) {
    res.status(400).json({
      err: inspect(result.array()),
    });
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
 */
const signUp = async () => {

};

export {
  signIn,
  signUp,
};
