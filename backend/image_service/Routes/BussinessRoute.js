const express = require('express');
const multer = require('multer');
const { uploadImage, getImages, deleteImage } = require('../controller/bussinessimage');
const authMiddleware = require('../Middlewares/Authorize');
const router = express.Router();

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/upload/:id',authMiddleware, upload.single('image'), uploadImage);
router.post('/deleteimage/:id',authMiddleware,deleteImage)
router.get('/images', getImages);

module.exports = router;
