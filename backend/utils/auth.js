const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true, //js can't interact w/ it
    secure: isProduction,
    sameSite: isProduction && "Lax" //have cross origin protection
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies; //get token from cookie

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data; //destructure id from payload
      req.user = await User.scope('currentUser').findByPk(id); //if user found, save the user to a key of user onto req
    } catch (e) { //error verifying the JWT then clear token cookie from res
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token'); //user can't be found then clear the token cookie from res

    return next();
  });
};

// If there is no current user, return an error
const requireAuth = [
  restoreUser, // first element in the array //if valid JWT cookie exists
  function (req, _res, next) {
    if (req.user) return next(); //session user will be loaded into the req.user
   //will pass onto next middleware if theres a session user present there

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err); //if no ssession user, then an err will  be created and passed along to err handling middlewares
  }
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
