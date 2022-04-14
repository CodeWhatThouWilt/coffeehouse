'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@demo.com',
        username: 'Demo',
        profilePicture: 'https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2015/health-benefits-drinking-coffee.jpg?la=en&h=461&w=700&mw=896&hash=24FC7736F38D6ADAC480DCB45239DD5F92CE6679',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        profilePicture: 'https://media.istockphoto.com/photos/happy-man-drinking-a-cup-of-coffee-at-a-cafe-picture-id960567928?k=20&m=960567928&s=612x612&w=0&h=0emeUh9zw9ZlFltDae9DTnnPRgjWvoa-Ke8HuZjKhSg=',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        profilePicture: 'https://i.insider.com/5f21e74e1918246a0a65c79f?auto=webp&enable=upscale&fit=crop&quality=85&width=1200&height=900',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
