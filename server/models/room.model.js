import Sequelize from 'sequelize';

import sequelize from '../db';

const Room = sequelize.define('rooms', {
  name: {
    type     : Sequelize.STRING,
    allowNull: false,
    unique   : true,
  },
  location: {
    type     : Sequelize.STRING,
    allowNull: false,
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
