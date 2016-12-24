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
  const result = await req.getValidationResult();
  if (!result.isEmpty()) {
    res.status(400).json({
      err: result.mapped(),
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
  isArray: value => Array.isArray(value),
};
