const express = require('express');
const morgan = require('morgan'); //http req middleware logger for Node.js
const cors = require('cors'); //can be used to enable cors with various options
const csurf = require('csurf');
const helmet = require('helmet');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';
const { db } = require('./db/models');
const socketIoHandler = require('./utils/socket');

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const routes = require('./routes'); //connects all the routes

app.use(morgan('dev')); //for logging info about req and res
app.use(cookieParser()); //for parsing cookies
app.use(express.urlencoded({ limit: '8mb', extended: false })); // parses incoming requests with urlencoded payloads
app.use(express.json({ limit: '8mb' })); //for parsing JSON bodies of req with content-type of application/json

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
};


// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);


// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// function ioOptions() {
//   if (isProduction) {
//     return {
//       // cors:
//       //   { origin: 'https://coffeehouse-app.herokuapp.com' }
//     };
//   } else {
//     return {
//       cors: {
//         origin: 'http://localhost:3000'
//       }
//     }
//   };
// };

app.use((req, res, next) => {
  req.io = io;
  
  return next()
});

app.use(routes);

io.on('connection', socket => {
  socketIoHandler(io, socket);
});

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  };
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error("ERROR:", err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = {
  app,
  server
};