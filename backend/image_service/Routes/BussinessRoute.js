const express = require('express');
const multer = require('multer');
const { uploadImage, getImages } = require('../controller/bussinessimage');
const router = express.Router();

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/upload', upload.single('image'), uploadImage);
router.get('/images', getImages);

module.exports = router;
