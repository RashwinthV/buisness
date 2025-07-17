const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); 

exports.uploadImage = async (req, res) => {
  try {
    const inputPath = path.join(__dirname, '..', req.file.path);
    const outputPath = `${inputPath}-resized.jpg`;

    await sharp(inputPath)
      .resize({ width: 800 }) 
      .jpeg({ quality: 70 })
      .toFile(outputPath);

    const result = await cloudinary.uploader.upload(outputPath, {
      folder: 'business-logo',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // 3. Clean up local files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    console.error('Cloudinary Upload Error:', error.message);
    return res.status(500).json({ success: false, error: 'Image upload failed' });
  }
};



exports.deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ success: false, message: 'Missing public_id' });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== 'ok') {
      return res.status(400).json({ success: false, message: 'Image not found or already deleted' });
    }

    return res.status(200).json({ success: true, message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
};



exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};
