const express = require("express");
const VechileRoute = express.Router();
const multer = require('multer');
const { uploadImage, deleteImage } = require("../controller/VechileController");
const authMiddleware = require("../Middlewares/Authorize");
const upload = multer({ dest: 'uploads/' });



VechileRoute.post('/upload/:id',authMiddleware, upload.single('image'), uploadImage)
VechileRoute.post('/deleteimage/:id',authMiddleware,deleteImage)


module.exports = VechileRoute;
