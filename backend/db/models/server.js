'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  Server.associate = function(models) {
    Server.belongsTo(models.User, { foreignKey: 'ownerId'})
  };
  return Server;
};