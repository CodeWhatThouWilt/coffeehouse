const express = require('express');
const morgan = require('morgan'); //http req middleware logger for Node.js
const cors = require('cors'); //can be used to enable cors with various options
const csurf = require('csurf'); //adds a cookie that is HTTP-only to any server res, adds a method on all req (req.csrfToken) that will be sent to cookie XSRF-TOKEN later. The two cookies work together to provide CSRF protection for app
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express(); //initialize express
const routes = require('./routes'); //connects all the routes

app.use(morgan('dev')); //for logging info about req and res
app.use(cookieParser()); //for parsing cookies
app.use(express.json()); //for parsing JSON bodies of req with content-type of application/json

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

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

app.use(routes);

//first err handler. reg middleware. Will catch any req that don't match any of the route defined and create server error with status code 404
app.use((_req, _res, next) => { //next invoked with  nothing means that the error handler defined after this middlware wont be invoked. If it's invoked, then error handlers defined after this middleware will be invoked
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

//sec err handler. catch sequelize errors and formatting them before sending err res
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error and is an instance of Validation Error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

//third err handler. formatting errors before returnin json res. return err msg, err array, and err stack trace
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors, //errors array
    stack: isProduction ? null : err.stack //err stack trace (if env is in development w/ status code of err msg)
  });
});
module.exports = app;
