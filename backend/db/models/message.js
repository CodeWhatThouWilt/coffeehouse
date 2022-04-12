'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    channelId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.Channel, { foreignKey: 'channelId' })
  };
  return Message;
};