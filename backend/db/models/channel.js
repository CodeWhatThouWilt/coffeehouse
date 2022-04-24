'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    serverId: DataTypes.INTEGER
  }, {});

  // Channel.prototype.normalizeData = () => {

  // }

  Channel.associate = function(models) {
    Channel.belongsTo(models.Server, { foreignKey: 'serverId' });
    Channel.hasMany(models.Message, { foreignKey: 'channelId', onDelete: 'cascade', hooks: true });
  };
  return Channel;
};