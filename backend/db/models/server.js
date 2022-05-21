'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    iconURL: DataTypes.STRING
  }, {});
  Server.associate = function(models) {
    Server.belongsTo(models.User, { foreignKey: 'ownerId'});
    Server.hasMany(models.Channel, { foreignKey: 'serverId', onDelete: 'cascade', hooks: true });
    Server.hasMany(models.Member, { foreignKey: 'serverId', onDelete: 'cascade', hooks: true });
    Server.hasMany(models.Message, { foreignKey: 'serverId', onDelete: 'cascade', hooks: true });
    Server.hasMany(models.ServerInvite, { foreignKey: 'serverId', onDelete: 'cascade', hooks: true });
  };
  return Server;
};