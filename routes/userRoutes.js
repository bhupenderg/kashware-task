const express = require('express');

const userController = require('../controllers/userController')

const router = express.Router();

// Create a user temporarily

router.post('/users/create', userController.signup)

// User Login
router.post('/users/login', userController.login);


module.exports = router;