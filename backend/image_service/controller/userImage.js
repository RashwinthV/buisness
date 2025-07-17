// controllers/userImage.js
const path = require("path");
const fs = require("fs");
const cloudinaryService = require("../Helpers/cloudinaryService");

exports.uploadImage = async (req, res) => {
  const filePath = path.join(__dirname, "..", req.file.path);

  try {
    const result = await cloudinaryService.uploadToCloudinary(
      filePath,
      "user-images"
    );

    fs.unlinkSync(filePath);

    res.json({
      success: true,
      image_url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Upload failed",
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res
        .status(400)
        .json({ success: false, message: "Missing public_id" });

    const result = await cloudinaryService.deleteFromCloudinary(public_id);

    res.json({ success: true, result });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
