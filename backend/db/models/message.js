'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    serverId: DataTypes.INTEGER,
    channelId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.Channel, { foreignKey: 'channelId' });
    Message.belongsTo(models.Server, { foreignKey: 'serverId' });
  };
  return Message;
};