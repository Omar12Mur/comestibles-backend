const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/users.controller');
const { verifyToken } = require('../middleware/auth.middleware');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getProfile);
module.exports = router;
