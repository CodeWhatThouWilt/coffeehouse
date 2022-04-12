'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    channelId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};