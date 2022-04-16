'use strict';
const { faker } = require('@faker-js/faker');
const { Channel, Server, Member, User } = require('../models');

module.exports = {
  // id, serverId, channelId, content
  up: async (queryInterface, Sequelize) => {

      const messagesArr = [];
      const arr = new Array(2000);

      for await (const [i, _ignore] of arr.entries()) {
        const users = await User.findAll();
        const usersAmount = users.length;
        const user = Math.ceil(Math.random() * usersAmount);
        const userServers = await Member.findAll({
          where: {
            userId: user
          }
        });
        

        messagesArr.push({
          userId,
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
