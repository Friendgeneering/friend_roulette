import { Router } from 'express';

import {
  fetchRooms,
  fetchOrCreateRoom,
} from '../controllers/room.controller';

const roomRouter = Router();

roomRouter.get('/', fetchRooms);
roomRouter.post('/find', fetchOrCreateRoom);

export default roomRouter;
