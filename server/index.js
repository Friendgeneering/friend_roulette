import Express from 'express';

import setupApp from './setup';

const app = Express();
const port = 3001;

setupApp(app);

app.listen(port);
console.log(`app is listening on port ${port}`);
