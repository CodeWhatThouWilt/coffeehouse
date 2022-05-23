'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ServerInvites', [{
        serverId: 4,
        link: 'invLinkedIn',
        expiration: null,
        maxUses: 0,
        uses: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ServerInvites', null, {});
  }
};
