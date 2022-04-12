const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');


router.get('/', asyncHandler((res,res) => {
    const userId = req.user.id;

}));


module.exports = router;