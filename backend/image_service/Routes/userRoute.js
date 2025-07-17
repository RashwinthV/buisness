const express = require("express");
const { uploadImage, deleteImage } = require("../controller/userImage");
const multer = require("multer");
const authMiddleware = require("../Middlewares/Authorize");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload/:id",authMiddleware, upload.single("image"), uploadImage);
router.post('/deleteimage/:id',authMiddleware,deleteImage)
module.exports = router;
