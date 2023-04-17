'use strict';
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    options.tableName = 'Users';

    const usersArr = [];
    for (let i = 0; i < 100; i++) {
      usersArr.push({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        profilePicture: `https://picsum.photos/seed/${i + 1}/512/512`,
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      });
      
    };


    return queryInterface.bulkInsert(
		options,
		[
			{
				email: "demo@demo.com",
				username: "Demo",
				profilePicture:
					"https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2015/health-benefits-drinking-coffee.jpg?la=en&h=461&w=700&mw=896&hash=24FC7736F38D6ADAC480DCB45239DD5F92CE6679",
				hashedPassword: bcrypt.hashSync("password"),
			},
			{
				email: "yake@yake.com",
				username: "Yake",
				profilePicture:
					"https://avatars.githubusercontent.com/u/78247317?v=4",
				hashedPassword: bcrypt.hashSync("password2"),
			},
			{
				email: "openai@demo.com",
				username: "openAI",
				profilePicture:
					"https://ph-files.imgix.net/b739ac93-2899-4cc1-a893-40ea8afde77e.png?auto=format",
				hashedPassword: bcrypt.hashSync(process.env.OPENAI_LOGIN),
			},
			...usersArr,
		],
		{}
	);
  },

  down: (queryInterface, Sequelize) => {

    options.tableName = 'Users'

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
