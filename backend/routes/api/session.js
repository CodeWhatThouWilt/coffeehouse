const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler'); //wrap asynch route handlers and custom middlewares
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator'); //used with handle validationerr to validate the body of a req
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

// Restore session user
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) { 
    return res.json({
      user: user.toSafeObject()
    });
  } else return res.json({});
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
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  };

  await setTokenCookie(res, user);

  return res.json({ user });
}));

//Log out
router.delete('/', requireAuth,asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findByPk(userId);
  user.status = 'offline';
  await user.save();
  
  res.clearCookie('token');
  return res.json({ message: 'success', user });
}));

module.exports = router;
