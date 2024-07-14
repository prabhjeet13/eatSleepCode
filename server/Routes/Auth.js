// authentication related routes eg : sign in , sendotp, signup
const express = require('express');
const router = express.Router();

// controllers
const {sendOtp,signUp} = require('../Controllers/Auth');

router.post('/sendotp',sendOtp);
router.post('/signup',signUp);

module.exports = router;