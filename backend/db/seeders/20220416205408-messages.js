'use strict';
const { faker } = require('@faker-js/faker');
const { Channel, Server, Member, User } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  // id, serverId, channelId, content
  up: async (queryInterface, Sequelize) => {

      options.tableName = 'Messages';

      const messagesArr = [];
      const arr = new Array(2000);

      for await (const [i, _ignore] of arr.entries()) {
        const users = await User.findAll();
        const usersAmount = users.length;
        const userId = Math.ceil(Math.random() * usersAmount);
        const userServers = await Member.findAll({
          where: {
            userId
          }
        });
        const serverIds = userServers.map(member => member.serverId);
        const serverId = serverIds[Math.floor(Math.random() * serverIds.length)];
        const channels = await Channel.findAll({
          where: {
            [Op.or] : [
              { serverId: serverId },
              { serverId: {[Op.not]: 4}}

            ]
          }
        });
        const channelIds = channels.map(channel => channel.id);
        const channelId = channelIds[Math.floor(Math.random() * channelIds.length)];
        const contentType = [faker.lorem.sentence(), faker.lorem.sentences()];
        const content = faker.lorem.sentence();
        const createdAt = new Date();
        const updatedAt = new Date();


        messagesArr.push({
          userId,
          serverId,
          channelId,
          content,
          createdAt,
          updatedAt
        });
      };

      return queryInterface.bulkInsert(options, messagesArr, {});
  },

  down: (queryInterface, Sequelize) => {

      options.tableName = 'Messages';

      return queryInterface.bulkDelete(options, null, {});
  }
};
