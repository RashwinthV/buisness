// controllers/userImage.js
const path = require("path");
const fs = require("fs");
const cloudinaryService = require("../Helpers/cloudinaryService");
const userModel = require("../Models/userModel");
const EmployeeModal = require("../Models/EmployeeModal");

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
    const { public_id, newpublicId, newImageUrl } = req.body;
    if (!public_id)
      return res
        .status(400)
        .json({ success: false, message: "Missing public_id" });

    const result = await cloudinaryService.deleteFromCloudinary(public_id);

    const updatedProduct = await userModel.findOneAndUpdate(
      { "profilepic.publicId": public_id },
      {
        $set: {
          "profilepic.imageUrl": newImageUrl || "",
          "profilepic.publicId": newpublicId || "",
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
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEmployeeImage = async (req, res) => {
  try {
    const { public_id, newpublicId, newImageUrl } = req.body;

    if (!public_id)
      return res
        .status(400)
        .json({ success: false, message: "Missing public_id" });

    const result = await cloudinaryService.deleteFromCloudinary(public_id);

    const updatedProduct = await EmployeeModal.findOneAndUpdate(
      { "profilepic.publicId": public_id },
      {
        $set: {
          "profilepic.imageUrl": newImageUrl || "",
          "profilepic.publicId": newpublicId || "",
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
    res.status(500).json({ success: false, message: error.message });
  }
};
