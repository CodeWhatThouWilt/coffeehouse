'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  Server.associate = function(models) {
    
  };
  return Server;
};