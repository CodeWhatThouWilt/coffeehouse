'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const serversArr = [];
    const arr = new Array(20);
    for await (const [i, _ignore] of arr.entries()) {

    }

    return queryInterface.bulkInsert('Servers', [
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
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Servers', null, {});
  }
};
