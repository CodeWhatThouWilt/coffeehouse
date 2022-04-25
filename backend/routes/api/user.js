const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const defaultUserIcon = 'https://coffeehouse-app.s3.amazonaws.com/default-icons/coffee-house-default-user+(512+%C3%97+512+px).svg';

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password, profilePicture: defaultUserIcon });

  await setTokenCookie(res, user); //returns a JSON response w/ the user info

  return res.json({ user });
})
);

const validateUsername = [
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 32 })
    .withMessage('Username must be between 4 and 32 characters'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  handleValidationErrors
];

router.put('/:userId(\\d+)', requireAuth, validateUsername, asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const sessionUser = req.user;
  const { username, password } = req.body;
  const correctPassword = await User.validatePw(userId, password);
  
  if (sessionUser.id === userId * 1 && correctPassword) {
    const user = await User.findByPk(userId);
    user.username = username;
    await user.save();
    return res.json(username);
  } else {
      const err = new Error('Edit failed');
      err.status = 401;
      err.title = 'Edit failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
  };
}));

module.exports = router;
