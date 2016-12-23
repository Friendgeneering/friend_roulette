import morgan from 'morgan';
import cors from 'cors';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';

import customValidators from './services/requestValidators';

/**
 *
 *  setupApp
 *
 *  @param app {express instance}
 *
 *  Sets up the express instance with middleware functions
 */
const setupApp = (app) => {
  // debugging
  app.use(morgan('combined'));

  // standards
  app.use(bodyParser.json());
  app.use(expressValidator({
    customValidators
  }));
};

export default setupApp;
