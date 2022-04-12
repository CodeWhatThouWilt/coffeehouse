const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler'); //wrap asynch route handlers and custom middlewares
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator'); //used with handle validationerr to validate the body of a req
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

// Restore session user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) { //if there is user...
      return res.json({ //returning the session user as JSON...
        user: user.toSafeObject() //under the key of user
      });
    } else return res.json({}); // if there is not a session, will return JSON with an empty obj
  }
);

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

//Log in
router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed'; //if no user returned from login static method, create login failed
      err.errors = ['The provided credentials were invalid.'];
      return next(err); //and invoke the next error-handling middleware
    }

    await setTokenCookie(res, user); //if there i sa uuser returned from login, call setTokenCookie

    return res.json({ //return JSON response w/ user info
      user
    });
  })
);

//Log out
router.delete('/', (_req, res) => { //this route handler is NOT async
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

module.exports = router;
