const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret } = jwtConfig

const authenticateSocket = (socket, next) => {
	const cookies = socket.handshake.headers.cookie.split("; ");
	const tokenStr = cookies.find((ele) => ele.startsWith("token"));
	const token = tokenStr.slice(6);
    
	jwt.verify(token, secret, null, async (err, jwtPayload) => {
		if (err) {
			return next(new Error("Authentication error"));
		}

		try {
			const { id } = jwtPayload.data; //destructure id from payload
			socket.user = await User.scope("currentUser").findByPk(id); //if user found, save the user to a key of user onto socket
		} catch (e) {
			//error verifying the JWT
			return next(new Error("Authentication error"));
		}

		if (!socket.user) {
			return next(new Error("Authentication error")); //user can't be found
		}

		return next();
	});
};



module.exports = {
    authenticateSocket
}