'use strict';
const { faker } = require('@faker-js/faker');
const { Server, User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await User.findAll();
    const usersAmount = users.length;
    const servers = await Server.findAll();
    const serverAmount = servers.length;
    let counter = 0;
    for (let i = 0; i < usersAmount; i++) {
      const element = users[i];
      
      for (let j = 0; j < serverAmount; j++) {
        const element = servers[j];
        counter ++;
      };
    };
    const arr = new Array(Math.floor(counter / 3));
    const membersObj = {};
    const membersArr = [];
    const serverOwners = await Server.findAll();
    serverOwners.forEach(server => {
      const member = {
        serverId: server.id,
        userId: server.ownerId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      membersObj[server.id] = {};
      membersObj[server.id][server.ownerId] = member;
      membersArr.push(member);
    });

    for await (const [i, _ignore] of arr.entries()) {
      const serverId = Math.ceil(Math.random() * serverAmount);
      const userId = Math.ceil(Math.random() * usersAmount);
      const createdAt = new Date();
      const updatedAt = new Date();
      const member = {
        serverId,
        userId,
        createdAt,
        updatedAt
      };
      if (!membersObj[serverId]) {
        membersObj[serverId] = {};
      };
      if (!membersObj[serverId][userId]) {
        membersObj[serverId][userId] = member;
        membersArr.push(member);
      };
    }
    return queryInterface.bulkInsert('Members', membersArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Members', null, {});
  }
};
