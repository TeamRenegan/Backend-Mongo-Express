const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middlewear/auth');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', authenticateUser, userController.logout);

module.exports = router;
