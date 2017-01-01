import { Router } from 'express';

import { isAuthed } from '../services/middleware';
import {
  fetchUsersForRoom,
  fetchRoomsForUser,
  fetchAllRooms,
  fetchOrCreateRoom,
  removeRoom,
} from '../controllers/room.controller';

const roomRouter = Router();

roomRouter.use(isAuthed);

roomRouter.get('/:roomId/users', fetchUsersForRoom);
roomRouter.get('/user', fetchRoomsForUser);
roomRouter.get('/all', fetchAllRooms);
roomRouter.post('/find', fetchOrCreateRoom);
roomRouter.post('/remove/:roomId', removeRoom);

export default roomRouter;
