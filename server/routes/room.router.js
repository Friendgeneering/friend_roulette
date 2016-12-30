import { Router } from 'express';

import { isAuthed } from '../services/middleware';
import {
  fetchUsersForRoom,
  fetchRoomsForUser,
  fetchAllRooms,
  fetchOrCreateRoom,
} from '../controllers/room.controller';

const roomRouter = Router();

roomRouter.get('/:roomId/users', isAuthed, fetchUsersForRoom);
roomRouter.get('/user', isAuthed, fetchRoomsForUser);
roomRouter.get('/all', isAuthed, fetchAllRooms);
roomRouter.post('/find', isAuthed, fetchOrCreateRoom);

export default roomRouter;
