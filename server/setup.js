import morgan from 'morgan';

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
};

export default setupApp;
