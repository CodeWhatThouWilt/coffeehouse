'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 32],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    selectedStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });

  //return an obj with only the User instance info that is safe to save to a JWT
  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, username, email, profilePicture, status, selectedStatus } = this; // context will be the User instance
    return { id, username, email, profilePicture, status, selectedStatus };
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.validatePw = async function (userId, password) {
    const user = await User.scope('loginUser').findByPk(userId);
    return user.validatePassword(password);
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) { //if use found, then method should validate pw by pasing it into instance .validatepw method
      user.status = 'online';
      await user.save();
      return await User.scope('currentUser').findByPk(user.id); //if pw valid, mehtod should return uer by uing currentUser scope
    }
  };

  User.signup = async function ({ username, email, password, profilePicture }) {
    const hashedPassword = bcrypt.hashSync(password); //hash the pw using hashSync
    const user = await User.create({
      username,
      email,
      hashedPassword,
      profilePicture,
      status: 'online'
    });

    return await User.scope('currentUser').findByPk(user.id); //return created user using cuurrentUserscope
  };


  User.associate = function (models) {
    User.hasMany(models.Server, { foreignKey: 'ownerId', onDelete: 'cascade', hooks: true });
    User.hasMany(models.Member, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });
    User.hasMany(models.Message, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });
  };
  return User;
};
