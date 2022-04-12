'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    serverId: DataTypes.INTEGER
  }, {});
  Channel.associate = function(models) {
    Channel.belongsTo(models.Server, { foreignKey: 'serverId' })
  };
  return Channel;
};