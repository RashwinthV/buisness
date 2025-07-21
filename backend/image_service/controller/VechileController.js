const path = require("path");
const fs = require("fs");
const cloudinaryService = require("../Helpers/cloudinaryService");
const vechileModel = require("../Models/vechileModel");

exports.uploadImage = async (req, res) => {
  const filePath = path.join(__dirname, "..", req.file.path);

  try {
    const result = await cloudinaryService.uploadVechileToCloudinary(
      filePath,
      "Vechile_Images"
    );

    fs.unlinkSync(filePath);

    res.json({
      success: true,
      imageUrl: result.url,
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

    if (!public_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing public_id" });
    }

    const result = await cloudinaryService.deleteFromCloudinary(public_id);

    if (!result || result.result !== "ok") {
      return res.status(400).json({
        success: false,
        message: "Image not found or already deleted on Cloudinary",
      });
    }
    const updatedProduct = await vechileModel.findOneAndUpdate(
      { "logo.publicId": public_id },
      {
        $set: {
          "logo.imageUrl": "",
          "logo.publicId": "",
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: true,
        message:
          "Image deleted from Cloudinary, but no matching business logo found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Image deleted from Cloudinary and business logo cleared successfully.",
      business: updatedProduct,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: "Failed to delete image" });
  }
};
