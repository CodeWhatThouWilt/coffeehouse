const express = require('express');
const morgan = require('morgan'); //http req middleware logger for Node.js
const cors = require('cors'); //can be used to enable cors with various options
const csurf = require('csurf');
const helmet = require('helmet');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';
const { db } = require('./db/models');

const app = express();
const server = createServer(app);

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


const io = new Server(server, isProduction && {
  cors: {
    origin: 'https://coffeehouse-app.herokuapp.com/'
  }
});

app.use((req, res, next) => {
  req.io = io;
  return next()
});

app.use(routes);

io.on('connection', socket => {

  // socket.emit('chat', 'Welcome to coffeehouse');

  // Broadcasts when a user connects
  socket.broadcast.emit('chat', 'A user has joined the chat');

  // Broadcasts when client disconnects
  socket.on('disconnect', () => {
    io.emit('chat', 'A user has left the chat');
  });

  // listen for chat
  socket.on('chat', (message) => {
    socket.join(message.channelId);
    io.emit(message.channelId, message);
    // io.to(message.channelId).emit(message);
  });

  socket.on('member-join', (member) => {
    member.action = 'join';
    socket.join(member.serverId);
    io.emit(member.serverId, member);
  });

  socket.on('member-leave', member => {
    member.action = 'leave';
    socket.join(member.serverId);
    io.emit(member.serverId, member);
  });

});

// const namespaces = io._nsps.keys();


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