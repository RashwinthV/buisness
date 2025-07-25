const path = require("path");
const fs = require("fs/promises");
const buissnessModel = require("../Models/buissnessModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
  const inputPath = path.join(__dirname, "..", req.file.path);
  try {
    const result = await cloudinary.uploader.upload(inputPath, {
      folder: "business-logo",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    try {
      await fs.unlink(inputPath);
    } catch (err) {
      console.warn("Failed to delete input file:", inputPath, err.message);
    }

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Image upload failed" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { public_id, newpublicId, newImageUrl } = req.body;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "Missing public_id",
      });
    }

    // Step 1: Delete old image from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok") {
      return res.status(400).json({
        success: false,
        message: "Image not found or already deleted on Cloudinary",
      });
    }

    // Step 2: Update DB with new logo (instead of clearing)
    const updatedBusiness = await buissnessModel.findOneAndUpdate(
      { "logo.publicId": public_id },
      {
        $set: {
          "logo.imageUrl": newImageUrl || "",
          "logo.publicId": newpublicId || "",
        },
      },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({
        success: true,
        message:
          "Old image deleted, but no matching business logo found for update.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Old image deleted and new logo updated successfully in the database.",
      updatedBusiness,
    });
  } catch (error) {
    console.error("Delete error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete and update image",
    });
  }
};
