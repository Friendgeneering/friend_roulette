import cors from 'cors';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import { each } from 'lodash';

import sequelize from './db';
import { customValidators } from './services/validation';
import routes from './routes';

/**
 *
 *  initialize
 *
 *  @param {OBJECT} options object containing:
 *    - express instance
 *    - server instance
 *    - socket.io server instance
 *
 *  Sets up the express instance with middleware functions
 */
const initialize = async ({ app }) => {
  try {
    // express standards
    app.use(bodyParser.json());
    app.use(expressValidator({
      customValidators
    }));

    // express routes
    each(routes, (controller, route) => {
      app.use(route, controller);
    });

    await sequelize.authenticate();
  } catch (err) {
    console.error(`App failed to start. error = ${err.toString()}`);
  }
};

export default initialize;
