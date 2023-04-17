'use strict';
const { faker } = require('@faker-js/faker');
const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'Servers'

    const serversArr = [];
    const arr = new Array(10);
    for await (const [i, _ignore] of arr.entries()) {
        const name = faker.internet.domainWord().split('-').join(' ');
        const users = await User.findAll();
        const usersAmount = users.length;
        const ownerId = Math.ceil(Math.random() * usersAmount);
      const iconURL = `https://picsum.photos/seed/${i+100}/512/512`;
        const createdAt = new Date();
        const updatedAt = new Date();
        serversArr.push({
          name,
          ownerId,
          iconURL,
          createdAt,
          updatedAt
        });
    };

    return queryInterface.bulkInsert(options, [
      {
        name: "openAI",
        ownerId: 3,
        iconURL: "https://ph-files.imgix.net/b739ac93-2899-4cc1-a893-40ea8afde77e.png?auto=format",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Yoffee",
        ownerId: 1,
        iconURL: "https://i.pinimg.com/550x/a8/ca/23/a8ca239dd1fd32e11e5ae709d9504229.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Chill",
        ownerId: 1,
        iconURL: "https://icon-library.com/images/coffee-icon/coffee-icon-4.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "We sippin",
        ownerId: 1,
        iconURL: "https://assets.materialup.com/uploads/769dac95-29a7-4cf5-b935-122b84c694e2/preview.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Linkedin",
        ownerId: 2,
        iconURL: "https://coffeehouse-app.s3.amazonaws.com/1653330348259.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ...serversArr], {});
  },

  down: (queryInterface, Sequelize) => {

    options.tableName = 'Servers'

    return queryInterface.bulkDelete(options, null, {});
  }
};
