/**
 *
 *  Request validators for express-validator
 *
 *  @url https://github.com/ctavan/express-validator
 */

const options = {
  isArray: (value) => (Array.isArray(value)),
};

export default options;
