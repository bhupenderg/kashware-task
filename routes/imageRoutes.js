const express = require('express');

const download = require('image-downloader')

const imageController = require('../controllers/imageController')

const router = express.Router();

// Imageprocessing
router.get('/imageProcessing', imageController.imageProcessing);


module.exports = router;