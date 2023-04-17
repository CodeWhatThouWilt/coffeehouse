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
		const arr = new Array(50);
		for await (const [i, _ignore] of arr.entries()) {
			const name = faker.internet.domainWord();
			const servers = await Server.findAll();
			const serversAmount = servers.length;
			const serverId = Math.ceil(Math.random() * serversAmount);
			const createdAt = new Date();
			const updatedAt = new Date();

			serverId !== 4 && serverId !== 1 &&
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
					name: "openai-chat",
					serverId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: "general",
					serverId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "coffee-talk",
					serverId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "espresso-talk",
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
					name: "caffeinated",
					serverId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "brew-talk",
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
				{
					name: "chill-talk",
					serverId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Just chat",
					serverId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "general",
					serverId: 5,
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
