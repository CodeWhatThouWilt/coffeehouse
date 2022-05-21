'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServerInvite = sequelize.define('ServerInvite', {
    serverId: DataTypes.INTEGER,
    link: DataTypes.STRING,
    expiration: DataTypes.DATE,
    maxUses: DataTypes.INTEGER,
    uses: DataTypes.INTEGER
  }, {});
  ServerInvite.associate = function(models) {
    // associations can be defined here
    ServerInvite.belongsTo(models.Server, { foreignKey: 'serverId' })
  };
  return ServerInvite;
};