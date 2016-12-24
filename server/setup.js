import cors from 'cors';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import { each } from 'lodash';

import customValidators from './services/requestValidators';
import routes from './routes';

/**
 *
 *  setupApp
 *
 *  @param app {express instance}
 *
 *  Sets up the express instance with middleware functions
 */
const setupApp = (app) => {
  // standards
  app.use(bodyParser.json());
  app.use(expressValidator({
    customValidators
  }));

  // routes
  each(routes, (controller, route) => {
    app.use(route, controller);
  });
};

export default setupApp;
