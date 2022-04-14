'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Channels', [
      {
        name: 'General',
        serverId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coffee talk',
        serverId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Espresso Talk',
        serverId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'General',
        serverId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Caffeinated',
        serverId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brew talk',
        serverId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'General',
        serverId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chill talk',
        serverId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Just chat',
        serverId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Channels', null, {});
  }
};
