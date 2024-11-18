const express = require('express');
const { login, signup, verifyEmail } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/verify-email', verifyEmail);

module.exports = router;
