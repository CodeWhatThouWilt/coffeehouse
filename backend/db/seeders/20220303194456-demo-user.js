'use strict';
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    // const usersArr = [];
    // for (let i = 0; i < 100; i++) {
    //   usersArr.push({
    //     email: faker.internet.email(),
    //     username: faker.internet.userName(),
    //     profilePicture: `https://picsum.photos/seed/${i + 1}/512/512`,
    //     hashedPassword: bcrypt.hashSync(faker.internet.password())
    //   });
      
    // };


    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@demo.com',
        username: 'Demo',
        profilePicture: 'https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2015/health-benefits-drinking-coffee.jpg?la=en&h=461&w=700&mw=896&hash=24FC7736F38D6ADAC480DCB45239DD5F92CE6679',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'yake@yake.com',
        username: 'Yake',
        profilePicture: 'https://avatars.githubusercontent.com/u/78247317?v=4',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'angel@aa.com',
        username: 'Angel',
        profilePicture: 'https://avatars.githubusercontent.com/u/92352042?v=4',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'will@aa.com',
        username: 'Will',
        profilePicture: 'https://avatars.githubusercontent.com/u/93359204?v=4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'nick@aa.com',
        username: 'Nick',
        profilePicture: 'https://avatars.githubusercontent.com/u/93935486?v=4',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'blake@aa.com',
        username: 'Blake',
        profilePicture: 'https://avatars.githubusercontent.com/u/92361048?v=4',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'ali@aa.com',
        username: 'Ali',
        profilePicture: 'https://avatars.githubusercontent.com/u/55769045?v=4',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'braxton@aa.com',
        username: 'Braxton',
        profilePicture: 'https://avatars.githubusercontent.com/u/46814977?v=4',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'anthony@aa.com',
        username: 'Anthony',
        profilePicture: 'https://avatars.githubusercontent.com/u/24263351?v=4',
        hashedPassword: bcrypt.hashSync('password9')
      },
    // ...usersArr
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
