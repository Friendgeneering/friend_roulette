import Express from 'express';

import setupApp from './setup';
import sequelize from './db';

const app = Express();
const port = 3001;

setupApp(app);

(async () => {
  try {
    await sequelize.authenticate();
    app.listen(port);
    console.log(`app listening on port ${port}`);
  } catch (err) {
    console.error(`App failed to start. error = ${err.toString()}`);
  }
})();
