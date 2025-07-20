const express = require('express');
const multer = require('multer');
const authMiddleware = require('../Middlewares/Authorize');
const { uploadImage, deleteImage } = require('../controller/ProductImage');
const productrouter = express.Router();
const upload = multer({ dest: 'uploads/' });


productrouter.post('/upload/:id/:businessId',authMiddleware, upload.single('image'), uploadImage);
productrouter.post('/deleteimage/:id',authMiddleware,deleteImage)




module.exports=productrouter