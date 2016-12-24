/**
 *
 *  isRequestInvalid: @return Promise<Boolean>
 *
 *  Validation responder utility function
 *
 *  @param {req} express request object
 *  @param {res} express resopnse object
 */
const isRequestInvalid = async (req, res) => {
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
const options = {
  isArray: value => Array.isArray(value),
};

export {
  isRequestInvalid,
  options,
};
