const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
const FormData = require('form-data');

exports.uploadImage = async (req, res) => {
  try {
    const inputPath = path.join(__dirname, '..', req.file.path);
    const outputPath = `${inputPath}-resized.jpg`;

    // Resize and compress image using sharp, then save to disk
    await sharp(inputPath)
      .resize(800) // width in px
      .jpeg({ quality: 70 }) // compression
      .toFile(outputPath);

    // Prepare FormData for upload
    const form = new FormData();
    form.append('source', fs.createReadStream(outputPath));
    form.append('action', 'upload');
    form.append('key', process.env.FREEIMAGE_API_KEY);
    form.append('format', 'json');

    // Make the upload request
    const response = await axios.post('https://freeimage.host/api/1/upload', form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 15000, // optional: timeout to prevent hangs
    });

    // Cleanup both original and resized files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    if (response.data?.image?.url) {
      return res.status(200).json({ imageUrl: response.data.image.url });
    } else {
      return res.status(400).json({ error: 'Image upload failed', response: response.data });
    }

  } catch (error) {
    console.error('Image upload error:', error.message);
    return res.status(500).json({ error: 'Server error during image upload' });
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
