import { Server } from 'http';
import Express from 'express';
import Io from 'socket.io';

import setupApp from './setup';
import sequelize from './db';

const app = Express();
const server = Server(app);
const io = Io(server);

const PORT = process.env.PORT || 3001;

setupApp(app);

(async () => {
  try {
    await sequelize.authenticate();
    server.listen(PORT);
    console.log(`app listening on port ${PORT}`);
  } catch (err) {
    console.error(`App failed to start. error = ${err.toString()}`);
  }
})();
