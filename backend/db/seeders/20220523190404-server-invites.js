'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    options.tableName = "ServerInvites";

      return queryInterface.bulkInsert(options, [{
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

    options.tableName = "ServerInvites";

    return queryInterface.bulkDelete(options, null, {});
  }
};
