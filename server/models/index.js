import User from './user.model';
import Room from './room.model';

Room.belongsToMany(User, { through: 'UserRoom' });
User.belongsToMany(Room, { through: 'UserRoom' });

Room.sync();
User.sync();

export {
  User,
  Room,
};
