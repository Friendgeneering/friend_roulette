import authRouter from './auth.router';
import roomRouter from './room.router';

const routingMap = {
  '/api/auth' : authRouter,
  '/api/rooms': roomRouter,
};

export default routingMap;
