'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ServerInvites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serverId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Servers'}
      },
      link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expiration: {
        type: Sequelize.DATE
      },
      maxUses: {
        type: Sequelize.INTEGER
      },
      uses: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ServerInvites', options);
  }
};