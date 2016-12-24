import Sequelize from 'sequelize';

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
});

export default Room;
