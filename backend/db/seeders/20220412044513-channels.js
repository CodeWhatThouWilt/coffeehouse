"use strict";
const { faker } = require("@faker-js/faker");
const { Server } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Channels";

		const channelsArr = [];
		const arr = new Array(200);
		for await (const [i, _ignore] of arr.entries()) {
			const name = faker.internet.domainWord();
			const servers = await Server.findAll();
			const serversAmount = servers.length;
			const serverId = Math.ceil(Math.random() * serversAmount);
			const createdAt = new Date();
			const updatedAt = new Date();

			serverId !== 4 &&
				channelsArr.push({
					name,
					serverId,
					createdAt,
					updatedAt,
				});
		}

		return queryInterface.bulkInsert(
			options,
			[
				{
					name: "general",
					serverId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "coffee-talk",
					serverId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "espresso-talk",
					serverId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "general",
					serverId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "caffeinated",
					serverId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "brew-talk",
					serverId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "general",
					serverId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "chill-talk",
					serverId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Just chat",
					serverId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "general",
					serverId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				...channelsArr,
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		options.tableName = "Channels";

		return queryInterface.bulkDelete(options, null, {});
	},
};
