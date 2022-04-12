const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

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
    const { email, password, username } = req.body; //getting the info from the body
    const user = await User.signup({ email, username, password }); 

    await setTokenCookie(res, user); //returns a JSON response w/ the user info

    return res.json({ //return the json response w/ user info
      user //if creation of the user is unsucessful, sequelize validation error will be pasesd onto next error-handling middleware
    });
  })
);

module.exports = router;
