import Sequelize from 'sequelize';
import { generate as generateId } from 'shortid';

import sequelize from '../db';

const Room = sequelize.define('rooms', {
  name: {
    type     : Sequelize.STRING,
    allowNull: false,
    unique   : true,
  },
  socketRoom: {
    type  : Sequelize.STRING,
    unique: true,
  },
  location: {
    type: Sequelize.STRING,
  },
  minAge: {
    type: Sequelize.INTEGER,
  },
  maxAge: {
    type: Sequelize.INTEGER,
  },
  gender: {
    type: Sequelize.STRING,
  },
}, {
  hooks: {
    beforeValidate: async (room) => {
      try {
        room.name = (`${room.location}-${generateId()}`).replace(/\s/g, '');
        console.log('room = ', room.toJSON());
        return sequelize.Promise.resolve(room);
      } catch (e) {
        return sequelize.Promise.reject(e);
      }
    },
  },
});

export default Room;
