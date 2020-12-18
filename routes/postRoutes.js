const express = require('express');

const userController = require('../controllers/userController')

const postController = require('../controllers/postController')

const router = express.Router();

// Create a new post
router.post('/create-post', userController.auth, postController.createPost);

// Get all the posts
router.get('/getPosts', userController.auth, postController.getPosts);

// @params Update a post
router.patch('/update-post/:id', userController.auth, postController.updatePost);

module.exports = router;