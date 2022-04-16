'use strict';
const { faker } = require('@faker-js/faker');
const { Channel, Server } = require('../models');

module.exports = {
  // id, serverId, channelId, content
  up: async (queryInterface, Sequelize) => {

      const messagesArr = [];
      const arr = new Array(200);

      for await (const [i, _ignore] of arr.entries()) {
        const servers = await Server.findAll();
        const amountServers = servers.length;
        const serverId = Math.ceil(Math.random() * amountServers);
        const channels = await Channel.findAll({
          where: {
            serverId
          }
        });
        const amountChannels = channels.length;
        const channelId = Math.ceil(Math.random() * amountChannels);
        const content = faker.lorem.sentence();

        messagesArr.push({
          id: i,
          serverId,
          channelId,
          content
        });
      };
      messagesArr.pop();

      return queryInterface.bulkInsert('Messages', messagesArr, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Messages', null, {});
  }
};
